import React, { useEffect, useState } from "react";
import { api } from "../api";
import { getToken, getUser } from "../utils/auth";
import "../styles/dashboard.css";


export default function EmployeeDashboard() {
  const token = getToken();
  const user = getUser();

  const [summary, setSummary] = useState(null);
  const [msg, setMsg] = useState("");

  async function loadSummary() {
    try {
      console.log("LOADING SUMMARY...");
      const data = await api.mySummary(token);
      console.log("SUMMARY RESPONSE:", data);
      setSummary(data.summary);
    } catch (err) {
      console.log("SUMMARY ERROR:", err);
      setMsg("Error loading summary");
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  async function checkIn() {
    console.log("CHECK-IN CLICKED");

    try {
      const r = await api.checkin(token);
      console.log("CHECK-IN RESPONSE:", r);

      setMsg("Checked in successfully!");
      loadSummary();
    } catch (err) {
      console.log("CHECK-IN ERROR:", err);
      setMsg(err.message || "Check-in failed");
    }
  }

  async function checkOut() {
    console.log("CHECK-OUT CLICKED");

    try {
      const r = await api.checkout(token);
      console.log("CHECK-OUT RESPONSE:", r);

      setMsg("Checked out successfully!");
      loadSummary();
    } catch (err) {
      console.log("CHECK-OUT ERROR:", err);
      setMsg(err.message || "Check-out failed");
    }
  }
  return (
  <div className="dashboard-container">
    <h2 className="dashboard-title">Welcome, {user?.name}</h2>

    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      <button className="btn" onClick={checkIn}>Check In</button>
      <button className="btn btn-checkout" onClick={checkOut}>Check Out</button>
    </div>

    <p style={{ color: "green", fontWeight: "600" }}>{msg}</p>

    {summary && (
      <div className="cards-row">
        <div className="card">
          <div className="card-title">Present Days</div>
          <div className="card-value">{summary.present}</div>
        </div>

        <div className="card">
          <div className="card-title">Absent Days</div>
          <div className="card-value">{summary.absent}</div>
        </div>

        <div className="card">
          <div className="card-title">Late</div>
          <div className="card-value">{summary.late}</div>
        </div>

        <div className="card">
          <div className="card-title">Total Hours</div>
          <div className="card-value">{summary.totalHours}</div>
        </div>
      </div>
    )}
  </div>
);
}


//   return (
//     <div>
//       <h2>Welcome, {user?.name}</h2>

//       <button onClick={checkIn} style={{ marginRight: 10 }}>
//         Check In
//       </button>
//       <button onClick={checkOut}>Check Out</button>

//       <p style={{ marginTop: 10, color: "green" }}>{msg}</p>

//       <h3 style={{ marginTop: 30 }}>Monthly Summary</h3>

//       {summary ? (
//         <ul>
//           <li>Present: {summary.present}</li>
//           <li>Absent: {summary.absent}</li>
//           <li>Late: {summary.late}</li>
//           <li>Total Hours: {summary.totalHours}</li>
//         </ul>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { api } from "../api";
// import { getToken, getUser } from "../utils/auth";

// export default function EmployeeDashboard() {
//   const token = getToken();
//   const user = getUser();

//   const [summary, setSummary] = useState(null);
//   const [msg, setMsg] = useState("");

//   async function load() {
//     try {
//       const data = await api.mySummary(token);
//       setSummary(data.summary);
//     } catch(err) {
//   setMsg(err.message || "Error");
// }

//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function checkIn() {
//     await api.checkin(token);
//     setMsg("Checked in!");
//     load();
//   }

//   async function checkOut() {
//     await api.checkout(token);
//     setMsg("Checked out!");
//     load();
//   }

//   return (
//     <div>
//       <h2>Welcome, {user.name}</h2>

//       <button onClick={checkIn} style={{ marginRight: 10 }}>
//         Check In
//       </button>
//       <button onClick={checkOut}>Check Out</button>

//       {msg && <p style={{ color: "green" }}>{msg}</p>}

//       <h3 style={{ marginTop: 20 }}>Monthly Summary</h3>
//       {summary && (
//         <ul>
//           <li>Present: {summary.present}</li>
//           <li>Absent: {summary.absent}</li>
//           <li>Late: {summary.late}</li>
//           <li>Total Hours: {summary.totalHours}</li>
//         </ul>
//       )}
//     </div>
//   );
// }
