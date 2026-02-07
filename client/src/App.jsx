import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProtected from "./pages/AdminProtected";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PropertyDetails from "./pages/PropertyDetails";
import AdminAnalytics from "./pages/AdminAnalytics";



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
<Route path="/admin-analytics" element={<AdminAnalytics />} />

            {/* SECRET ADMIN LOGIN */}
            <Route path="/secure-admin-login" element={<AdminLogin />} />
<Route path="/property/:id" element={<PropertyDetails />} />

            {/* ADMIN DASHBOARD (FIREBASE PROTECTED) */}
            <Route
              path="/admin"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            />

            {/* FALLBACK */}
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
