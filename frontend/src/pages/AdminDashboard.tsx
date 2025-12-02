// frontend/src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Table } from '../components/ui/Table';
import { Input } from '../components/ui/Input';
import { adService } from '../services/adService';
import { AdProvider, AdConfig } from '../types/ads';

interface UsageStat {
  calculator_name: string;
  count: number;
}

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UsageStat[]>([]);
  const [adConfig, setAdConfig] = useState<AdConfig>(adService.getConfig());
  const [activeTab, setActiveTab] = useState<'stats' | 'ads'>('stats');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAdminAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/admin');
    } else {
      fetch('/admin/stats')
        .then(res => res.json())
        .then(data => setStats(data.stats))
        .catch(err => console.error('Failed to load stats:', err));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin');
  };

  const handleProviderChange = (provider: AdProvider) => {
    setAdConfig(prev => ({ ...prev, provider }));
  };

  const handleGoogleAdSenseToggle = () => {
    setAdConfig(prev => ({
      ...prev,
      googleAdSense: {
        ...prev.googleAdSense!,
        enabled: !prev.googleAdSense?.enabled
      }
    }));
  };

  const handleMediaNetToggle = () => {
    setAdConfig(prev => ({
      ...prev,
      mediaNet: {
        ...prev.mediaNet!,
        enabled: !prev.mediaNet?.enabled
      }
    }));
  };

  const handleGooglePublisherIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdConfig(prev => ({
      ...prev,
      googleAdSense: {
        ...prev.googleAdSense!,
        publisherId: e.target.value
      }
    }));
  };

  const handleMediaNetSiteIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdConfig(prev => ({
      ...prev,
      mediaNet: {
        ...prev.mediaNet!,
        siteId: e.target.value
      }
    }));
  };

  const handlePropellerAdsToggle = () => {
    setAdConfig(prev => ({
      ...prev,
      propellerAds: {
        ...prev.propellerAds!,
        enabled: !prev.propellerAds?.enabled
      }
    }));
  };

  const handlePropellerAdsZoneIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdConfig(prev => ({
      ...prev,
      propellerAds: {
        ...prev.propellerAds!,
        zoneId: e.target.value
      }
    }));
  };

  const handleAdsterraToggle = () => {
    setAdConfig(prev => ({
      ...prev,
      adsterra: {
        ...prev.adsterra!,
        enabled: !prev.adsterra?.enabled
      }
    }));
  };

  const handleAdsterraPublisherIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdConfig(prev => ({
      ...prev,
      adsterra: {
        ...prev.adsterra!,
        publisherId: e.target.value
      }
    }));
  };

  const handleSaveAdConfig = async () => {
    // Get admin password from prompt for now (stored in memory only during session)
    const adminPassword = prompt('Enter admin password to save:');
    if (!adminPassword) {
      setSaveMessage('Save cancelled - password required.');
      return;
    }

    const success = await adService.saveConfig(adConfig, adminPassword);
    if (success) {
      setSaveMessage('Ad configuration saved! Page will reload to apply changes.');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setSaveMessage('Failed to save ad configuration. Check password and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Usage Statistics
            </button>
            <button
              onClick={() => setActiveTab('ads')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ads'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Ad Provider Settings
            </button>
          </nav>
        </div>

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <Card>
            <h2 className="text-2xl font-bold mb-6">Usage Statistics</h2>
            <Table>
              <thead>
                <tr>
                  <th className="text-left p-2">Calculator</th>
                  <th className="text-right p-2">Usage Count</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((stat) => (
                  <tr key={stat.calculator_name}>
                    <td className="p-2">{stat.calculator_name}</td>
                    <td className="text-right p-2">{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {/* Ad Provider Tab */}
        {activeTab === 'ads' && (
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold mb-6">Active Ad Provider</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="google-adsense"
                      checked={adConfig.provider === 'google-adsense'}
                      onChange={() => handleProviderChange('google-adsense')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium">Google AdSense</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="media-net"
                      checked={adConfig.provider === 'media-net'}
                      onChange={() => handleProviderChange('media-net')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium">Media.net</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="propeller-ads"
                      checked={adConfig.provider === 'propeller-ads'}
                      onChange={() => handleProviderChange('propeller-ads')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium">PropellerAds</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="adsterra"
                      checked={adConfig.provider === 'adsterra'}
                      onChange={() => handleProviderChange('adsterra')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium">Adsterra</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="provider"
                      value="none"
                      checked={adConfig.provider === 'none'}
                      onChange={() => handleProviderChange('none')}
                      className="w-4 h-4 text-primary-600"
                    />
                    <span className="text-sm font-medium">Disabled</span>
                  </label>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-6">Google AdSense Configuration</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="google-enabled"
                    checked={adConfig.googleAdSense?.enabled ?? false}
                    onChange={handleGoogleAdSenseToggle}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="google-enabled" className="text-sm font-medium">
                    Enable Google AdSense
                  </label>
                </div>
                <Input
                  label="Publisher ID"
                  type="text"
                  value={adConfig.googleAdSense?.publisherId ?? ''}
                  onChange={handleGooglePublisherIdChange}
                  placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  disabled={!adConfig.googleAdSense?.enabled}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your Google AdSense publisher ID (starts with ca-pub-)
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-6">Media.net Configuration</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="medianet-enabled"
                    checked={adConfig.mediaNet?.enabled ?? false}
                    onChange={handleMediaNetToggle}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="medianet-enabled" className="text-sm font-medium">
                    Enable Media.net
                  </label>
                </div>
                <Input
                  label="Site ID"
                  type="text"
                  value={adConfig.mediaNet?.siteId ?? ''}
                  onChange={handleMediaNetSiteIdChange}
                  placeholder="Enter your Media.net Site ID"
                  disabled={!adConfig.mediaNet?.enabled}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your Media.net site ID from your publisher dashboard
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-6">PropellerAds Configuration ⚡ (Fast Approval)</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="propellerads-enabled"
                    checked={adConfig.propellerAds?.enabled ?? false}
                    onChange={handlePropellerAdsToggle}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="propellerads-enabled" className="text-sm font-medium">
                    Enable PropellerAds
                  </label>
                </div>
                <Input
                  label="Zone ID"
                  type="text"
                  value={adConfig.propellerAds?.zoneId ?? ''}
                  onChange={handlePropellerAdsZoneIdChange}
                  placeholder="Enter your PropellerAds Zone ID"
                  disabled={!adConfig.propellerAds?.enabled}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign up at <a href="https://propellerads.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">propellerads.com</a> - Easy approval, instant setup!
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-2xl font-bold mb-6">Adsterra Configuration ⚡ (Instant Approval)</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="adsterra-enabled"
                    checked={adConfig.adsterra?.enabled ?? false}
                    onChange={handleAdsterraToggle}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="adsterra-enabled" className="text-sm font-medium">
                    Enable Adsterra
                  </label>
                </div>
                <Input
                  label="Publisher ID"
                  type="text"
                  value={adConfig.adsterra?.publisherId ?? ''}
                  onChange={handleAdsterraPublisherIdChange}
                  placeholder="Enter your Adsterra Publisher ID"
                  disabled={!adConfig.adsterra?.enabled}
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign up at <a href="https://www.adsterra.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">adsterra.com</a> - No approval needed, start immediately!
                </p>
              </div>
            </Card>

            <div className="flex items-center justify-between">
              <div>
                {saveMessage && (
                  <p className="text-sm text-green-600 dark:text-green-400">{saveMessage}</p>
                )}
              </div>
              <Button onClick={handleSaveAdConfig}>
                Save Ad Configuration
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
