import { useState } from "react";
import { applyLeave } from "../api/employeePortalApi";
import { toast } from "react-toastify";
import "../styles/ApplyLeave.css";

function ApplyLeave() {

  const [form, setForm] = useState({
    employeeId: localStorage.getItem("employeeId") || 3,
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async () => {
    try {
      await applyLeave(form);
      toast.success("Leave applied successfully");
    } catch (error) {
      toast.error("Failed to apply leave");
    }
  };

  return (
    <div className="apply-leave-container">

      <div className="apply-leave-card">

        <div className="apply-leave-header">
          <h2>Apply Leave</h2>
        </div>

        <div className="apply-leave-body">

          <input
            name="leaveType"
            placeholder="Leave Type"
            className="leave-input"
            onChange={handleChange}
          />

          <input
            type="date"
            name="fromDate"
            className="leave-input"
            onChange={handleChange}
          />

          <input
            type="date"
            name="toDate"
            className="leave-input"
            onChange={handleChange}
          />

          <textarea
            name="reason"
            placeholder="Reason"
            className="leave-textarea"
            onChange={handleChange}
          />

          <button
            className="leave-btn"
            onClick={submit}
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
}

export default ApplyLeave;