import React, { useEffect, useState } from "react";
import { api } from "../api";
import { getToken, getUser } from "../utils/auth";
import "../styles/dashboard.css";


export default function ManagerDashboard() {
  const token = getToken();
  const user = getUser();

  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user?.role !== "manager") {
      setMsg("Access Denied — Manager Only");
      return;
    }

    async function load() {
      try {
        const data = await api.allAttendance(token);
        setRecords(data.records);
      } catch (err) {
        setMsg(err.message);
      }
    }

    load();
  }, []);

  return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Manager Dashboard</h2>
    <p>Welcome, {user?.name}</p>

    {msg && <p style={{ color: "red", fontWeight: "600" }}>{msg}</p>}

    {!msg && (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{r.userId?.name}</td>
                <td>{r.userId?.employeeId}</td>
                <td>{r.date}</td>
                <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "--"}</td>
                <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "--"}</td>
                <td>{r.totalHours || 0}</td>

                <td>
                  <span
                    className={
                      "status-pill " +
                      (r.status === "absent"
                        ? "status-absent"
                        : r.status === "late"
                        ? "status-late"
                        : "status-present")
                    }
                  >
                    {r.status || "present"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);


//   return (
//     <div>
//       <h2>Manager Dashboard</h2>
//       <p>Welcome, {user?.name} (Manager)</p>

//       {msg && <p style={{ color: "red" }}>{msg}</p>}

//       {!msg && (
//         <table border="1" cellPadding="6" style={{ marginTop: 20 }}>
//           <thead>
//             <tr>
//               <th>Employee</th>
//               <th>Employee ID</th>
//               <th>Date</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Hours</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {records.map((r) => (
//               <tr key={r._id}>
//                 <td>{r.userId?.name}</td>
//                 <td>{r.userId?.employeeId}</td>
//                 <td>{r.date}</td>
//                 <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "--"}</td>
//                 <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "--"}</td>
//                 <td>{r.totalHours || "0"}</td>
//                 <td>{r.status || (r.checkInTime ? "Present" : "Absent")}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
}
