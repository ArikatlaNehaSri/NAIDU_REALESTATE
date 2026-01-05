import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

/* ---------- ADMIN AUTH CHECK ---------- */
const isAdminLoggedIn = () => {
  return localStorage.getItem("adminLoggedIn") === "true";
};

/* ---------- PROTECTED ROUTE ---------- */
const ProtectedRoute = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/secure-admin-login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="pt-20 pb-16">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />

            {/* SECRET ADMIN LOGIN (NOT VISIBLE ANYWHERE) */}
            <Route
              path="/secure-admin-login"
              element={
                isAdminLoggedIn() ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <AdminLogin />
                )
              }
            />

            {/* ADMIN DASHBOARD (PROTECTED) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* FALLBACK: UNKNOWN ROUTES GO HOME */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        <WhatsAppButton />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
