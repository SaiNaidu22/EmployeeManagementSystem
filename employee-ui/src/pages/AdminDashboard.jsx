import { useEffect, useState } from "react";
import {
  getDashboard,
  exportEmployees,
  exportEmployeesPdf
} from "../api/employeeApi";

import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

import {
  FaUsers,
  FaClipboardList,
  FaCalendarCheck,
  FaUserCog,
  FaFileExcel,
  FaFilePdf,
  FaKey
} from "react-icons/fa";

function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const data = await getDashboard();
    setStats(data);
  };

  if (!stats) return <h2>Loading...</h2>;

  const handleExport = async () => {
    const blob = await exportEmployees();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "Employees.xlsx";
    link.click();
  };

  const handlePdfExport = async () => {
    const blob = await exportEmployeesPdf();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "EmployeeReport.pdf";
    link.click();
  };

  return (
    <div className="admin-dashboard-container">

      <div className="admin-dashboard-card">

        <h2 className="admin-title">Admin Dashboard</h2>

        {/* STATS */}
        <div className="stats-grid">

          <div className="stat-card">
            <h5><FaUsers /> Employees</h5>
            <h2>{stats.totalEmployees}</h2>
          </div>

          <div className="stat-card">
            <h5><FaClipboardList /> Pending Leaves</h5>
            <h2>{stats.pendingLeaves}</h2>
          </div>

          <div className="stat-card">
            <h5><FaCalendarCheck /> Approved Leaves</h5>
            <h2>{stats.approvedLeaves}</h2>
          </div>

          <div className="stat-card">
            <h5><FaUserCog /> Present Today</h5>
            <h2>{stats.presentToday}</h2>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="action-grid">

          <button className="admin-btn" onClick={() => navigate("/employees")}>
            <FaUsers /> Employee Management
          </button>

          <button className="admin-btn" onClick={() => navigate("/admin-leaves")}>
            <FaClipboardList /> Leave Approvals
          </button>

          <button className="admin-btn" onClick={() => navigate("/admin-attendance")}>
            <FaCalendarCheck /> Attendance Report
          </button>

          <button className="admin-btn" onClick={() => navigate("/user-management")}>
            <FaUserCog /> User Management
          </button>

          <button className="admin-btn" onClick={handleExport}>
            <FaFileExcel /> Export Employees
          </button>

          <button className="admin-btn" onClick={handlePdfExport}>
            <FaFilePdf /> Export PDF Report
          </button>

          <button className="admin-btn" onClick={() => navigate("/admin-password-requests")}>
            <FaKey /> Password Reset Requests
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;