import { useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="dashboard-header">

        <div>
          <h1>Employee Portal</h1>
          <p>Welcome to your dashboard</p>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>

      {/* GRID */}
      <div className="dashboard-grid">

        <div className="dashboard-card" onClick={() => navigate("/profile")}>
          <h3>👤 Profile</h3>
          <p>View employee profile</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/edit-profile")}>
          <h3>✏️ Edit Profile</h3>
          <p>Update personal details</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/apply-leave")}>
          <h3>📝 Apply Leave</h3>
          <p>Submit leave request</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/leave-history")}>
          <h3>📋 Leave History</h3>
          <p>View previous requests</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/attendance")}>
          <h3>🕒 Attendance</h3>
          <p>Check attendance records</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/change-password")}>
          <h3>🔒 Change Password</h3>
          <p>Update account security</p>
        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;