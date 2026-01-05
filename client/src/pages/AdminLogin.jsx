import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  const handleLogin = (e) => {
  e.preventDefault();

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  alert(
    `ENV EMAIL: "${adminEmail}"\nENV PASSWORD: "${adminPassword}"`
  );

  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem("adminLoggedIn", "true");
    navigate("/admin", { replace: true });
  } else {
    alert("Invalid admin credentials");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-[#111] p-6 rounded w-full max-w-sm border border-yellow-600"
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full mb-3 px-4 py-2 bg-black border border-gray-600 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 bg-black border border-gray-600 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-yellow-500 text-black py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
