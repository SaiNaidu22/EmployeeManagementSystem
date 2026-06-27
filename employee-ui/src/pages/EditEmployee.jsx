import { useEffect, useState } from "react";

import {
  getEmployeeById,
  updateEmployee
} from "../api/employeeApi";

import {
  useParams,
  useNavigate
} from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const [employee, setEmployee] =
    useState({
      name: "",
      email: "",
      department: ""
    });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee =
    async () => {
      try {
        const data =
          await getEmployeeById(id);

        setEmployee(data);
      }
      catch (error) {
        console.error(error);
      }
    };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateEmployee(
          id,
          employee
        );

        alert(
          "Employee Updated"
        );

        navigate(
          "/employees"
        );
      }
      catch (error) {
        console.error(error);
      }
    };

  return (
    <div>
      <h2>Edit Employee</h2>

      <form
        onSubmit={
          handleSubmit
        }
      >
        <input
          name="name"
          value={employee.name}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="email"
          value={employee.email}
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <input
          name="department"
          value={
            employee.department
          }
          onChange={
            handleChange
          }
        />

        <br />
        <br />

        <button
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;