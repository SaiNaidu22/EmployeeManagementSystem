import { useEffect, useState } from "react";
import { getLeaves } from "../api/employeePortalApi";
import "../styles/LeaveHistory.css";

function LeaveHistory() {

  const [leaves, setLeaves] = useState([]);

  const employeeId =
    localStorage.getItem("employeeId") || 3;

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getLeaves(employeeId);
      setLeaves(res.data);
    } catch (error) {
      console.error("Failed to load leaves", error);
    }
  };

  return (
    <div className="leave-history-container">

      <div className="leave-history-card">

        <div className="leave-history-header">
          <h2>Leave History</h2>
        </div>

        <div className="leave-history-body">

          <table className="leave-table">

            <thead>
              <tr>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length > 0 ? (
                leaves.map((l, i) => (
                  <tr key={i}>
                    <td>{l.leaveType}</td>
                    <td>{l.fromDate}</td>
                    <td>{l.toDate}</td>

                    <td>
                      <span className={`status ${l.status}`}>
                        {l.status}
                      </span>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No leave records found
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default LeaveHistory;