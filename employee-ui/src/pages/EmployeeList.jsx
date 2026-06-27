// import { useEffect, useState } from "react";
// import {
// getEmployees,
// deleteEmployee
// } from "../api/employeeApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import DashboardStats from "../components/DashboardStats";
// import {
//   addEmployee,
//   updateEmployee
// } from "../api/employeeApi";
// import {
//   exportEmployeesToExcel
// } from "../utils/exportExcel";
// import {
//   exportEmployeesToPdf
// } from "../utils/exportPdf";
// import DashboardChart from "../components/DashboardChart";
// import EmployeeChart
// from "../components/EmployeeChart";

// import "../styles/EmployeeList.css";

// function EmployeeList() {
// const [employees, setEmployees] = useState([]);
// const [loading, setLoading] = useState(true);
// const [search, setSearch] = useState("");
// const [sortOrder, setSortOrder] = useState("asc");
// const [showDeleteModal, setShowDeleteModal] =
//   useState(false);

// const [deleteId, setDeleteId] =
//   useState(null);
// const [showModal, setShowModal] = useState(false);
// const [editId, setEditId] = useState(null);

// const role =
//   localStorage.getItem("role");

// const [form, setForm] = useState({
//   name: "",
//   email: "",
//   department: ""
// });
// const [departmentFilter, setDepartmentFilter] =
//   useState("");

// const navigate = useNavigate();

// useEffect(() => {
// loadEmployees();
// }, []);

// const loadEmployees = async () => {
// try {
// const data = await getEmployees();

//   console.log("Employees:", data);

//   setEmployees(data || []);
// } catch (error) {
//   console.error(error);

//   if (error.response) {
//     console.log(
//       "Status:",
//       error.response.status
//     );

//     console.log(
//       "Data:",
//       error.response.data
//     );
//   }

// toast.error("Failed to load employees");
// } finally {
//   setLoading(false);
// }


// };

// const handleDelete = async () => {
//   try {
//     await deleteEmployee(deleteId);

//     toast.success(
//       "Employee deleted successfully"
//     );

//     setShowDeleteModal(false);

//     loadEmployees();
//   }
//   catch {
//     toast.error(
//       "Delete failed"
//     );
//   }
// };

// const logout = () => {
//   localStorage.removeItem("token");
//   navigate("/login", { replace: true });
// };
// const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value
//   });
// };
// const departments = [
//   ...new Set(
//     employees.map(
//       (e) => e.department
//     )
//   )
// ];
// const filteredEmployees =
// employees
// .filter((emp) => {

//   const matchSearch =
//     emp.name
//       ?.toLowerCase()
//       .includes(
//         search.toLowerCase()
//       );

//   const matchDepartment =
//     departmentFilter === ""
//       ? true
//       : emp.department ===
//         departmentFilter;

//   return (
//     matchSearch &&
//     matchDepartment
//   );
// })
// .sort((a, b) => {
//   if (sortOrder === "asc") {
//     return a.name.localeCompare(
//       b.name
//     );
//   }

//   return b.name.localeCompare(
//     a.name
//   );
// });

// const handleSave = async () => {
//   try {
//     if (editId) {
//       await updateEmployee(editId, form);
//       toast.success("Employee updated");
//     } else {
//       await createEmployee(form);
//       toast.success("Employee added");
//     }

//     setShowModal(false);
//     loadEmployees();
//   } catch {
//     toast.error("Operation failed");
//   }
// };
// if (loading) {
//   return (
//     <div className="container mt-4">
//       <h2 className="text-light mb-4">Loading Employees...</h2>

//       <div className="skeleton" style={{ height: "40px", marginBottom: "10px" }} />
//       <div className="skeleton" style={{ height: "40px", marginBottom: "10px" }} />
//       <div className="skeleton" style={{ height: "40px", marginBottom: "10px" }} />
//       <div className="skeleton" style={{ height: "40px" }} />
//     </div>
//   );
  
// }

// return (
//   <div className="employee-page">

//     <div className="d-flex justify-content-between align-items-center mb-3">
//   <h2>Employee Management System</h2>

//       <div>
//        {role === "Admin" && (
//   <button
//     className="btn btn-success"
//     onClick={() => {
//       setForm({
//         name: "",
//         email: "",
//         department: ""
//       });

//       setEditId(null);
//       setShowModal(true);
//     }}
//   >
//     Add Employee
//   </button>
  
// )}
// <button
//   className="btn btn-warning"
//   onClick={() =>
//     navigate("/admin-leaves")
//   }
// >
//   Leave Approval
// </button>

// <button
//   className="btn btn-info"
//   onClick={() =>
//     navigate(
//       "/admin-attendance"
//     )
//   }
// >
//   Attendance Report
// </button>
// <button
//   className="btn btn-dark"
//   onClick={() =>
//     navigate("/users")
//   }
// >
//   User Management
// </button>
// <button
//   className="btn btn-info me-2"
//   onClick={() =>
//     exportEmployeesToExcel(employees)
//   }
// >
//   Export Excel
// </button>
// <button
//   className="btn btn-danger me-2"
//   onClick={() =>
//     exportEmployeesToPdf(
//       employees
//     )
//   }
// >
//   Export PDF
// </button>
//         <button
//           className="btn btn-outline-light"
//           onClick={logout}
//         >
//           Logout
//         </button>
//       </div>
//     </div>

