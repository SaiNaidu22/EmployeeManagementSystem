import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile
} from "../api/employeePortalApi";

import { toast } from "react-toastify";

import "../styles/EditProfile.css";

function EditProfile() {

  const employeeId =
    localStorage.getItem("employeeId") || 3;

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res =
        await getProfile(employeeId);

      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const update = async () => {
    try {
      await updateProfile(
        employeeId,
        form
      );

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
  <div className="edit-profile-container">

    <div className="edit-profile-card">

      <div className="edit-profile-header">

        <h2>
          Edit Profile
        </h2>

        <p>
          Update your personal information
        </p>

      </div>

      <div className="edit-profile-body">

        <label>
          Full Name
        </label>

        <input
          name="name"
          className="profile-input"
          value={form.name}
          onChange={handleChange}
        />

        <label>
          Email Address
        </label>

        <input
          name="email"
          className="profile-input"
          value={form.email}
          onChange={handleChange}
        />

        <label>
          Department
        </label>

        <input
          name="department"
          className="profile-input"
          value={form.department}
          onChange={handleChange}
        />

        <button
          className="update-btn"
          onClick={update}
        >
          Update Profile
        </button>

      </div>

    </div>

  </div>
);
}

export default EditProfile;