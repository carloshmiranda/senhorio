/**
 * Banking Integration Service
 *
 * Handles integration with Portuguese banking APIs through Open Banking (PSD2) standards.
 * Supports major Portuguese banks for automated payment import and matching.
 */

export interface BankTransaction {
  id: string;
  amount: number;
  booking_date: string;
  value_date?: string;
  description: string;
  reference?: string;
  creditor_name?: string;
  creditor_account?: string;
  debtor_name?: string;
  debtor_account?: string;
  transaction_type: 'credit' | 'debit';
  currency: string;
}

export interface BankConnection {
  id: string;
  user_id: string;
  bank_name: string;
  account_iban: string;
  api_provider: string;
  connection_status: 'pending' | 'active' | 'error' | 'disconnected';
  api_credentials?: any;
}

export interface PaymentMatchResult {
  transaction: BankTransaction;
  matched_payment_id?: string;
  confidence_score: number;
  match_reasons: string[];
}

/**
 * Banking service class for Portuguese banks
 */
export class BankingService {
  private static readonly SUPPORTED_BANKS = {
    'Millennium BCP': {
      api_base: 'https://developer.millenniumbcp.pt/sb/',
      provider: 'open_banking',
      features: ['accounts', 'transactions', 'payments']
    },
    'Caixa Geral de Depósitos': {
      api_base: 'https://cgd.oapiconnect.com/',
      provider: 'open_banking',
      features: ['accounts', 'transactions']
    },
    'Santander': {
      api_base: 'https://sandbox.santander.pt/',
      provider: 'open_banking',
      features: ['accounts', 'transactions', 'payments']
    },
    'BPI': {
      api_base: 'https://api.bpi.pt/',
      provider: 'open_banking',
      features: ['accounts', 'transactions']
    },
    'Novo Banco': {
      api_base: 'https://api.novobanco.pt/',
      provider: 'open_banking',
      features: ['accounts', 'transactions']
    }
  };

  /**
   * Validate Portuguese IBAN format
   */
  static validateIban(iban: string): boolean {
    const cleanIban = iban.replace(/\s/g, '').toUpperCase();
    return /^PT\d{23}$/.test(cleanIban);
  }

  /**
   * Get supported bank information
   */
  static getSupportedBanks() {
    return Object.keys(this.SUPPORTED_BANKS);
  }

  /**
   * Get bank configuration
   */
  static getBankConfig(bankName: string) {
    return this.SUPPORTED_BANKS[bankName as keyof typeof this.SUPPORTED_BANKS];
  }

  /**
   * Simulate fetching transactions from Open Banking API
   * In production, this would make actual API calls to the bank
   */
  static async fetchTransactions(
    connection: BankConnection,
    dateFrom: string,
    dateTo: string
  ): Promise<BankTransaction[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, this would:
    // 1. Use stored API credentials to authenticate with bank
    // 2. Make REST API calls to fetch transaction data
    // 3. Transform bank-specific response format to our standard format
    // 4. Handle pagination, rate limits, and error responses

    const bankConfig = this.getBankConfig(connection.bank_name);
    if (!bankConfig) {
      throw new Error(`Banco não suportado: ${connection.bank_name}`);
    }

    // Mock transaction data for demonstration
    const mockTransactions: BankTransaction[] = [
      {
        id: `${connection.id}_txn_${Date.now()}_1`,
        amount: 850.00,
        booking_date: "2026-04-01",
        description: "Transferencia SEPA Instantanea",
        reference: "RENT APR 2026",
        creditor_name: "João Silva Santos",
        creditor_account: "PT50123456789012345678901",
        transaction_type: "credit",
        currency: "EUR"
      },
      {
        id: `${connection.id}_txn_${Date.now()}_2`,
        amount: 1200.00,
        booking_date: "2026-04-05",
        description: "MB WAY Recebido",
        reference: "Renda Abril",
        creditor_name: "Maria Santos",
        transaction_type: "credit",
        currency: "EUR"
      },
      {
        id: `${connection.id}_txn_${Date.now()}_3`,
        amount: 675.50,
        booking_date: "2026-04-03",
        description: "Transferencia SEPA",
        reference: "Pagamento mensal",
        creditor_name: "Pedro Costa",
        creditor_account: "PT50987654321098765432109",
        transaction_type: "credit",
        currency: "EUR"
      }
    ];

    // Filter by date range
    const fromDate = new Date(dateFrom);
    const toDate = new Date(dateTo);

    return mockTransactions.filter(tx => {
      const txDate = new Date(tx.booking_date);
      return txDate >= fromDate && txDate <= toDate && tx.amount > 0;
    });
  }

