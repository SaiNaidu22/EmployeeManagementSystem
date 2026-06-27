import { Outlet, NavLink, useNavigate } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    textDecoration: "none",
    color: isActive ? "black" : "white",
    background: isActive ? "#00d4ff" : "#1f2937",
    fontWeight: isActive ? "bold" : "normal"
  });

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>

      {/* Sidebar */}
      <div style={{ width: "220px", background: "#0b1220", padding: "20px" }}>
        <h4 className="text-white mb-4">EMS Panel</h4>

        <NavLink to="/employees" style={linkStyle}>
          Employees
        </NavLink>

        <NavLink to="/add-employee" style={linkStyle}>
          Add Employee
        </NavLink>

        <button
          className="btn btn-danger w-100 mt-4"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ background: "#0f172a" }}>
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;