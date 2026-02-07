import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ No localStorage hack anymore
      navigate("/admin");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-[#111] p-6 rounded w-80 border border-yellow-600">
        <h2 className="text-yellow-400 text-lg mb-4">Admin Login</h2>

        <input
          className="input mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
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
};

export default AdminLogin;
