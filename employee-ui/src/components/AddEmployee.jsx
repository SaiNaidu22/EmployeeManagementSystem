import { useEffect, useState } from "react";

import {
  createEmployee,
  updateEmployee
} from "../api/employeeApi";

function AddEmployee({
  onEmployeeAdded,
  selectedEmployee,
  clearSelection
}) {

  const [employee, setEmployee] =
    useState({
      name: "",
      email: "",
      department: ""
    });

  useEffect(() => {

    if (selectedEmployee) {

      setEmployee({
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        department:
          selectedEmployee.department
      });

    }

  }, [selectedEmployee]);

  const handleChange = (e) => {

    setEmployee({
      ...employee,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (selectedEmployee) {

      await updateEmployee(
        selectedEmployee.id,
        employee
      );

      clearSelection();

    } else {

      await createEmployee(employee);

    }

    setEmployee({
      name: "",
      email: "",
      department: ""
    });

    onEmployeeAdded();
  };

  return (
    <form onSubmit={handleSubmit}>

      <h2>
        {selectedEmployee
          ? "Edit Employee"
          : "Add Employee"}
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
      />

      <br /><br />

      <button type="submit">
        {selectedEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

    </form>
  );
}

export default AddEmployee;