  /**
   * Match bank transaction with rental payment
   */
  static matchTransactionToPayment(
    transaction: BankTransaction,
    expectedPayments: any[]
  ): PaymentMatchResult {
    let bestMatch: any = null;
    let highestScore = 0;
    const matchReasons: string[] = [];

    for (const payment of expectedPayments) {
      let score = 0;
      const reasons: string[] = [];

      // Exact amount match (high confidence)
      if (Math.abs(Number(payment.amount) - transaction.amount) < 0.01) {
        score += 40;
        reasons.push('Valor exato');
      }
      // Close amount match (medium confidence)
      else if (Math.abs(Number(payment.amount) - transaction.amount) < 5) {
        score += 20;
        reasons.push('Valor próximo');
      }

      // Date proximity (due date vs transaction date)
      const dueDate = new Date(payment.due_date);
      const txDate = new Date(transaction.booking_date);
      const daysDiff = Math.abs((dueDate.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff <= 2) {
        score += 30;
        reasons.push('Data próxima');
      } else if (daysDiff <= 7) {
        score += 15;
        reasons.push('Data na mesma semana');
      } else if (daysDiff <= 30) {
        score += 5;
        reasons.push('Data no mesmo mês');
      }

      // Name matching
      if (transaction.creditor_name && payment.tenant_name) {
        const creditorName = transaction.creditor_name.toLowerCase().trim();
        const tenantName = payment.tenant_name.toLowerCase().trim();

        // Exact name match
        if (creditorName.includes(tenantName) || tenantName.includes(creditorName)) {
          score += 25;
          reasons.push('Nome corresponde');
        }
        // Partial name match (first/last names)
        else {
          const creditorParts = creditorName.split(' ');
          const tenantParts = tenantName.split(' ');
          const commonWords = creditorParts.filter(word => tenantParts.includes(word));

          if (commonWords.length >= 1) {
            score += 15;
            reasons.push('Nome parcialmente corresponde');
          }
        }
      }

      // Reference/description keyword matching
      const description = transaction.description.toLowerCase();
      const reference = (transaction.reference || '').toLowerCase();
      const keywords = ['renda', 'rent', 'aluguer', 'arrendamento'];

      if (keywords.some(keyword => description.includes(keyword) || reference.includes(keyword))) {
        score += 10;
        reasons.push('Referência indica renda');
      }

      // Property address matching (if included in reference)
      if (reference && payment.property_address) {
        const addressParts = payment.property_address.toLowerCase().split(' ');
        const hasAddressMatch = addressParts.some((part: string) => reference.includes(part) && part.length > 3);
        if (hasAddressMatch) {
          score += 10;
          reasons.push('Referência menciona morada');
        }
      }

      // Update best match if this score is higher
      if (score > highestScore && score >= 30) { // Minimum threshold for matching
        highestScore = score;
        bestMatch = payment;
        matchReasons.splice(0, matchReasons.length, ...reasons);
      }
    }

    return {
      transaction,
      matched_payment_id: bestMatch?.id,
      confidence_score: highestScore,
      match_reasons: matchReasons
    };
  }

  /**
   * Determine if transaction is likely a rental payment
   */
  static isPotentialRentalPayment(transaction: BankTransaction): boolean {
    const description = transaction.description.toLowerCase();
    const reference = (transaction.reference || '').toLowerCase();

    // Check for rental keywords
    const rentalKeywords = [
      'renda', 'rent', 'aluguer', 'arrendamento', 'habitacao',
      'mensal', 'monthly', 'senhorio', 'landlord'
    ];

    const hasRentalKeyword = rentalKeywords.some(keyword =>
      description.includes(keyword) || reference.includes(keyword)
    );

    // Check for reasonable rental amount (€200 - €10,000)
    const isReasonableAmount = transaction.amount >= 200 && transaction.amount <= 10000;

    // Regular monthly amount patterns
    const isRoundAmount = transaction.amount % 50 === 0 || transaction.amount % 25 === 0;

    // Credit transactions only (income)
    const isIncome = transaction.transaction_type === 'credit' && transaction.amount > 0;

    return isIncome && (hasRentalKeyword || (isReasonableAmount && isRoundAmount));
  }

  /**
   * Format IBAN for display (with spaces every 4 characters)
   */
  static formatIban(iban: string): string {
    return iban.replace(/(.{4})/g, '$1 ').trim();
  }

  /**
   * Get transaction category based on description and amount
   */
  static categorizeTransaction(transaction: BankTransaction): string {
    const description = transaction.description.toLowerCase();
    const reference = (transaction.reference || '').toLowerCase();

    if (this.isPotentialRentalPayment(transaction)) {
      return 'rental_payment';
    }

    if (description.includes('tax') || description.includes('imposto')) {
      return 'tax_payment';
    }

    if (description.includes('transfer') || description.includes('transferencia')) {
      return 'bank_transfer';
    }

    if (description.includes('mb way') || description.includes('mbway')) {
      return 'mb_way';
    }

    return 'other';
  }
}