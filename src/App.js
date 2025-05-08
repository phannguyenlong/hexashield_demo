import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SimulationProvider } from './contexts/SimulationContext';
import { SecurityProvider } from './contexts/SecurityContext';
import { useSecurity } from './contexts/SecurityContext';

// Components
import AlertOverlay from './components/AlertOverlay';

// Pages
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MonitoringPage from './pages/MonitoringPage';
import ProtectionPage from './pages/ProtectionPage';
import ResponsePage from './pages/ResponsePage';
import AttackDetailsPage from './pages/AttackDetailsPage';
import AttackReportPage from './pages/AttackReportPage';
import RuleCustomizationPage from './pages/RuleCustomizationPage';
import IntegrationPage from './pages/IntegrationPage';
import SimulationPage from './pages/SimulationPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';
import PrivateRoute from './components/auth/PrivateRoute';

// Global CSS
import './assets/styles/global.css';

// AlertOverlayWrapper component to access context
const AlertOverlayWrapper = ({ children }) => {
  const { showAttackAlert, activeAttack, closeAttackAlert } = useSecurity();
  
  return (
    <>
      {showAttackAlert && activeAttack && (
        <AlertOverlay attack={activeAttack} onClose={closeAttackAlert} />
      )}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SecurityProvider>
          <SimulationProvider>
            <AlertOverlayWrapper>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                  <Route index element={<Navigate replace to="/dashboard" />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="monitoring" element={<MonitoringPage />} />
                  <Route path="protection" element={<ProtectionPage />} />
                  <Route path="response" element={<ResponsePage />} />
                  <Route path="response/attack-details" element={<AttackDetailsPage />} />
                  <Route path="response/attack-report" element={<AttackReportPage />} />
                  <Route path="rules" element={<RuleCustomizationPage />} />
                  <Route path="integration" element={<IntegrationPage />} />
                  <Route path="simulation" element={<SimulationPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
                
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </AlertOverlayWrapper>
          </SimulationProvider>
        </SecurityProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;