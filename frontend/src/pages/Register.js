import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    employeeId: "",
    department: "",
  });

  async function submit(e) {
    e.preventDefault();
    try {
      await api.register(data);
      nav("/login");
    } catch (err) {
      alert(err.message || "Error");
    }
  }

  return (
    <div style={{ maxWidth: 550, margin: "40px auto" }}>
      <h2>Register</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <input
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <input
          placeholder="Employee ID"
          value={data.employeeId}
          onChange={(e) => setData({ ...data, employeeId: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <input
          placeholder="Department"
          value={data.department}
          onChange={(e) => setData({ ...data, department: e.target.value })}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />

        <select
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>

        <button style={{ padding: 10 }}>Register</button>
      </form>
    </div>
  );
}
