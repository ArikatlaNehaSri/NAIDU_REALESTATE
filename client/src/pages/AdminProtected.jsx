import { useState } from "react";
import Admin from "./Admin";

const ADMIN_PASSWORD = "naidu123"; // 🔴 change this

const AdminProtected = () => {
  const [auth, setAuth] = useState(
    sessionStorage.getItem("adminAuth") === "true"
  );
  const [pwd, setPwd] = useState("");

  const login = () => {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminAuth", "true");
      setAuth(true);
    } else {
      alert("Wrong password");
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="bg-[#111] p-6 rounded border border-yellow-600 w-80">
          <h2 className="text-yellow-400 text-lg mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="w-full p-2 bg-black border border-gray-600 rounded mb-4"
          />
          <button
            onClick={login}
            className="w-full bg-yellow-500 text-black py-2 rounded font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return <Admin />;
};

export default AdminProtected;
