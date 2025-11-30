// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { getUser, logout } from "../utils/auth";

// export default function Header() {
//   const user = getUser();
//   const nav = useNavigate();

//   return (
//     <header style={{ background: "#0a5b87", padding: "14px", color: "white" }}>
//       <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between" }}>
//         <h3>Attendance System</h3>

//         <nav style={{ display: "flex", gap: "14px" }}>
//           {user ? (
//             <>
//               <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
//               <Link to="/history" style={{ color: "white" }}>History</Link>
//               {user?.role === "manager" && (
//                  <Link to="/manager" style={{ color: 'white'}}>Manager Dashboard</Link>
//                  )}
//               <button
//                 style={{ padding: "6px 10px", cursor: "pointer" }}
//                 onClick={() => {
//                   logout();
//                   nav("/login");
//                 }}
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" style={{ color: "white" }}>Login</Link>
//               <Link to="/register" style={{ color: "white" }}>Register</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Header() {
  const user = getUser();
  const nav = useNavigate();

  const headerStyle = {
    background: "linear-gradient(90deg, #004b6b, #0077a8)",
    padding: "14px 0",
    color: "white",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const container = {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 16px",
  };

  const navLink = {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "0.25s",
  };

  const navLinkHover = {
    background: "rgba(255, 255, 255, 0.15)",
  };

  const buttonStyle = {
    padding: "8px 12px",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.15)",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: 500,
    transition: "0.25s",
  };

  return (
    <header style={headerStyle}>
      <div style={container}>
        <h2 style={{ margin: 0, letterSpacing: "0.5px" }}>Attendance System</h2>

        <nav style={{ display: "flex", gap: "6px", alignItems: "center" }}>

          {user ? (
            <>
              <Link
                to="/dashboard"
                style={navLink}
                onMouseOver={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseOut={(e) => Object.assign(e.target.style, navLink)}
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                style={navLink}
                onMouseOver={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseOut={(e) => Object.assign(e.target.style, navLink)}
              >
                History
              </Link>

              {user?.role === "manager" && (
                <Link
                  to="/manager"
                  style={navLink}
                  onMouseOver={(e) => Object.assign(e.target.style, navLinkHover)}
                  onMouseOut={(e) => Object.assign(e.target.style, navLink)}
                >
                  Manager Dashboard
                </Link>
              )}

              <button
                style={buttonStyle}
                onMouseOver={(e) =>
                  (e.target.style.background = "rgba(255,255,255,0.25)")
                }
                onMouseOut={(e) =>
                  (e.target.style.background = "rgba(255,255,255,0.15)")
                }
                onClick={() => {
                  logout();
                  nav("/login");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={navLink}
                onMouseOver={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseOut={(e) => Object.assign(e.target.style, navLink)}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={navLink}
                onMouseOver={(e) => Object.assign(e.target.style, navLinkHover)}
                onMouseOut={(e) => Object.assign(e.target.style, navLink)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
