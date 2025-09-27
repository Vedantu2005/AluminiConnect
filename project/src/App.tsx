import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import AlumniDashboard from './components/Dashboard/AlumniDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import AlumniDirectory from './components/Alumni/AlumniDirectory';
import Events from './components/Events/Events';
import CreateEvent from './components/Events/CreateEvent'; // <-- IMPORT the new component

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'alumni':
      return <AlumniDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    default:
      return <AlumniDashboard />;
  }
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Dashboard />
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/alumni"
        element={
          <ProtectedRoute>
            <Layout>
              <AlumniDirectory />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <Layout>
              <Events />
            </Layout>
          </ProtectedRoute>
        }
      />
      
      {/* --- ADD the new route for the create event form --- */}
      <Route
        path="/events/new"
        element={
          <ProtectedRoute>
            {/* The Layout component is not used here to show a full-page form */}
            <CreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mentorship"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Mentorship System</h1>
                  <p className="text-gray-600">Coming soon - Connect mentors with students</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/opportunities"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Opportunities</h1>
                  <p className="text-gray-600">Coming soon - Job and internship board</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/donations"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Donations & Fundraising</h1>
                  <p className="text-gray-600">Coming soon - Support your alma mater</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
                  <p className="text-gray-600">Coming soon - Comprehensive analytics and reporting</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/communications"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Communications Hub</h1>
                  <p className="text-gray-600">Coming soon - Messaging and announcements</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Management</h1>
                  <p className="text-gray-600">Coming soon - Manage your profile and settings</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Settings</h1>
                  <p className="text-gray-600">Coming soon - Account and privacy settings</p>
                </div>
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

