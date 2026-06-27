import { useState }
from "react";

import {
  requestPasswordReset
}
from "../api/employeeApi";

function ForgotPassword() {

  const [employeeId,
    setEmployeeId]
      = useState("");

  const submit =
    async () => {

      await requestPasswordReset(
        employeeId
      );

      alert(
        "Request submitted"
      );
    };

  return (
    <div
      className="container mt-4"
    >

      <h2>
        Forgot Password
      </h2>

      <input
        type="number"
        className=
          "form-control"
        placeholder=
          "Employee Id"
        value=
          {employeeId}
        onChange={(e)=>
          setEmployeeId(
            e.target.value
          )
        }
      />

      <button
        className=
          "btn btn-primary mt-3"
        onClick=
          {submit}
      >
        Request Reset
      </button>

    </div>
  );
}

export default
  ForgotPassword;