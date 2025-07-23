import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/protected/dashboard",
          {
            withCredentials: true,
          }
        );
        setData(res.data.message);
      } catch {
        logout();
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Dashboard</h2>
      <p>{data}</p>
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
