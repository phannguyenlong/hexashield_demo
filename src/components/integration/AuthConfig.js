import React, { useState } from 'react';
import { CheckCircle, Save, Lock, Shield, User } from 'lucide-react';

const AuthConfig = () => {
  const [config, setConfig] = useState({
    authType: 'ldap',
    ldapServer: 'ldap://example.com:389',
    ldapBaseDn: 'dc=example,dc=com',
    enableSsoIntegration: false,
    ssoProvider: 'none',
    enable2fa: true,
    passwordPolicy: 'strong',
    bruteForceProtection: true,
    ldapInjectionProtection: true,
    failedLoginLimit: 5
  });
  
  const [saved, setSaved] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setSaved(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    setTimeout(() => {
      setSaved(true);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      {saved && (
        <div className="bg-green-900 text-green-100 p-3 rounded-md flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          Authentication security settings saved successfully.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Authentication System Type
                </label>
                <select
                  name="authType"
                  value={config.authType}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="ldap">LDAP / Active Directory</option>
                  <option value="local">Local Authentication Database</option>
                  <option value="saml">SAML 2.0</option>
                  <option value="oauth">OAuth 2.0 / OpenID Connect</option>
                </select>
              </div>
              
              {config.authType === 'ldap' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      LDAP Server URL
                    </label>
                    <input
                      type="text"
                      name="ldapServer"
                      value={config.ldapServer}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ldap://server:389"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      LDAP Base DN
                    </label>
                    <input
                      type="text"
                      name="ldapBaseDn"
                      value={config.ldapBaseDn}
                      onChange={handleChange}
                      className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="dc=example,dc=com"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password Policy
                </label>
                <select
                  name="passwordPolicy"
                  value={config.passwordPolicy}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="basic">Basic (8+ characters)</option>
                  <option value="medium">Medium (8+ chars, mixed case, numbers)</option>
                  <option value="strong">Strong (12+ chars, mixed case, numbers, symbols)</option>
                  <option value="custom">Custom Policy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Failed Login Limit
                </label>
                <input
                  type="number"
                  name="failedLoginLimit"
                  value={config.failedLoginLimit}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-sm text-gray-400">
                  Number of failed attempts before account lockout
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="ldapInjectionProtection"
                      name="ldapInjectionProtection"
                      type="checkbox"
                      checked={config.ldapInjectionProtection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="ldapInjectionProtection" className="font-medium text-gray-300">
                      Enable LDAP Injection Protection
                    </label>
                    <p className="text-gray-400">Prevent LDAP injection attacks</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="bruteForceProtection"
                      name="bruteForceProtection"
                      type="checkbox"
                      checked={config.bruteForceProtection}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="bruteForceProtection" className="font-medium text-gray-300">
                      Enable Brute Force Protection
                    </label>
                    <p className="text-gray-400">Progressive delays and IP blocking</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enable2fa"
                      name="enable2fa"
                      type="checkbox"
                      checked={config.enable2fa}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enable2fa" className="font-medium text-gray-300">
                      Enable Two-Factor Authentication
                    </label>
                    <p className="text-gray-400">Require 2FA for all users</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="enableSsoIntegration"
                      name="enableSsoIntegration"
                      type="checkbox"
                      checked={config.enableSsoIntegration}
                      onChange={handleChange}
                      className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="enableSsoIntegration" className="font-medium text-gray-300">
                      Enable SSO Integration
                    </label>
                    <p className="text-gray-400">Single Sign-On with external providers</p>
                  </div>
                </div>
              </div>
              
              {config.enableSsoIntegration && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    SSO Provider
                  </label>
                  <select
                    name="ssoProvider"
                    value={config.ssoProvider}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="none">Select SSO Provider</option>
                    <option value="azure">Azure AD</option>
                    <option value="google">Google Workspace</option>
                    <option value="okta">Okta</option>
                    <option value="custom">Custom SAML Provider</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </button>
            </div>
          </form>
        </div>
        
        <div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-3">Authentication Security</h3>
            <p className="text-gray-400 text-sm mb-4">
              The authentication integration uses Keycloak to protect against LDAP injection and
              brute force attacks while providing secure identity management.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Lock className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-300 text-sm">LDAP injection prevention</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-300 text-sm">Brute force protection</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-gray-300 text-sm">Multi-factor authentication</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthConfig;
