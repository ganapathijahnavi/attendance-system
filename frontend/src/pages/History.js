import React, { useEffect, useState } from "react";
import { api } from "../api";
import { getToken } from "../utils/auth";

export default function History() {
  const token = getToken();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.myHistory(token).then((r) => setRecords(r.records));
  }, []);

  return (
    <div>
      <h2>My Attendance History</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Date</th>
            <th>In</th>
            <th>Out</th>
            <th>Hours</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.date}</td>
              <td>{r.checkInTime ? new Date(r.checkInTime).toLocaleTimeString() : "--"}</td>
              <td>{r.checkOutTime ? new Date(r.checkOutTime).toLocaleTimeString() : "--"}</td>
              <td>{r.totalHours || 0}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
