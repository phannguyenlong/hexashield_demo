// src/pages/SettingsPage.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Save, User, Bell, Shield, Database, Monitor, Lock } from 'lucide-react';

const SettingsPage = () => {
  const { currentUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Profile settings form
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    company: currentUser?.company || '',
    jobTitle: 'Security Administrator',
    phone: '+1 (555) 123-4567',
    language: 'en',
    timezone: 'UTC-8'
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    criticalAlerts: true,
    dailyReports: true,
    weeklyReports: true,
    systemUpdates: true,
    vulnerabilityReports: true
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    passwordExpiry: '90',
    loginAttempts: '5',
    minimumPasswordLength: '12',
    requireSpecialChars: true,
    requireNumbers: true
  });
  
  // System settings
  const [systemSettings, setSystemSettings] = useState({
    darkMode: true,
    autoRefresh: true,
    refreshInterval: '60',
    dataRetention: '90',
    defaultDashboard: 'security',
    telemetrySharing: true,
    anonymizedDataSharing: true
  });
  
  // Handle form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle save
  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={profileForm.company}
                  onChange={handleProfileChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={profileForm.jobTitle}
                  onChange={handleProfileChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Language
                </label>
                <select
                  name="language"
                  value={profileForm.language}
                  onChange={handleProfileChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Timezone
              </label>
              <select
                name="timezone"
                value={profileForm.timezone}
                onChange={handleProfileChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="UTC-12">UTC-12</option>
                <option value="UTC-11">UTC-11</option>
                <option value="UTC-10">UTC-10</option>
                <option value="UTC-9">UTC-9</option>
                <option value="UTC-8">UTC-8</option>
                <option value="UTC-7">UTC-7</option>
                <option value="UTC-6">UTC-6</option>
                <option value="UTC-5">UTC-5</option>
                <option value="UTC-4">UTC-4</option>
                <option value="UTC-3">UTC-3</option>
                <option value="UTC-2">UTC-2</option>
                <option value="UTC-1">UTC-1</option>
                <option value="UTC+0">UTC+0</option>
                <option value="UTC+1">UTC+1</option>
                <option value="UTC+2">UTC+2</option>
                <option value="UTC+3">UTC+3</option>
                <option value="UTC+4">UTC+4</option>
                <option value="UTC+5">UTC+5</option>
                <option value="UTC+6">UTC+6</option>
                <option value="UTC+7">UTC+7</option>
                <option value="UTC+8">UTC+8</option>
                <option value="UTC+9">UTC+9</option>
                <option value="UTC+10">UTC+10</option>
                <option value="UTC+11">UTC+11</option>
                <option value="UTC+12">UTC+12</option>
              </select>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Email Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="emailAlerts"
                      name="emailAlerts"
                      type="checkbox"
                      checked={notificationSettings.emailAlerts}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="emailAlerts" className="font-medium text-gray-300">
                      Email Security Alerts
                    </label>
                    <p className="text-gray-400">Receive security alerts via email</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="criticalAlerts"
                      name="criticalAlerts"
                      type="checkbox"
                      checked={notificationSettings.criticalAlerts}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="criticalAlerts" className="font-medium text-gray-300">
                      Critical Alerts Only
                    </label>
                    <p className="text-gray-400">Only send notifications for critical events</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Reports</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="dailyReports"
                      name="dailyReports"
                      type="checkbox"
                      checked={notificationSettings.dailyReports}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="dailyReports" className="font-medium text-gray-300">
                      Daily Security Reports
                    </label>
                    <p className="text-gray-400">Receive daily summary of security events</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="weeklyReports"
                      name="weeklyReports"
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="weeklyReports" className="font-medium text-gray-300">
                      Weekly Security Reports
                    </label>
                    <p className="text-gray-400">Receive weekly security analysis and trends</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">System Notifications</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="systemUpdates"
                      name="systemUpdates"
                      type="checkbox"
                      checked={notificationSettings.systemUpdates}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="systemUpdates" className="font-medium text-gray-300">
                      System Updates
                    </label>
                    <p className="text-gray-400">Be notified when system updates are available</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="vulnerabilityReports"
                      name="vulnerabilityReports"
                      type="checkbox"
                      checked={notificationSettings.vulnerabilityReports}
                      onChange={handleNotificationChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="vulnerabilityReports" className="font-medium text-gray-300">
                      Vulnerability Reports
                    </label>
                    <p className="text-gray-400">Receive notifications about new vulnerabilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Account Security</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="twoFactorAuth"
                      name="twoFactorAuth"
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="twoFactorAuth" className="font-medium text-gray-300">
                      Two-Factor Authentication
                    </label>
                    <p className="text-gray-400">Enable 2FA for additional account security</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={handleSecurityChange}
                    min="5"
                    max="120"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Maximum Failed Login Attempts
                  </label>
                  <input
                    type="number"
                    name="loginAttempts"
                    value={securitySettings.loginAttempts}
                    onChange={handleSecurityChange}
                    min="3"
                    max="10"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Password Policy</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    value={securitySettings.passwordExpiry}
                    onChange={handleSecurityChange}
                    min="30"
                    max="365"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    name="minimumPasswordLength"
                    value={securitySettings.minimumPasswordLength}
                    onChange={handleSecurityChange}
                    min="8"
                    max="20"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="requireSpecialChars"
                      name="requireSpecialChars"
                      type="checkbox"
                      checked={securitySettings.requireSpecialChars}
                      onChange={handleSecurityChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="requireSpecialChars" className="font-medium text-gray-300">
                      Require Special Characters
                    </label>
                    <p className="text-gray-400">Passwords must include special characters</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="requireNumbers"
                      name="requireNumbers"
                      type="checkbox"
                      checked={securitySettings.requireNumbers}
                      onChange={handleSecurityChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="requireNumbers" className="font-medium text-gray-300">
                      Require Numbers
                    </label>
                    <p className="text-gray-400">Passwords must include numbers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'system':
      default:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Display Settings</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="darkMode"
                      name="darkMode"
                      type="checkbox"
                      checked={systemSettings.darkMode}
                      onChange={handleSystemChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="darkMode" className="font-medium text-gray-300">
                      Dark Mode
                    </label>
                    <p className="text-gray-400">Use dark color scheme for interface</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Default Dashboard
                  </label>
                  <select
                    name="defaultDashboard"
                    value={systemSettings.defaultDashboard}
                    onChange={handleSystemChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="security">Security Dashboard</option>
                    <option value="monitoring">Monitoring Dashboard</option>
                    <option value="events">Events Dashboard</option>
                    <option value="summary">Summary Dashboard</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Data Settings</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="autoRefresh"
                      name="autoRefresh"
                      type="checkbox"
                      checked={systemSettings.autoRefresh}
                      onChange={handleSystemChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="autoRefresh" className="font-medium text-gray-300">
                      Auto-refresh Data
                    </label>
                    <p className="text-gray-400">Automatically update dashboards and reports</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    name="refreshInterval"
                    value={systemSettings.refreshInterval}
                    onChange={handleSystemChange}
                    min="15"
                    max="300"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Data Retention Period (days)
                  </label>
                  <input
                    type="number"
                    name="dataRetention"
                    value={systemSettings.dataRetention}
                    onChange={handleSystemChange}
                    min="30"
                    max="365"
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Privacy Settings</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="telemetrySharing"
                      name="telemetrySharing"
                      type="checkbox"
                      checked={systemSettings.telemetrySharing}
                      onChange={handleSystemChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="telemetrySharing" className="font-medium text-gray-300">
                      Share Usage Data
                    </label>
                    <p className="text-gray-400">Help improve HexaShield by sharing usage statistics</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="anonymizedDataSharing"
                      name="anonymizedDataSharing"
                      type="checkbox"
                      checked={systemSettings.anonymizedDataSharing}
                      onChange={handleSystemChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="anonymizedDataSharing" className="font-medium text-gray-300">
                      Share Anonymized Threat Data
                    </label>
                    <p className="text-gray-400">Contribute to the security community by sharing anonymized threat data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
      </div>
      
      {showSuccessMessage && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <Save className="h-5 w-5 mr-2" />
          Settings saved successfully.
        </div>
      )}
      
      <div className="bg-gray-700 rounded-lg shadow overflow-hidden">
        <div className="flex border-b border-gray-600">
          <button
            className={`px-4 py-3 flex items-center text-sm font-medium ${
              activeTab === 'profile' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </button>
          
          <button
            className={`px-4 py-3 flex items-center text-sm font-medium ${
              activeTab === 'notifications' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </button>
          
          <button
            className={`px-4 py-3 flex items-center text-sm font-medium ${
              activeTab === 'security' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <Shield className="h-5 w-5 mr-2" />
            Security
          </button>
          
          <button
            className={`px-4 py-3 flex items-center text-sm font-medium ${
              activeTab === 'system' 
                ? 'text-blue-500 border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => setActiveTab('system')}
          >
            <Monitor className="h-5 w-5 mr-2" />
            System
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSave}>
            {renderTabContent()}
            
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;