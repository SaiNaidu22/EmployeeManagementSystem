import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import EmployeeDashboard
from "./pages/EmployeeDashboard";

import EmployeeProfile
from "./pages/EmployeeProfile";

import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";

import EditProfile from "./pages/EditProfile";

import AdminLeaveApproval
from "./pages/AdminLeaveApproval";

import UserManagement
from "./pages/UserManagement";

import Attendance
from "./pages/Attendance";

import AdminAttendance
from "./pages/AdminAttendance";


import ChangePassword
from "./pages/ChangePassword";
import AdminDashboard
from "./pages/AdminDashboard";

import ForgotPassword
from "./pages/ForgotPassword";

import AdminPasswordRequests
from "./pages/AdminPasswordRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected App */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/employees" />} />
        <Route
  path="/employee-dashboard"
  element={
    <ProtectedRoute>
      <EmployeeDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile"
  element={<EmployeeProfile />}
/>

<Route path="/apply-leave" element={<ApplyLeave />} />

<Route path="/leave-history" element={<LeaveHistory />} />

<Route path="/attendance" element={<Attendance />} />

<Route path="/edit-profile" element={<EditProfile />} />
<Route
  path="/admin-leaves"
  element={
    <ProtectedRoute>
      <AdminLeaveApproval />
    </ProtectedRoute>
  }
/>

<Route
  path="/users"
  element={
    <ProtectedRoute>
      <UserManagement />
    </ProtectedRoute>
  }
/>
<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <Attendance />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-attendance"
  element={
    <ProtectedRoute>
      <AdminAttendance />
    </ProtectedRoute>
  }
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/admin-password-requests"
  element={
    <AdminPasswordRequests />
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;