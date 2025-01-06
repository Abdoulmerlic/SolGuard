import React, { useState } from 'react';
import { Shield, Upload, Link, AlertTriangle, CheckCircle, Github, Twitter } from 'lucide-react';

interface Vulnerability {
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  description: string;
  remediation: string;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [contractAddress, setContractAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

  const handleFileScan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setVulnerabilities([
        {
          title: 'Reentrancy Attack Vector',
          severity: 'Critical',
          description: 'The contract contains a reentrancy vulnerability in the transfer function.',
          remediation: 'Implement checks-effects-interactions pattern'
        },
        {
          title: 'Access Control Issue',
          severity: 'High',
          description: 'Insufficient access controls on mint function',
          remediation: 'Implement proper role-based access control'
        }
      ]);
      setIsScanning(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      Critical: 'bg-red-100 text-red-800',
      High: 'bg-orange-100 text-orange-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Low: 'bg-green-100 text-green-800'
    };
    return colors[severity as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SolGuard</h1>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com" className="text-gray-500 hover:text-gray-700">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-gray-700">
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Scan and Secure Your Solana dApps
          </h2>
          <p className="text-xl text-gray-600">
            SolGuard helps you scan your Solana smart contracts for vulnerabilities
            and provides security insights to make your dApp safer.
          </p>
        </div>

        {/* Scan Forms */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* File Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleFileScan}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Smart Contract
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <input
                      type="file"
                      accept=".sol"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={!file || isScanning}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Scan Contract'}
              </button>
            </form>
          </div>

          {/* Contract Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleFileScan}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Contract Address
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="Enter Solana contract address"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={!contractAddress || isScanning}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isScanning ? 'Scanning...' : 'Scan Address'}
              </button>
            </form>
          </div>
        </div>

        {/* Results Section */}
        {vulnerabilities.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Scan Results</h3>
            <div className="space-y-4">
              {vulnerabilities.map((vuln, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                      <h4 className="text-lg font-medium text-gray-900">{vuln.title}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{vuln.description}</p>
                  <div className="mt-3 bg-gray-50 p-3 rounded">
                    <h5 className="text-sm font-medium text-gray-900">Remediation:</h5>
                    <p className="mt-1 text-sm text-gray-600">{vuln.remediation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            © 2024 SolGuard. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;