import { useEffect, useState } from "react";


import {
  getUsers,
  createUser,
  deleteUser,
  resetPassword
}
from "../api/employeeApi";

function UserManagement() {

  const [users, setUsers] =
    useState([]);

  const [form, setForm] =
    useState({
      username: "",
      password: "",
      role: "Employee",
      employeeId: ""
    });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {

      const data =
        await getUsers();

      setUsers(data);
    };

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

     try {

  await createUser({
    ...form,
    employeeId: parseInt(
      form.employeeId
    )
  });

  alert("User Created");

  loadUsers();

} catch(error) {

  console.log(error);

  alert(
    error.response?.data ||
    error.message
  );
}

      setForm({
        username: "",
        password: "",
        role: "Employee",
        employeeId: ""
      });

      loadUsers();
    };

  const handleDelete =
    async (id) => {

      await deleteUser(id);

      loadUsers();
    };

    const handleResetPassword =
  async (id) => {

    await resetPassword(id);

    alert(
      "Password reset to Welcome123"
    );
  };

  return (
    <div className="container mt-4">

      <h2>User Management</h2>

      <form
        onSubmit={handleSubmit}
        className="card p-3 mt-3"
      >

        <input
          className="form-control mb-2"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <select
          className="form-control mb-2"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option>
            Employee
          </option>

          <option>
            Admin
          </option>
        </select>

        <input
          className="form-control mb-2"
          placeholder="Employee Id"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
        >
          Create User
        </button>

      </form>

      <table
        className="table table-bordered mt-4"
      >

        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Role</th>
            <th>EmployeeId</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {users.map(
            (user) => (

              <tr key={user.id}>

                <td>
                  {user.id}
                </td>

                <td>
                  {user.username}
                </td>

                <td>
                  {user.role}
                </td>

                <td>
                  {user.employeeId}
                </td>

               <td>

  <button
    className="btn btn-warning btn-sm me-2"
    onClick={() =>
      handleResetPassword(
        user.id
      )
    }
  >
    Reset Password
  </button>

  <button
    className="btn btn-danger btn-sm"
    onClick={() =>
      handleDelete(
        user.id
      )
    }
  >
    Delete
  </button>

</td>
              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default UserManagement;