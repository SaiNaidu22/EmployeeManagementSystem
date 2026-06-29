import { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/EmployeeProfile.css";

function EmployeeProfile() {

  const [employee, setEmployee] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const employeeId =
        localStorage.getItem(
          "employeeId"
        );

      const response =
  await api.get(
    `/Employee/profile/${employeeId}`
  );

      setEmployee(
        response.data
      );

    }
    catch (error) {

      console.error(
        "Failed to load profile",
        error
      );

    }
  };

  if (!employee)
{
  return (
    <div className="loading">
      Loading Profile...
    </div>
  );
}

 return (
  <div className="profile-container">

    <div className="profile-card">

      <div className="profile-header">

        <div className="avatar">
          {employee.name
            ?.charAt(0)
            ?.toUpperCase()}
        </div>

        <h2>
          {employee.name}
        </h2>

        <p>
          Employee Profile
        </p>

      </div>

      <div className="profile-body">

        <div className="profile-row">
          <span>
            Employee ID
          </span>

          <strong>
            {employee.id}
          </strong>
        </div>

        <div className="profile-row">
          <span>
            Name
          </span>

          <strong>
            {employee.name}
          </strong>
        </div>

        <div className="profile-row">
          <span>
            Email
          </span>

          <strong>
            {employee.email}
          </strong>
        </div>

        <div className="profile-row">
          <span>
            Department
          </span>

          <strong>
            {employee.department}
          </strong>
        </div>

      </div>

    </div>

  </div>
);
}

export default EmployeeProfile;