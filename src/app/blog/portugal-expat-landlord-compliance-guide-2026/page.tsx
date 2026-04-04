import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portugal Expat Landlord Compliance Guide 2026: Complete Legal Obligations for Non-Resident Property Owners",
  description: "Essential compliance guide for expat landlords in Portugal 2026. Tax obligations, rental receipts, AIMI exemptions, and legal requirements for non-resident property investors.",
  keywords: "Portugal expat landlord tax, non-resident property tax Portugal, Portugal rental compliance 2026, expat rental property Portugal, Portugal landlord legal obligations",
  openGraph: {
    title: "Portugal Expat Landlord Compliance Guide 2026",
    description: "Complete legal and tax compliance guide for expat property owners renting in Portugal. Updated for 2026 tax changes.",
    type: "article",
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-700 transition">
            ← Back to Blog
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-brand-100 text-brand-700 text-sm rounded">Expat Guide</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">2026 Tax Rules</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded">Compliance</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded">Legal Requirements</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Portugal Expat Landlord Compliance Guide 2026: Complete Legal Obligations for Non-Resident Property Owners
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Essential compliance guide for expat landlords in Portugal 2026. Navigate tax obligations, rental receipts, AIMI exemptions, and legal requirements with confidence. Updated for the latest 2026 tax changes.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500 border-l-4 border-gray-200 pl-4">
            <time dateTime="2026-03-23">23 March 2026</time>
            <span>•</span>
            <span>16 min read</span>
            <span>•</span>
            <span>Updated for 2026</span>
          </div>
        </header>

        <div className="prose prose-lg prose-gray max-w-none">
          {/* Quick Navigation */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#tax-obligations" className="text-brand-600 hover:text-brand-700">Tax Obligations for Non-Residents</a></li>
              <li><a href="#rental-receipts" className="text-brand-600 hover:text-brand-700">Rental Receipt Requirements</a></li>
              <li><a href="#aimi-exemptions" className="text-brand-600 hover:text-brand-700">AIMI Exemptions for Expats</a></li>
              <li><a href="#fiscal-representation" className="text-brand-600 hover:text-brand-700">Fiscal Representation Requirements</a></li>
              <li><a href="#compliance-checklist" className="text-brand-600 hover:text-brand-700">Annual Compliance Checklist</a></li>
              <li><a href="#common-mistakes" className="text-brand-600 hover:text-brand-700">Common Compliance Mistakes</a></li>
            </ul>
          </div>

          {/* Introduction */}
          <p className="text-lg leading-relaxed mb-8">
            As an expat landlord in Portugal, you face unique compliance challenges that Portuguese residents don't encounter. Language barriers, unfamiliar tax systems, and complex legal requirements can make property management feel overwhelming. This comprehensive guide covers everything you need to know about staying compliant as a non-resident property owner in Portugal for 2026.
          </p>

          <div className="bg-brand-50 border-l-4 border-brand-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-brand-900 mb-3">🎯 Key Changes for 2026</h3>
            <ul className="space-y-2 text-brand-800">
              <li><strong>New 10% Tax Rate:</strong> Simplified taxation option for rental income</li>
              <li><strong>AIMI Exemptions Expanded:</strong> More properties qualify for affordable housing exemptions</li>
              <li><strong>Digital Receipts Mandatory:</strong> All rental receipts must be issued electronically</li>
              <li><strong>Enhanced Reporting:</strong> Additional documentation required for non-residents</li>
            </ul>
          </div>

          {/* Tax Obligations Section */}
          <section id="tax-obligations">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tax Obligations for Non-Resident Landlords</h2>

            <p className="mb-6">
              Non-resident landlords in Portugal must comply with specific tax obligations that differ significantly from those of Portuguese residents. Understanding these requirements is crucial to avoid penalties and ensure proper tax optimization.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Income Tax Options (2026)</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">New 10% Flat Rate (2026)</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Simple 10% tax on gross rental income</li>
                  <li>✅ No deduction calculations needed</li>
                  <li>✅ Perfect for properties with low expenses</li>
                  <li>❌ Cannot deduct expenses or depreciation</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Best for:</strong> Modern properties with minimal maintenance costs
                </p>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Progressive Rates with Deductions</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Deduct expenses, depreciation, interest</li>
                  <li>✅ Can reduce taxable income significantly</li>
                  <li>❌ Complex calculations required</li>
                  <li>❌ Rates from 14.5% to 48% + surcharges</li>
                </ul>
                <p className="text-sm text-gray-600 mt-3">
                  <strong>Best for:</strong> Properties with substantial deductible expenses
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-yellow-900 mb-3">💡 Tax Regime Calculator</h4>
              <p className="text-yellow-800 mb-4">
                Use our free tax calculator to compare all 4 tax regimes and find the optimal choice for your property portfolio.
              </p>
              <Link href="/calculadora" className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-yellow-700 transition">
                Calculate Your Tax →
              </Link>
            </div>
          </section>

          {/* Rental Receipts Section */}
          <section id="rental-receipts">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Rental Receipt Requirements</h2>

            <p className="mb-6">
              Portugal requires all rental receipts to be issued electronically through the Portal das Finanças. As a non-resident, this process can be particularly challenging due to language barriers and unfamiliar systems.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Electronic Receipt Obligations</h3>

            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Monthly Requirements</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Issue by 10th of following month:</strong> Receipt must be generated within 10 days after rent payment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Include tenant tax number:</strong> Tenant's NIF (Número de Identificação Fiscal) is mandatory</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span><strong>Correct property classification:</strong> Must specify if property is for permanent residence</span>
                  </li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h4 className="text-lg font-semibold text-red-900 mb-3">⚠️ Penalties for Late Receipts</h4>
                <ul className="space-y-2 text-red-800">
                  <li><strong>€102 to €1,530:</strong> Per late receipt (increases with income level)</li>
                  <li><strong>€250 to €2,500:</strong> For systematic non-compliance</li>
                  <li><strong>Additional interest:</strong> 4% annual rate on unpaid taxes</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Portal das Finanças Navigation</h3>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Step-by-Step Receipt Process</h4>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1. Access Portal:</strong> Login to Portal das Finanças with your fiscal number</li>
                <li><strong>2. Navigate to Receipts:</strong> Select "Recibos de Renda" (Rental Receipts)</li>
                <li><strong>3. Property Details:</strong> Enter property address and fiscal article number</li>
                <li><strong>4. Tenant Information:</strong> Input tenant NIF and residence classification</li>
                <li><strong>5. Payment Details:</strong> Enter rent amount, payment date, and method</li>
                <li><strong>6. Submit & Archive:</strong> Generate receipt and save confirmation number</li>
              </ol>
            </div>
          </section>

          {/* AIMI Exemptions Section */}
          <section id="aimi-exemptions">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">AIMI Exemptions for Expat Landlords</h2>

            <p className="mb-6">
              The Additional Tax on Real Estate (AIMI) can add significant costs to your property ownership. However, 2026 introduces new exemptions for affordable rental properties that expat landlords can benefit from.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">2026 AIMI Exemption Criteria</h3>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                <h4 className="text-lg font-semibold text-green-900 mb-3">✅ Qualifying Properties</h4>
                <ul className="space-y-2 text-green-800">
                  <li><strong>Monthly rent ≤ €2,300:</strong> Below affordable housing threshold</li>
                  <li><strong>Permanent residence:</strong> Tenant must use as primary residence</li>
                  <li><strong>Long-term lease:</strong> Minimum 1-year rental agreement</li>
                  <li><strong>Market rate compliance:</strong> Rent not significantly below market value</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">💰 Potential Savings</h4>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>€600K property:</strong> Save €1,500/year in AIMI</li>
                  <li><strong>€800K property:</strong> Save €2,250/year in AIMI</li>
                  <li><strong>€1M property:</strong> Save €3,000/year in AIMI</li>
                </ul>
                <Link href="/calculadora-aimi" className="inline-block mt-4 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-700 transition">
                  Check AIMI Exemption →
                </Link>
              </div>
            </div>
          </section>

          {/* Fiscal Representation Section */}
          <section id="fiscal-representation">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fiscal Representation Requirements</h2>

            <p className="mb-6">
              Non-resident landlords must often appoint a fiscal representative in Portugal to handle tax obligations. Understanding when this is required and how to choose the right representative is crucial for compliance.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">When Fiscal Representation is Required</h3>

            <div className="space-y-4 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">EU/EEA Residents</h4>
                <p className="text-gray-700 mb-3">
                  Generally not required for rental income below €50,000 annually, but recommended for complex situations.
                </p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>• Can handle tax matters directly</li>
                  <li>• Must have Portuguese bank account for tax payments</li>
                  <li>• Should consider representation for complex portfolios</li>
                </ul>
              </div>

              <div className="border border-orange-200 rounded-xl p-6 bg-orange-50">
                <h4 className="text-lg font-semibold text-orange-900 mb-3">Non-EU Residents</h4>
                <p className="text-orange-800 mb-3">
                  <strong>Mandatory</strong> fiscal representation required for all rental income above €50,000 annually.
                </p>
                <ul className="space-y-1 text-orange-700 text-sm">
                  <li>• Must appoint Portuguese tax advisor or lawyer</li>
                  <li>• Representative handles all tax filings and communications</li>
                  <li>• Power of attorney required for representation</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Choosing a Fiscal Representative</h3>

            <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8">
              <h4 className="text-lg font-semibold text-brand-900 mb-3">Selection Criteria</h4>
              <ul className="space-y-2 text-brand-800">
                <li><strong>Professional qualifications:</strong> Certified accountant or tax lawyer</li>
                <li><strong>English proficiency:</strong> Clear communication in your language</li>
                <li><strong>Property experience:</strong> Specialization in real estate taxation</li>
                <li><strong>Digital services:</strong> Online portal access and digital documentation</li>
                <li><strong>Transparent pricing:</strong> Clear fee structure with no hidden costs</li>
              </ul>
            </div>
          </section>

          {/* Compliance Checklist Section */}
          <section id="compliance-checklist">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Annual Compliance Checklist</h2>

            <p className="mb-6">
              Stay organized with this comprehensive checklist covering all annual compliance requirements for expat landlords in Portugal.
            </p>

            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Monthly Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Issue rental receipts by 10th of following month</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Archive receipt confirmation numbers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Track rental income and expenses</span>
                  </li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Annual Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>File IRS return by July 31st</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Pay AIMI tax by December 31st (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Review tax regime optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1" />
                    <span>Update fiscal representative mandate (if applicable)</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
          <section id="common-mistakes">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Compliance Mistakes</h2>

            <p className="mb-6">
              Learn from the most frequent mistakes expat landlords make and how to avoid costly penalties.
            </p>

            <div className="space-y-6 mb-8">
              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Late Rental Receipts</h3>
                <p className="text-red-800 mb-3">
                  <strong>Mistake:</strong> Issuing receipts weeks or months after rent payment
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Solution:</strong> Set monthly calendar reminders and consider automation tools
                </p>
              </div>

              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Wrong Property Classification</h3>
                <p className="text-red-800 mb-3">
                  <strong>Mistake:</strong> Classifying permanent residence as secondary residence
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Solution:</strong> Verify with tenant and update Portal das Finanças accordingly
                </p>
              </div>

              <div className="border border-red-200 rounded-xl p-6 bg-red-50">
                <h3 className="text-lg font-semibold text-red-900 mb-3">❌ Missing AIMI Exemption Claims</h3>
                <p className="text-red-800 mb-3">
                  <strong>Mistake:</strong> Not claiming available AIMI exemptions for affordable housing
                </p>
                <p className="text-red-700 text-sm">
                  <strong>Solution:</strong> Annual review of exemption eligibility and proactive filing
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Simplify Your Portuguese Landlord Compliance</h2>
            <p className="text-gray-700 mb-6">
              Managing rental properties in Portugal as an expat doesn't have to be overwhelming. Our platform helps you calculate the optimal tax regime, check AIMI exemptions, and stay compliant with Portuguese regulations.
            </p>
            <div className="space-y-4">
              <Link href="/calculadora" className="inline-block bg-brand-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-700 transition mr-4">
                Calculate Your Taxes →
              </Link>
              <Link href="/calculadora-aimi" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">
                Check AIMI Exemption →
              </Link>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-gray-500 border-t border-gray-200 pt-6">
            <p>
              <strong>Disclaimer:</strong> This guide provides general information about Portuguese tax laws for non-resident landlords. Tax situations vary by individual circumstances, and this content should not be considered personalized tax advice. For complex situations, consult with a qualified Portuguese tax professional or fiscal representative.
            </p>
            <p className="mt-2">
              <strong>Last updated:</strong> March 23, 2026 • <strong>Applicable for:</strong> 2026 tax year
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}