import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const AdminProtected = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // If NOT logged in → send to admin login page
  if (!user) {
    return <Navigate to="/secure-admin-login" replace />;
  }

  // If logged in → allow access
  return children;
};

export default AdminProtected;
