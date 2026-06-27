import { useEffect, useState } from "react";
import {
  getResetRequests,
  approveReset
} from "../api/employeeApi";

import "../styles/AdminPasswordRequests.css"

function AdminPasswordRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await getResetRequests();
      setRequests(data || []);
    } catch (error) {
      console.error("Failed to load requests", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await approveReset(id);
    alert("Password reset approved");
    loadRequests();
  };

  if (loading) {
    return (
      <div className="request-page">
        <h2 className="page-title">Password Reset Requests</h2>
        <p>Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="request-page">

      <h2 className="page-title">
        Password Reset Requests
      </h2>

      <div className="table-card">

        <table className="request-table">

          <thead>
            <tr>
              <th>Id</th>
              <th>Employee Id</th>
              <th>Status</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((request) => (
                <tr key={request.id}>

                  <td>{request.id}</td>

                  <td>{request.employeeId}</td>

                  <td>
                    <span className={`status ${request.status}`}>
                      {request.status}
                    </span>
                  </td>

                  <td>
                    {request.requestedAt}
                  </td>

                  <td>

                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(request.id)}
                      disabled={request.status === "Approved"}
                    >
                      Approve
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

export default AdminPasswordRequests;