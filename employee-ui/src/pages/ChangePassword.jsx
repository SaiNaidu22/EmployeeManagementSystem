import { useState } from "react";
import { changePassword } from "../api/employeeApi";
import "../styles/ChangePassword.css";

function ChangePassword() {

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await changePassword(form);
      alert("Password changed successfully");

      setForm({
        currentPassword: "",
        newPassword: ""
      });

    } catch (error) {
      alert("Current password incorrect");
    }
  };

  return (
    <div className="change-password-container">

      <div className="change-password-card">

        <div className="change-password-header">
          <h2>Change Password</h2>
        </div>

        <div className="change-password-body">

          <form onSubmit={handleSubmit}>

            <label className="cp-label">
              Current Password
            </label>

            <input
              type="password"
              name="currentPassword"
              className="cp-input"
              value={form.currentPassword}
              onChange={handleChange}
            />

            <label className="cp-label">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              className="cp-input"
              value={form.newPassword}
              onChange={handleChange}
            />

            <button className="cp-btn">
              Change Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ChangePassword;