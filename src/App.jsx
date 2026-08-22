import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Prescription from './components/Prescription';
import Appointments from './components/Appointments';
import FollowUps from './components/FollowUps';
import KnowledgeBase from './components/KnowledgeBase';

import LoginPage from './components/Auth/LoginPage';
import PatientDashboard from './components/PatientPortal/PatientDashboard';
import ConsultationWorkspace from './components/DoctorPortal/ConsultationWorkspace';
import PatientMedicalRecord from './components/DoctorPortal/PatientMedicalRecord';
import StockReceived from './components/AdminPortal/StockReceived';
import SalesManagement from './components/AdminPortal/SalesManagement';
import ReportsAnalytics from './components/AdminPortal/ReportsAnalytics';
import SettingsAudit from './components/AdminPortal/SettingsAudit';

import {
  INITIAL_USERS,
  INITIAL_PRODUCTS,
  INITIAL_TRANSACTIONS,
  INITIAL_PATIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_CONSULTATIONS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_FOLLOWUPS,
  INITIAL_SALES,
  INITIAL_AUDIT_LOGS,
  INITIAL_CONDITIONS,
  CLINIC_INFO
} from './data/mockData';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Authentication & Role State
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('dermat_currentUser');
    return savedUser ? JSON.parse(savedUser) : INITIAL_USERS[1]; // Default Doctor role for demo
  });

  const [activePortal, setActivePortal] = useState('DOCTOR');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('dermat_isAuth');
    return savedAuth ? JSON.parse(savedAuth) : true;
  });

  // Persistent App State Handlers
  const [stock, setStock] = useState(() => {
    const saved = localStorage.getItem('dermat_stock');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('dermat_txns');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('dermat_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('dermat_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [consultations, setConsultations] = useState(() => {
    const saved = localStorage.getItem('dermat_consultations');
    return saved ? JSON.parse(saved) : INITIAL_CONSULTATIONS;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('dermat_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [followups, setFollowups] = useState(() => {
    const saved = localStorage.getItem('dermat_followups');
    return saved ? JSON.parse(saved) : INITIAL_FOLLOWUPS;
  });

  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('dermat_sales');
    return saved ? JSON.parse(saved) : INITIAL_SALES;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('dermat_auditLogs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [clinicDetails, setClinicDetails] = useState(() => {
    const saved = localStorage.getItem('dermat_clinicInfo');
    return saved ? JSON.parse(saved) : CLINIC_INFO;
  });

  // Active View Modals / Sub-views
  const [activeConsultationAppointment, setActiveConsultationAppointment] = useState(null);
  const [viewingMedicalRecordPatientId, setViewingMedicalRecordPatientId] = useState(null);
  const [selectedPatientForRx, setSelectedPatientForRx] = useState(null);
  const [prefilledRxData, setPrefilledRxData] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('dermat_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dermat_isAuth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('dermat_stock', JSON.stringify(stock));
  }, [stock]);

  useEffect(() => {
    localStorage.setItem('dermat_txns', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('dermat_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('dermat_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('dermat_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('dermat_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('dermat_followups', JSON.stringify(followups));
  }, [followups]);

  useEffect(() => {
    localStorage.setItem('dermat_sales', JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem('dermat_auditLogs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dermat_clinicInfo', JSON.stringify(clinicDetails));
  }, [clinicDetails]);

  // Apply Theme Attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    setIsAuthenticated(true);
    // Log audit event
    const newLog = {
      id: `LOG-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleString(),
      user: userObj.name,
      role: userObj.role,
      action: 'User Authentication',
      details: `User signed into ${userObj.role} portal.`
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveConsultationAppointment(null);
    setViewingMedicalRecordPatientId(null);
  };

  // If unauthenticated, show role-based Login Page
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={handleLogin}
        activePortal={activePortal}
        setActivePortal={setActivePortal}
      />
    );
  }

  // If patient role, render full Patient Portal
  if (currentUser?.role === 'PATIENT') {
    return (
      <div className="app-container">
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          clinicInfo={clinicDetails}
          onLogout={handleLogout}
        />
        <div className="main-content">
          <Navbar
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            theme={theme}
            toggleTheme={toggleTheme}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clinicInfo={clinicDetails}
            onLogout={handleLogout}
          />
          <main className="content-body">
            <PatientDashboard
              currentUser={currentUser}
              patients={patients}
              setPatients={setPatients}
              appointments={appointments}
              setAppointments={setAppointments}
              prescriptions={prescriptions}
              consultations={consultations}
              followups={followups}
              sales={sales}
              clinicInfo={clinicDetails}
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        clinicInfo={clinicDetails}
        onLogout={handleLogout}
      />

      <div className="main-content">
        <Navbar
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          theme={theme}
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clinicInfo={clinicDetails}
          onLogout={handleLogout}
        />

        <main className="content-body">
          {/* Active Sub-Views (Consultation Workspace / Medical EMR Timeline) */}
          {activeConsultationAppointment ? (
            <ConsultationWorkspace
              appointment={activeConsultationAppointment}
              patient={patients.find(p => p.id === activeConsultationAppointment.patientId) || patients[0]}
              stock={stock}
              setStock={setStock}
              prescriptions={prescriptions}
              setPrescriptions={setPrescriptions}
              consultations={consultations}
              setConsultations={setConsultations}
              appointments={appointments}
              setAppointments={setAppointments}
              followups={followups}
              setFollowups={setFollowups}
              clinicInfo={clinicDetails}
              onClose={() => setActiveConsultationAppointment(null)}
              onViewMedicalRecord={(pId) => setViewingMedicalRecordPatientId(pId)}
            />
          ) : viewingMedicalRecordPatientId ? (
            <PatientMedicalRecord
              patientId={viewingMedicalRecordPatientId}
              patients={patients}
              appointments={appointments}
              consultations={consultations}
              prescriptions={prescriptions}
              followups={followups}
              sales={sales}
              onBack={() => setViewingMedicalRecordPatientId(null)}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <Dashboard
                  stock={stock}
                  appointments={appointments}
                  prescriptions={prescriptions}
                  followups={followups}
                  sales={sales}
                  patients={patients}
                  setActiveTab={setActiveTab}
                  setSelectedPatientForRx={setSelectedPatientForRx}
                  onOpenConsultation={(apt) => setActiveConsultationAppointment(apt)}
                  onViewMedicalRecord={(pId) => setViewingMedicalRecordPatientId(pId)}
                />
              )}

              {activeTab === 'inventory' && (
                <Inventory
                  stock={stock}
                  setStock={setStock}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  onNavigateStockReceived={() => setActiveTab('stock_received')}
                  onNavigateSales={() => setActiveTab('sales')}
                />
              )}

              {activeTab === 'stock_received' && (
                <StockReceived
                  stock={stock}
                  setStock={setStock}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              )}

              {activeTab === 'sales' && (
                <SalesManagement
                  stock={stock}
                  setStock={setStock}
                  sales={sales}
                  setSales={setSales}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  patients={patients}
                />
              )}

              {activeTab === 'prescription' && (
                <Prescription
                  patients={patients}
                  stock={stock}
                  setStock={setStock}
                  prescriptions={prescriptions}
                  setPrescriptions={setPrescriptions}
                  transactions={transactions}
                  setTransactions={setTransactions}
                  clinicInfo={clinicDetails}
                  selectedPatientId={selectedPatientForRx}
                  prefilledRxData={prefilledRxData}
                />
              )}

              {activeTab === 'appointments' && (
                <Appointments
                  appointments={appointments}
                  setAppointments={setAppointments}
                  patients={patients}
                  setPatients={setPatients}
                  setActiveTab={setActiveTab}
                  setSelectedPatientForRx={setSelectedPatientForRx}
                  onOpenConsultation={(apt) => setActiveConsultationAppointment(apt)}
                  onViewMedicalRecord={(pId) => setViewingMedicalRecordPatientId(pId)}
                />
              )}

              {activeTab === 'followups' && (
                <FollowUps
                  followups={followups}
                  setFollowups={setFollowups}
                  patients={patients}
                  clinicInfo={clinicDetails}
                />
              )}

              {activeTab === 'atlas' && (
                <KnowledgeBase
                  conditions={INITIAL_CONDITIONS}
                  setActiveTab={setActiveTab}
                  setPrefilledRxData={setPrefilledRxData}
                />
              )}

              {activeTab === 'reports' && (
                <ReportsAnalytics
                  appointments={appointments}
                  consultations={consultations}
                  sales={sales}
                  stock={stock}
                  followups={followups}
                  patients={patients}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsAudit
                  clinicInfo={clinicDetails}
                  setClinicInfo={setClinicDetails}
                  auditLogs={auditLogs}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
