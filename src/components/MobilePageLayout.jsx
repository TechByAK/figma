import { useNavigate } from "react-router-dom";
import AppIcon from "./AppIcon";
import { getRoleCopy } from "../utils/users";

function MobilePageLayout({ active, children, title }) {
  const navigate = useNavigate();
  const roleCopy = getRoleCopy();

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={titleStyle}>{title}</h1>
      </header>

      <main style={main}>{children}</main>

      <nav style={bottomNav}>
        <NavItem
          active={active === "dashboard"}
          icon="dashboard"
          label="Dashboard"
          onClick={() => navigate("/app")}
        />
        <NavItem
          active={active === "schedule"}
          icon="calendar"
          label="Schedule"
          onClick={() => navigate("/schedule")}
        />
        <NavItem
          active={active === "studies"}
          icon="school"
          label={roleCopy.studiesLabel}
          onClick={() => navigate("/studies")}
        />
        <NavItem
          active={active === "help"}
          icon="help"
          label="Help"
          onClick={() => navigate("/help")}
        />
      </nav>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }) {
  return (
    <button onClick={onClick} style={active ? activeNavItem : navItem}>
      <AppIcon name={icon} size={22} />
      <span>{label}</span>
    </button>
  );
}

const page = {
  minHeight: "100vh",
  padding: "24px 20px 104px",
  background: "white",
  color: "#111735",
  fontFamily: "Arial, sans-serif",
};

const header = {
  marginBottom: "22px",
};

const titleStyle = {
  margin: 0,
  fontSize: "30px",
  lineHeight: 1.15,
  color: "#111735",
};

const main = {
  minWidth: 0,
};

const bottomNav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 30,
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  padding: "14px 0 16px",
  background: "white",
  boxShadow: "0 -4px 18px rgba(20, 25, 50, 0.12)",
  color: "#111735",
};

const navItem = {
  minWidth: 0,
  minHeight: "52px",
  border: 0,
  background: "white",
  color: "#111735",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
};

const activeNavItem = {
  ...navItem,
  color: "#00337a",
};

export default MobilePageLayout;
