import { useLocation, useNavigate } from "react-router-dom";
import AppIcon from "./AppIcon";
import { getCurrentProfile, getRoleCopy } from "../utils/users";

function DesktopLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const profileData = getCurrentProfile();
  const roleCopy = getRoleCopy();
  const unreadCount = getUnreadNotificationCount(localStorage.getItem("user") || "guest");

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const navItems = [
    { path: "/app", icon: "dashboard", text: "Dashboard" },
    { path: "/schedule", icon: "calendar", text: "Schedule" },
    { path: "/studies", icon: "school", text: roleCopy.studiesLabel },
    { path: "/help", icon: "help", text: "Help" },
  ];

  return (
    <div style={page}>
      <aside style={sidebar}>
        <div style={logoTile}>
          <img src="/images/Frame.png" style={logo} alt="Rennes School of Business" />
        </div>

        <nav style={nav}>
          {navItems.map((item) => (
            <SideItem
              key={item.path}
              active={isActivePath(location.pathname, item.path)}
              icon={item.icon}
              text={item.text}
              onClick={() => navigate(item.path)}
            />
          ))}
        </nav>

        <button onClick={logout} style={logoutBtn}>
          <AppIcon name="logout" size={21} />
          <span>Logout</span>
        </button>
      </aside>

      <main style={main}>
        <header style={header}>
          <div style={profile}>
            <img src={profileData.avatar} style={avatarStyle} alt="" />

            <div>
              <p style={hiText}>Hi</p>
              <h1 style={nameTitle}>{profileData.name} !</h1>
            </div>
          </div>

          <div style={topButtons}>
            <TopButton badge={unreadCount} label="Notifications" onClick={() => navigate("/notifications")}>
              <AppIcon name="bell" size={25} />
            </TopButton>
            <TopButton label="Settings" onClick={() => navigate("/settings")}>
              <AppIcon name="settings" size={25} />
            </TopButton>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

function isActivePath(currentPath, itemPath) {
  if (itemPath === "/schedule") {
    return currentPath === "/schedule" || currentPath === "/desktop-calendar";
  }

  return currentPath === itemPath;
}

function SideItem({ icon, text, onClick, active }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...sideItem,
        background: active ? "#f0efff" : "white",
        color: active ? "#081a4a" : "#333",
        fontWeight: active ? "700" : "500",
      }}
    >
      <span style={sideIcon}>
        <AppIcon name={icon} size={21} />
      </span>
      <span style={sideText}>{text}</span>
    </button>
  );
}

function TopButton({ badge = 0, children, label, onClick }) {
  return (
    <button onClick={onClick} style={topButton} aria-label={label} title={label}>
      {children}
      {badge > 0 && <span style={badgeStyle}>{badge}</span>}
    </button>
  );
}

function getUnreadNotificationCount(user) {
  try {
    const readIds = JSON.parse(localStorage.getItem(`readNotifications:${user}`)) || [];
    return Math.max(0, 4 - readIds.length);
  } catch {
    return 4;
  }
}

const page = {
  display: "flex",
  alignItems: "stretch",
  minHeight: "100vh",
  width: "100%",
  background: "#f5f6fa",
  fontFamily: "Arial, sans-serif",
};

const sidebar = {
  position: "sticky",
  top: 0,
  width: "160px",
  height: "100vh",
  flexShrink: 0,
  background: "white",
  padding: "20px 12px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "1px 0 0 #e7e9f2",
  zIndex: 20,
};

const logoTile = {
  width: "104px",
  padding: "8px",
  margin: "0 auto 20px",
  borderRadius: "12px",
  background: "#00337a",
};

const logo = {
  width: "100%",
  display: "block",
};

const nav = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const sideItem = {
  width: "100%",
  minHeight: "50px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 12px",
  border: 0,
  borderRadius: "14px",
  cursor: "pointer",
  fontSize: "15px",
  textAlign: "left",
};

const sideIcon = {
  width: "24px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const sideText = {
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const logoutBtn = {
  width: "100%",
  minHeight: "52px",
  marginTop: "auto",
  padding: "0 12px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  border: 0,
  borderRadius: "14px",
  background: "white",
  color: "#666",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  textAlign: "left",
};

const main = {
  flex: 1,
  minWidth: 0,
  padding: "24px",
};

const header = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "84px",
  margin: "-24px -24px 28px",
  padding: "24px 24px 14px",
  background: "#f5f6fa",
};

const profile = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  minWidth: 0,
};

const avatarStyle = {
  width: "58px",
  height: "58px",
  borderRadius: "50%",
  objectFit: "cover",
  flexShrink: 0,
};

const hiText = {
  margin: 0,
  fontSize: "17px",
};

const nameTitle = {
  margin: 0,
  fontSize: "42px",
  lineHeight: 1,
  color: "#111735",
};

const topButtons = {
  display: "flex",
  gap: "16px",
  flexShrink: 0,
};

const topButton = {
  position: "relative",
  width: "64px",
  height: "64px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "18px",
  border: 0,
  background: "white",
  color: "#111735",
  cursor: "pointer",
  boxShadow: "0 5px 18px rgba(20, 25, 50, 0.12)",
};

const badgeStyle = {
  position: "absolute",
  top: "7px",
  right: "7px",
  minWidth: "18px",
  height: "18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  background: "#ff5757",
  color: "white",
  fontSize: "11px",
  fontWeight: "800",
};

export default DesktopLayout;
