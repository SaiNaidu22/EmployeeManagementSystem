import { useState } from "react";
import { addEmployee } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";

function AddEmployee() {
  const navigate = useNavigate();

  const [employee, setEmployee] =
    useState({
      name: "",
      email: "",
      department: ""
    });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEmployee(employee);

      alert("Employee Added");

      navigate("/employees");
    } catch {
      alert("Failed");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br />

        <input
          name="department"
          placeholder="Department"
          onChange={handleChange}
        />

        <br />

        <button type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;