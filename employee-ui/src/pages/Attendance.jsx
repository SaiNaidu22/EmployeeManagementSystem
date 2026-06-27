import { useEffect, useState } from "react";
import { markAttendance, getAttendance } from "../api/employeeApi";
import "../styles/Attendance.css";

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  const loadAttendance = async () => {
    const data = await getAttendance();
    setAttendance(data);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const handleMark = async () => {
    try {
      await markAttendance();
      alert("Attendance Marked Successfully");
      loadAttendance();
    } catch {
      alert("Already Marked Today");
    }
  };

  // SUMMARY CALCULATION
  const total = attendance.length;
  const present = attendance.filter(a => a.status === "PRESENT").length;
  const absent = attendance.filter(a => a.status === "ABSENT").length;

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="attendance-container">

      <div className="attendance-card">

        <div className="attendance-header">
          <h2>Attendance Dashboard</h2>
        </div>

        <div className="attendance-body">

          {/* SUMMARY */}
          <div className="att-summary">

            <div className="summary-box">
              <h3>Total Days</h3>
              <p className="total">{total}</p>
            </div>

            <div className="summary-box">
              <h3>Present</h3>
              <p className="present">{present}</p>
            </div>

            <div className="summary-box">
              <h3>Absent</h3>
              <p className="absent">{absent}</p>
            </div>

          </div>

          {/* BUTTON */}
          <button
            className="attendance-btn"
            onClick={handleMark}
          >
            Mark Attendance
          </button>

          {/* TABLE */}
          <table className="attendance-table">

            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Check In</th>
              </tr>
            </thead>

            <tbody>

              {attendance.length > 0 ? (
                attendance.map((a) => (
                  <tr
                    key={a.id}
                    className={a.date === today ? "today-row" : ""}
                  >
                    <td>{a.date}</td>

                    <td>
                      <span className={`att-status ${a.status}`}>
                        {a.status}
                      </span>
                    </td>

                    <td>{a.checkInTime || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No attendance records found</td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Attendance;