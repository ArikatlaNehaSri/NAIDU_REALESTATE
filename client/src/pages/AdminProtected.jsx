import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsub();
  }, []);

  // ⏳ wait until Firebase checks login
  if (user === undefined) return null;

  // ❌ not logged in → go to login
  if (!user) return <Navigate to="/secure-admin-login" replace />;

  // ✅ logged in → allow admin
  return children;
};

export default AdminProtected;
