import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const bApp = import.meta.env.VITE_API_URL;
console.log(bApp);

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${bApp}/api/auth/register`, form);

      const data = await res.data;
      alert("Registered! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <h2>Sign up</h2>
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control my-1"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control my-1"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <div className="form-group my-3">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control my-1"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3"
          disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"></span>
              Authenticating...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );

  // return (
  //   <>
  //     <div className="form-inner">
  //       <div className="form-div">
  //         <form onSubmit={handleSubmit}>
  //           <h2>Sign Up</h2>
  //           <div className="form-input">
  //             <label htmlFor="">Username</label>
  //             <input
  //               type="text"
  //               placeholder="Enter your username"
  //               value={form.username}
  //               onChange={(e) => setForm({ ...form, username: e.target.value })}
  //               required
  //             />
  //           </div>

  //           <div className="form-input">
  //             <label htmlFor="">Password</label>
  //             <input
  //               type="password"
  //               placeholder="Enter your password"
  //               value={form.password}
  //               onChange={(e) => setForm({ ...form, password: e.target.value })}
  //               required
  //             />
  //           </div>
  //           <div className="form-input">
  //             <label htmlFor="">Confirm Password</label>
  //             <input
  //               type="password"
  //               placeholder="Confirm your password"
  //               value={form.confirmPassword}
  //               onChange={(e) =>
  //                 setForm({ ...form, confirmPassword: e.target.value })
  //               }
  //               required
  //             />
  //           </div>
  //           <p>
  //             Already have an account? <a href="#">Sign in</a>
  //           </p>

  //           <div className="form-button">

  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Register;
