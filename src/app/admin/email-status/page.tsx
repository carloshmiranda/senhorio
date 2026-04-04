'use client';

import { useState, useEffect } from 'react';

interface EmailSequence {
  id: string;
  sequence: string;
  step: number;
  subject: string;
  delay_hours: number;
  variant: string;
  is_active: boolean;
  send_count: number;
  open_count: number;
  click_count: number;
}

interface EmailStatusData {
  databaseConnected: boolean;
  sequencesCount: number;
  sequences: EmailSequence[];
  error?: string;
}

export default function EmailStatusPage() {
  const [status, setStatus] = useState<EmailStatusData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmailStatus();
  }, []);

  const fetchEmailStatus = async () => {
    try {
      const response = await fetch('/api/email-sequences?active=true');
      const data = await response.json();

      if (data.ok) {
        setStatus({
          databaseConnected: true,
          sequencesCount: data.sequences.length,
          sequences: data.sequences
        });
      } else {
        setStatus({
          databaseConnected: false,
          sequencesCount: 0,
          sequences: [],
          error: data.error || 'Failed to fetch email sequences'
        });
      }
    } catch (error) {
      setStatus({
        databaseConnected: false,
        sequencesCount: 0,
        sequences: [],
        error: 'Failed to connect to email API'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading email status...</p>
        </div>
      </div>
    );
  }

  const getSequenceName = (sequence: string) => {
    const names = {
      'waitlist_welcome': 'Waitlist Welcome',
      'calculator_followup': 'Calculator Follow-up',
      'aimi_calculator': 'AIMI Calculator Follow-up'
    };
    return names[sequence as keyof typeof names] || sequence;
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
        Active
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
        Inactive
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            📧 Email Sequences Status
          </h1>

          {/* Connection Status */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Database Connection</h2>
              {status?.databaseConnected ? (
                <span className="px-3 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                  ✅ Connected
                </span>
              ) : (
                <span className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full">
                  ❌ Disconnected
                </span>
              )}
            </div>

            {status?.error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex">
                  <div className="text-red-800">
                    <strong>Error:</strong> {status.error}
                  </div>
                </div>
                <div className="mt-2 text-sm text-red-600">
                  This usually means the DATABASE_URL environment variable contains placeholder values.
                  Follow the instructions in DATABASE_SETUP.md to provision the database.
                </div>
              </div>
            )}
          </div>

          {/* Email Sequences Overview */}
          {status?.databaseConnected ? (
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Email Sequences Overview</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-brand-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-brand-600">{status.sequencesCount}</div>
                  <div className="text-sm text-brand-800">Active Sequences</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {status.sequences.reduce((sum, seq) => sum + (seq.send_count || 0), 0)}
                  </div>
                  <div className="text-sm text-green-800">Total Emails Sent</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {status.sequences.reduce((sum, seq) => sum + (seq.open_count || 0), 0)}
                  </div>
                  <div className="text-sm text-purple-800">Total Opens</div>
                </div>
              </div>

              {status.sequences.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sequence
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Step
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Delay
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sent
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Opened
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {status.sequences.map((sequence) => (
                        <tr key={sequence.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {getSequenceName(sequence.sequence)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sequence.step}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {sequence.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sequence.delay_hours}h
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(sequence.is_active)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sequence.send_count || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sequence.open_count || 0}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-4">No email sequences found</div>
                  <div className="text-sm text-gray-400">
                    Run <code className="bg-gray-100 px-2 py-1 rounded">node scripts/setup-email-sequences.js</code> to create templates
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Setup Required</h2>
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="text-sm font-medium text-yellow-800 mb-2">Database Not Configured</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    The email sequences require a database connection to function. Follow these steps:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
                    <li>Create a Neon database following <code>DATABASE_SETUP.md</code></li>
                    <li>Update the <code>DATABASE_URL</code> environment variable in Vercel</li>
                    <li>Run the setup script: <code>node scripts/setup-email-sequences.js</code></li>
                    <li>Redeploy the application</li>
                  </ol>
                </div>

                <div className="p-4 bg-brand-50 border border-brand-200 rounded-md">
                  <h3 className="text-sm font-medium text-brand-800 mb-2">Available Email Templates</h3>
                  <p className="text-sm text-brand-700 mb-2">
                    These templates are ready to be configured once the database is set up:
                  </p>
                  <ul className="text-sm text-brand-700 space-y-1">
                    <li>• <strong>Waitlist Welcome</strong> - Sent immediately when someone joins</li>
                    <li>• <strong>Calculator Follow-up</strong> - Sent 2h after using tax calculator</li>
                    <li>• <strong>AIMI Calculator Follow-up</strong> - Sent 1h after AIMI calculation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Management Tools */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Management Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">CLI Management</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Use the interactive CLI tool to manage email sequences:
                </p>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm">
                  node scripts/manage-email-sequences.js
                </code>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">API Access</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Access email sequences via REST API:
                </p>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm">
                  GET /api/email-sequences
                </code>
              </div>
            </div>
          </div>

          {/* Refresh Button */}
          <div className="mt-6 text-center">
            <button
              onClick={fetchEmailStatus}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600"
            >
              🔄 Refresh Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}