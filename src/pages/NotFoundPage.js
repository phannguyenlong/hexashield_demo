// src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-gray-800 inline-block">
            <Shield className="h-16 w-16 text-blue-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Please check the URL or return to the dashboard.
        </p>
        
        <Link 
          to="/dashboard" 
          className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;