//     <div className="row mb-3">
//       <div className="col-md-4">
//         <input
//           className="form-control"
//           type="text"
//           placeholder="Search Employee"
//           value={search}
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />
//       </div>

//       <div className="col-md-2">
//         <button
//           className="btn btn-primary"
//           onClick={() =>
//             setSortOrder(
//               sortOrder === "asc"
//                 ? "desc"
//                 : "asc"
//             )
//           }
//         >
//           Sort {sortOrder}
//         </button>
//       </div>
//     </div>
//     <select
//   className="form-select"
//   value={departmentFilter}
//   onChange={(e) =>
//     setDepartmentFilter(
//       e.target.value
//     )
//   }
// >
//   <option value="">
//     All Departments
//   </option>

//   {departments.map((dept) => (
//     <option
//       key={dept}
//       value={dept}
//     >
//       {dept}
//     </option>
//   ))}
// </select>
//      <div className="row mb-4">

//   <div className="col-md-4">
//     <div className="card text-center">
//       <div className="card-body">
//         <h5>Total Employees</h5>
//         <h2>{employees.length}</h2>
//       </div>
//     </div>
//   </div>

//   <div className="col-md-4">
//     <div className="card text-center">
//       <div className="card-body">
//         <h5>Departments</h5>
//         <h2>
//           {
//             [...new Set(
//               employees.map(
//                 e => e.department
//               )
//             )].length
//           }
//         </h2>
//       </div>
//     </div>
//   </div>

//   <div className="col-md-4">
//     <div className="card text-center">
//       <div className="card-body">
//         <h5>Logged In</h5>
//         <h2>Admin</h2>
//       </div>
//     </div>
//   </div>

// </div>
// <DashboardStats
//   employees={employees}
// />


// <EmployeeChart
//   employees={employees}
// />
// <DashboardChart
//       employees={employees}
//     />
//     <table className="table table-bordered table-striped">
//       <thead className="table-dark">
//         <tr>
//           <th>Id</th>
//           <th>Name</th>
//           <th>Email</th>
//           <th>Department</th>
//           <th>Actions</th>
//         </tr>
//       </thead>

//       <tbody>
//   {filteredEmployees.length === 0 ? (
//     <tr>
//       <td colSpan="5" className="text-center">
//         No employees found
//       </td>
//     </tr>
//   ) : (
//     filteredEmployees.map((emp) => (
//       <tr key={emp.id}>
//         <td>{emp.id}</td>
//         <td>{emp.name}</td>
//         <td>{emp.email}</td>
//         <td>{emp.department}</td>

//         <td>
//           <td>
//   {role === "Admin" && (
//     <>
//       <button
//         className="btn btn-warning btn-sm"
//         onClick={() => {
//           setForm(emp);
//           setEditId(emp.id);
//           setShowModal(true);
//         }}
//       >
//         Edit
//       </button>

//       <button
//         className="btn btn-danger btn-sm"
//         onClick={() => {
//   setDeleteId(emp.id);
//   setShowDeleteModal(true);
// }}
//         style={{
//           marginLeft: "8px"
//         }}
//       >
//         Delete
//       </button>
//     </>
//   )}
// </td>
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>
//       {filteredEmployees.length === 0 && (
//   <tr>
//     <td colSpan="5" className="text-center">
//       No employees found
//     </td>
//   </tr>
// )}
//     </table>
//     {showModal && (
//   <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
//     <div className="modal-dialog">
//       <div className="modal-content bg-dark text-white">

//         <div className="modal-header">
//           <h5>
//             {editId ? "Edit Employee" : "Add Employee"}
//           </h5>
//           <button
//             className="btn-close btn-close-white"
//             onClick={() => setShowModal(false)}
//           />
//         </div>

//         <div className="modal-body">

//           <input
//             name="name"
//             className="form-control mb-2"
//             placeholder="Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             name="email"
//             className="form-control mb-2"
//             placeholder="Email"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <input
//             name="department"
//             className="form-control mb-2"
//             placeholder="Department"
//             value={form.department}
//             onChange={handleChange}
//           />

//         </div>

//         <div className="modal-footer">
//           <button
//             className="btn btn-secondary"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </button>

//           <button
//             className="btn btn-primary"
//             onClick={handleSave}
//           >
//             Save
//           </button>
//         </div>

//       </div>
//     </div>
//   </div>
// )}
// {
// showDeleteModal && (
//   <div
//     className="modal d-block"
//     style={{
//       background:
//         "rgba(0,0,0,0.6)"
//     }}
//   >
//     <div className="modal-dialog">
//       <div className="modal-content bg-dark text-white">

//         <div className="modal-header">
//           <h5>
//             Confirm Delete
//           </h5>

