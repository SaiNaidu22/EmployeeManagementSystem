import { useEffect, useState } from "react";
import {
  getAllLeaves,
  approveLeave,
  rejectLeave
} from "../api/employeeApi";

import "../styles/AdminLeaveApproval.css"

function AdminLeaveApproval() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      setLoading(true);
      const data = await getAllLeaves();
      setLeaves(data || []);
    } catch (error) {
      console.error("Failed to load leaves", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await approveLeave(id);
    loadLeaves();
  };

  const handleReject = async (id) => {
    await rejectLeave(id);
    loadLeaves();
  };

  if (loading) {
    return (
      <div className="leave-page">
        <h2 className="page-title">Leave Approval</h2>
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="leave-page">

      <h2 className="page-title">
        Leave Approval
      </h2>

      <div className="table-card">

        <table className="leave-table">

          <thead>
            <tr>
              <th>Id</th>
              <th>Employee</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {leaves.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No leave requests found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => (
                <tr key={leave.id}>

                  <td>{leave.id}</td>

                  <td>{leave.employeeId}</td>

                  <td>{leave.reason}</td>

                  <td>
                    <span className={`status ${leave.status}`}>
                      {leave.status}
                    </span>
                  </td>

                  <td style={{ display: "flex", gap: "8px" }}>

                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(leave.id)}
                      disabled={leave.status === "Approved"}
                    >
                      Approve
                    </button>

                    <button
                      className="btn-reject"
                      onClick={() => handleReject(leave.id)}
                      disabled={leave.status === "Rejected"}
                    >
                      Reject
                    </button>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminLeaveApproval;