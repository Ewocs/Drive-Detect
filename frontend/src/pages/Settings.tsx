import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, TestTube, CheckCircle, XCircle } from 'lucide-react';

export const Settings = () => {
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load saved API endpoint from localStorage
    const saved = localStorage.getItem('drivedetect-api-endpoint');
    setApiEndpoint(saved || 'http://127.0.0.1:8000');
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('drivedetect-api-endpoint', apiEndpoint);
      setTestResult({ success: true, message: 'Settings saved successfully!' });
      setTimeout(() => setTestResult(null), 3000);
    } catch (error) {
      setTestResult({ success: false, message: 'Failed to save settings.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch(`${apiEndpoint}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setTestResult({ success: true, message: 'API endpoint is reachable!' });
      } else {
        setTestResult({ success: false, message: `API returned status ${response.status}` });
      }
    } catch (error) {
      setTestResult({ success: false, message: 'Failed to connect to API endpoint. Please check the URL.' });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-2xl mb-6">
              <SettingsIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Settings & <span className="text-blue-500">Configuration</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Customize your DriveDetect experience and configure API endpoints for optimal performance
            </p>
          </motion.div>

          {/* Settings Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">API Configuration</h2>

            <div className="space-y-6">
              {/* API Endpoint */}
              <div>
                <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-300 mb-2">
                  API Endpoint URL
                </label>
                <input
                  id="api-endpoint"
                  type="url"
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  placeholder="http://127.0.0.1:8000"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-sm text-gray-500">
                  The base URL of your DriveDetect backend API. This should be the same URL used in your deployment.
                </p>
              </div>

              {/* Test Connection */}
              <div className="flex gap-4">
                <button
                  onClick={handleTest}
                  disabled={isTesting}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                  <TestTube className="w-4 h-4" />
                  {isTesting ? 'Testing...' : 'Test Connection'}
                </button>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Settings'}
                </button>
              </div>

              {/* Test Result */}
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border ${
                    testResult.success
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-red-500/10 border-red-500/20 text-red-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {testResult.success ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">
                      {testResult.success ? 'Success' : 'Error'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{testResult.message}</p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Additional Settings Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Additional Settings</h2>
            <div className="text-gray-400">
              <p>More configuration options will be available in future updates, including:</p>
              <ul className="mt-4 space-y-2 list-disc list-inside">
                <li>Model selection and performance settings</li>
                <li>UI theme customization</li>
                <li>Batch processing options</li>
                <li>Export and integration settings</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};