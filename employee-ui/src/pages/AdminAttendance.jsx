import { useEffect, useState } from "react";
import { getAllAttendance } from "../api/employeeApi";

import "../styles/AdminAttendance.css"

function AdminAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);
      const data = await getAllAttendance();
      setAttendance(data || []);
    } catch (error) {
      console.error("Failed to load attendance", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="attendance-page">
        <h2 className="page-title">Employee Attendance</h2>
        <p>Loading records...</p>
      </div>
    );
  }

  return (
    <div className="attendance-page">

      <h2 className="page-title">
        Employee Attendance
      </h2>

      <div className="table-card">

        <table className="attendance-table">

          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
            </tr>
          </thead>

          <tbody>

            {attendance.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No attendance records found
                </td>
              </tr>
            ) : (
              attendance.map((a) => (
                <tr key={a.id}>

                  <td>
                    {a.employee?.name || "N/A"}
                  </td>

                  <td>
                    {a.date}
                  </td>

                  <td>
                    <span className={`status ${a.status}`}>
                      {a.status}
                    </span>
                  </td>

                  <td>
                    {a.checkInTime || "--"}
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

export default AdminAttendance;