//           <button
//             className="btn-close btn-close-white"
//             onClick={() =>
//               setShowDeleteModal(false)
//             }
//           />
//         </div>

//         <div className="modal-body">
//           Are you sure you want to
//           delete this employee?
//         </div>

//         <div className="modal-footer">

//           <button
//             className="btn btn-secondary"
//             onClick={() =>
//               setShowDeleteModal(false)
//             }
//           >
//             Cancel
//           </button>

//           <button
//             className="btn btn-danger"
//             onClick={handleDelete}
//           >
//             Delete
//           </button>

      

//         </div>

//       </div>
//     </div>
//   </div>
// )
// }
//   </div>
// );
// }

// export default EmployeeList;


import { useEffect, useState } from "react";
import {
  getEmployees,
  deleteEmployee,
  addEmployee,
  updateEmployee
} from "../api/employeeApi";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import DashboardStats from "../components/DashboardStats";
import DashboardChart from "../components/DashboardChart";
import EmployeeChart from "../components/EmployeeChart";

import {
  exportEmployeesToExcel
} from "../utils/exportExcel";

import {
  exportEmployeesToPdf
} from "../utils/exportPdf";

import "../styles/EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data || []);
    } catch (err) {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      toast.success("Employee deleted");
      setShowDeleteModal(false);
      loadEmployees();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      if (editId) {
        await updateEmployee(editId, form);
        toast.success("Employee updated");
      } else {
        await addEmployee(form);
        toast.success("Employee added");
      }

      setShowModal(false);
      loadEmployees();
    } catch {
      toast.error("Operation failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const departments = [...new Set(employees.map(e => e.department))];

  const filteredEmployees = employees
    .filter(emp => {
      const matchSearch = emp.name?.toLowerCase().includes(search.toLowerCase());
      const matchDept = departmentFilter ? emp.department === departmentFilter : true;
      return matchSearch && matchDept;
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

  if (loading) {
    return (
      <div className="employee-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="employee-page">
      <div className="employee-container">

        {/* HEADER */}
        <div className="employee-header">
          <div>
            <h2 className="employee-title">Employee Management</h2>
            <p className="employee-subtitle">Manage employees efficiently</p>
          </div>

          <div className="employee-actions">

            {role === "Admin" && (
              <button
                className="admin-btn"
                onClick={() => {
                  setForm({ name: "", email: "", department: "" });
                  setEditId(null);
                  setShowModal(true);
                }}
              >
                ➕ Add
              </button>
            )}

            <button className="admin-btn" onClick={() => navigate("/admin-leaves")}>
              📄 Leaves
            </button>

            <button className="admin-btn" onClick={() => navigate("/admin-attendance")}>
              🕒 Attendance
            </button>

            <button className="admin-btn" onClick={() => navigate("/users")}>
              👤 Users
            </button>

            <button className="admin-btn" onClick={() => exportEmployeesToExcel(employees)}>
              📊 Excel
            </button>

            <button className="admin-btn" onClick={() => exportEmployeesToPdf(employees)}>
              📄 PDF
            </button>

            <button className="admin-btn danger" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filter-row">
          <input
            className="filter-input"
            placeholder="Search employee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="admin-btn small"
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
            }
          >
            ⇅ Sort
          </button>

          <select
            className="filter-select"
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <h5>Total Employees</h5>
            <h2>{employees.length}</h2>
          </div>

          <div className="stat-card">
            <h5>Departments</h5>
            <h2>{departments.length}</h2>
          </div>

          <div className="stat-card">
            <h5>Status</h5>
            <h2>Active</h2>
          </div>
        </div>

        <DashboardStats employees={employees} />
        <EmployeeChart employees={employees} />
        <DashboardChart employees={employees} />

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>

                    <td>
                      <div className="table-actions">
                        {role === "Admin" && (
                          <>
                            <button
                              className="btn-sm btn-warning"
                              onClick={() => {
                                setForm(emp);
                                setEditId(emp.id);
                                setShowModal(true);
                              }}
                            >
                              ✏ Edit
                            </button>

                            <button
                              className="btn-sm btn-danger"
                              onClick={() => {
                                setDeleteId(emp.id);
                                setShowDeleteModal(true);
                              }}
                            >
                              🗑 Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODALS */}
        {showModal && (
          <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-white">

                <div className="modal-header">
                  <h5>{editId ? "Edit Employee" : "Add Employee"}</h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
                </div>

                <div className="modal-body">
                  <input name="name" className="form-control mb-2" placeholder="Name" value={form.name} onChange={handleChange} />
                  <input name="email" className="form-control mb-2" placeholder="Email" value={form.email} onChange={handleChange} />
                  <input name="department" className="form-control mb-2" placeholder="Department" value={form.department} onChange={handleChange} />
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>

              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="modal d-block" style={{ background: "rgba(0,0,0,0.6)" }}>
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-white">

                <div className="modal-header">
                  <h5>Confirm Delete</h5>
                  <button className="btn-close btn-close-white" onClick={() => setShowDeleteModal(false)} />
                </div>

                <div className="modal-body">
                  Delete this employee?
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default EmployeeList;