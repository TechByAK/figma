import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_RULES, validatePrototypeCredentials } from "../utils/users";

function Login() {
  const navigate = useNavigate();
  const [showCredentials, setShowCredentials] = useState(false);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("Alex");
  const [email, setEmail] = useState("student@student.rennes-sb.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function loginAs(user, options = {}) {
    setIsLoading(true);
    localStorage.setItem("user", user);
    if (!options.keepDisplayName) {
      localStorage.removeItem("displayName");
    }
    setTimeout(() => navigate("/app"), 650);
  }

  function selectRole(nextRole) {
    const rule = ROLE_RULES[nextRole];

    setRole(nextRole);
    setName("Alex");
    setEmail(`${nextRole}${rule.emailDomain}`);
    setPassword("password");
    setError("");
  }

  function loginWithCredentials(event) {
    event.preventDefault();

    if (!validatePrototypeCredentials(role, email)) {
      setError(`Use an email ending with ${ROLE_RULES[role].emailDomain}.`);
      return;
    }

    localStorage.setItem("displayName", name.trim() || role);
    loginAs(role, { keepDisplayName: true });
  }

  return (
    <div style={page}>
      <img src="/images/Frame.png" style={{ width: "170px", marginBottom: "40px" }} />

      {isLoading && (
        <div style={loadingLayer}>
          <img src="/images/Frame.png" style={loadingLogo} alt="" />
          <p style={loadingText}>Opening your campus space</p>
        </div>
      )}

      <h1>Welcome</h1>
      <p>Choose how you want to enter the app</p>

      {!showCredentials ? (
        <button style={btnDark} onClick={() => setShowCredentials(true)}>
          Login with university credentials
        </button>
      ) : (
        <form onSubmit={loginWithCredentials} style={loginCard}>
          <div style={roleGrid}>
            <RoleButton active={role === "student"} onClick={() => selectRole("student")}>
              Student
            </RoleButton>
            <RoleButton active={role === "professor"} onClick={() => selectRole("professor")}>
              Professor
            </RoleButton>
            <RoleButton active={role === "staff"} onClick={() => selectRole("staff")}>
              Staff
            </RoleButton>
          </div>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={input}
            placeholder="Name"
            autoComplete="name"
          />

          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={input}
            placeholder="University email"
            autoComplete="username"
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={input}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
          />

          {error && <p style={errorText}>{error}</p>}

          <button style={btnDark} type="submit">
            Continue as {role}
          </button>
        </form>
      )}

      <button style={btnDark} onClick={() => loginAs("naima")}>
        View Naima sample
      </button>

      <button style={btn} onClick={() => loginAs("guest")}>
        Continue as Guest
      </button>
    </div>
  );
}

function RoleButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={active ? activeRoleButton : roleButton}
    >
      {children}
    </button>
  );
}

const page = {
  width: "100%",
  minHeight: "100vh",
  background: "#00337a",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Arial",
  padding: "28px",
};

const btn = {
  width: "min(100%, 340px)",
  padding: "15px",
  margin: "10px",
  borderRadius: "12px",
  border: "none",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
};

const btnDark = {
  ...btn,
  background: "#111735",
  color: "white",
};

const loginCard = {
  width: "min(100%, 380px)",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  padding: "18px",
  marginTop: "22px",
  marginBottom: "4px",
  borderRadius: "18px",
  background: "white",
  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)",
};

const roleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "8px",
};

const roleButton = {
  minHeight: "44px",
  border: "1px solid #d4d8e8",
  borderRadius: "12px",
  background: "#f5f6fa",
  color: "#111735",
  fontWeight: "800",
  cursor: "pointer",
};

const activeRoleButton = {
  ...roleButton,
  background: "#00337a",
  color: "white",
  borderColor: "#00337a",
};

const input = {
  width: "100%",
  minHeight: "48px",
  border: "1px solid #d4d8e8",
  borderRadius: "12px",
  padding: "0 14px",
  color: "#111735",
  fontSize: "16px",
  fontWeight: "600",
};

const errorText = {
  margin: 0,
  color: "#d9234f",
  fontSize: "14px",
  fontWeight: "700",
};

const loadingLayer = {
  position: "fixed",
  inset: 0,
  zIndex: 20,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  background: "#00337a",
};

const loadingLogo = {
  width: "140px",
};

const loadingText = {
  margin: 0,
  color: "white",
  fontSize: "18px",
  fontWeight: "800",
};

export default Login;
