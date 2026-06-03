import { useEffect, useState } from "react";
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
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 2000);

    return () => window.clearTimeout(splashTimer);
  }, []);

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
      {showSplash && (
        <div style={splashLayer}>
          <img src="/images/Frame.png" style={splashLogo} alt="Rennes School of Business" />
        </div>
      )}

      {isLoading && (
        <div style={loadingLayer}>
          <img src="/images/Frame.png" style={loadingLogo} alt="" />
          <p style={loadingText}>Opening your campus space</p>
        </div>
      )}

      <main style={loginPanel}>
        <img src="/images/Frame.png" style={logo} alt="Rennes School of Business" />

        <div style={headingBlock}>
          <h1 style={heading}>Welcome</h1>
          <p style={subheading}>Choose your access mode</p>
        </div>

        {!showCredentials ? (
          <button style={primaryButton} onClick={() => setShowCredentials(true)}>
            University credentials
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

            <button style={primaryButton} type="submit">
              Continue as {role}
            </button>
          </form>
        )}

        <div style={secondaryActions}>
          <button style={secondaryButton} onClick={() => loginAs("naima")}>
            Naima sample
          </button>

          <button style={ghostButton} onClick={() => loginAs("guest")}>
            Guest preview
          </button>
        </div>
      </main>
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
  padding: "20px",
  overflow: "hidden",
};

const loginPanel = {
  width: "min(100%, 360px)",
  display: "grid",
  justifyItems: "center",
  gap: "14px",
  borderRadius: "24px",
  padding: "22px 18px",
  background: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 18px 45px rgba(0, 0, 0, 0.18)",
};

const logo = {
  width: "118px",
  display: "block",
};

const headingBlock = {
  textAlign: "center",
};

const heading = {
  margin: 0,
  fontSize: "30px",
  lineHeight: 1.1,
};

const subheading = {
  margin: "6px 0 0",
  color: "rgba(255, 255, 255, 0.86)",
  fontSize: "14px",
  fontWeight: "700",
};

const buttonBase = {
  width: "100%",
  minHeight: "44px",
  borderRadius: "13px",
  border: "none",
  padding: "0 14px",
  fontSize: "15px",
  fontWeight: "800",
  cursor: "pointer",
};

const primaryButton = {
  ...buttonBase,
  background: "#111735",
  color: "white",
};

const secondaryActions = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "10px",
};

const secondaryButton = {
  ...buttonBase,
  background: "white",
  color: "#081a4a",
};

const ghostButton = {
  ...buttonBase,
  background: "rgba(255, 255, 255, 0.16)",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.3)",
};

const loginCard = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "14px",
  borderRadius: "16px",
  background: "white",
  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)",
};

const roleGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "8px",
};

const roleButton = {
  minHeight: "38px",
  border: "1px solid #d4d8e8",
  borderRadius: "11px",
  background: "#f5f6fa",
  color: "#111735",
  fontSize: "13px",
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
  minHeight: "42px",
  border: "1px solid #d4d8e8",
  borderRadius: "11px",
  padding: "0 12px",
  color: "#111735",
  fontSize: "14px",
  fontWeight: "600",
};

const errorText = {
  margin: 0,
  color: "#d9234f",
  fontSize: "14px",
  fontWeight: "700",
};

const splashLayer = {
  position: "fixed",
  inset: 0,
  zIndex: 30,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#00337a",
};

const splashLogo = {
  width: "155px",
  display: "block",
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
