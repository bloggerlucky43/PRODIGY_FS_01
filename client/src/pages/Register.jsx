import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const bApp = import.meta.env.B_URL;
const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios(`${bApp}/api/auth/sign-up`, form);

      // if (!res.ok) {

      // }
      alert("Registered! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Enter your password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Confirm your password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Register;
