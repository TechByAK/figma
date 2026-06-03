import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

function Settings() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (!isDesktop) {
    return (
      <MobilePageLayout title="Settings">
        <section style={mobilePanel}>
          <p style={text}>Manage your profile and app preferences.</p>

          <button onClick={logout} style={dangerButton}>
            <AppIcon name="logout" size={21} />
            <span>Logout</span>
          </button>
        </section>
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      <section style={panel}>
        <h1 style={title}>Settings</h1>
        <p style={text}>Manage your profile and app preferences.</p>

        <button onClick={logout} style={dangerButton}>
          <AppIcon name="logout" size={21} />
          <span>Logout</span>
        </button>
      </section>
    </DesktopLayout>
  );
}

const panel = {
  background: "white",
  borderRadius: "26px",
  padding: "28px",
  minHeight: "calc(100vh - 160px)",
  boxShadow: "0 5px 22px rgba(20, 25, 50, 0.12)",
};

const mobilePanel = {
  background: "#f5f6fa",
  borderRadius: "18px",
  padding: "20px",
};

const title = {
  margin: "0 0 14px",
  lineHeight: 1.15,
  color: "#111735",
};

const text = {
  margin: 0,
  lineHeight: 1.6,
  color: "#111735",
  fontSize: "17px",
};

const dangerButton = {
  marginTop: "20px",
  minHeight: "52px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "#ff5757",
  color: "white",
  border: 0,
  borderRadius: "14px",
  padding: "0 20px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(255, 87, 87, 0.22)",
};

export default Settings;
