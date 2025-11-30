const API = process.env.REACT_APP_API_URL;

async function req(path, method = "GET", body = null, token = null) {
  console.log("REQUEST TO:", API + path); // debug log

  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = "Bearer " + token;

  let res, data;

  try {
    res = await fetch(API + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });
  } catch (err) {
    console.error("FETCH ERROR:", err);
    throw new Error("Network Error — Backend not reachable");
  }

  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const msg = data.message || "Request failed";
    throw new Error(msg);
  }

  return data;
}

export const api = {
  login: (email, password) => req("/api/auth/login", "POST", { email, password }),
  register: (data) => req("/api/auth/register", "POST", data),

  checkin: (t) => req("/api/attendance/checkin", "POST", null, t),
  checkout: (t) => req("/api/attendance/checkout", "POST", null, t),

  myHistory: (t) => req("/api/attendance/my-history", "GET", null, t),
  mySummary: (t) => req("/api/attendance/my-summary", "GET", null, t),

  allAttendance: (t) => req("/api/attendance/all", "GET", null, t),
  todayStatus: (t) => req("/api/attendance/today-status", "GET", null, t),
};




// const API = process.env.REACT_APP_API_URL;

// // async function req(path, method = "GET", body = null, token = null) {
// //   const headers = { "Content-Type": "application/json" };
// //   if (token) headers["Authorization"] = "Bearer " + token;

// //   const res = await fetch(API + path, {
// //     method,
// //     headers,
// //     body: body ? JSON.stringify(body) : null,
// //   });

// //   const data = await res.json().catch(() => ({}));

// //   if (!res.ok) throw data;
// //   return data;
// // }

// async function req(path, method = "GET", body = null, token = null) {
//   const headers = { "Content-Type": "application/json" };
//   if (token) headers["Authorization"] = "Bearer " + token;

//   const res = await fetch(API + path, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : null,
//   });

//   let data = {};

//   try {
//     data = await res.json();
//   } catch {}

//   if (!res.ok) {
//     const msg =
//       data.message || data.error || data.msg || "Something went wrong";
//     throw new Error(msg);
//   }

//   return data;
// }

// export const api = {
//   login: (email, password) => req("/api/auth/login", "POST", { email, password }),
//   register: (data) => req("/api/auth/register", "POST", data),

//   checkin: (t) => req("/api/attendance/checkin", "POST", null, t),
//   checkout: (t) => req("/api/attendance/checkout", "POST", null, t),
//   myHistory: (t) => req("/api/attendance/my-history", "GET", null, t),
//   mySummary: (t) => req("/api/attendance/my-summary", "GET", null, t),

//   allAttendance: (t) => req("/api/attendance/all", "GET", null, t),
//   todayStatus: (t) => req("/api/attendance/today-status", "GET", null, t),
// };
