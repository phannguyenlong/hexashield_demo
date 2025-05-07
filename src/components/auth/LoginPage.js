import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img 
            src="/hexashield-logo.png" 
            alt="HexaShield Logo" 
            className="h-16 w-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x400/EEE/31343C';
            }}
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">
          HexaShield Security Framework
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Comprehensive Security Management for SMEs
        </p>
        
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="bg-red-900 text-white p-3 rounded mb-4">
              {errorMessage}
            </div>
          )}
          
          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="block text-gray-300 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@hexashield.com"
            />
          </div>
          
          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="admin123"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <p>Email: admin@hexashield.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;