import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

const mapUrl = "https://www.google.com/maps?q=Rennes%20School%20of%20Business&output=embed";
const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Rennes%20School%20of%20Business";

function CampusMap() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();
  const content = <CampusMapContent isDesktop={isDesktop} onBack={() => goBack(navigate)} />;

  if (!isDesktop) {
    return (
      <MobilePageLayout title="Campus map">
        {content}
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      {content}
    </DesktopLayout>
  );
}

function CampusMapContent({ isDesktop, onBack }) {
  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={backRow}>
        <button onClick={onBack} style={backButton} type="button">
          <AppIcon name="arrowLeft" size={18} />
          <span>Back</span>
        </button>
      </div>

      <div style={header}>
        <div>
          <p style={eyebrow}>Rennes School of Business</p>
        </div>

        <a href={directionsUrl} target="_blank" rel="noreferrer" style={directionsButton}>
          <AppIcon name="externalLink" size={19} />
          <span>Open map</span>
        </a>
      </div>

      <div style={mapShell}>
        <iframe
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          style={mapFrame}
          title="Rennes School of Business campus map"
        />
      </div>

      <div style={infoGrid}>
        <InfoCard icon="mapPin" title="Main campus">
          2 Rue Robert d'Arbrissel, 35065 Rennes
        </InfoCard>
        <InfoCard icon="school" title="Academic buildings">
          Classrooms, lecture halls, student services, and faculty areas.
        </InfoCard>
        <InfoCard icon="help" title="Need support?">
          Use the Help section for reception, department, or service guidance.
        </InfoCard>
      </div>
    </section>
  );
}

function goBack(navigate) {
  if (window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate("/app");
}

function InfoCard({ children, icon, title }) {
  return (
    <article style={infoCard}>
      <span style={infoIcon}>
        <AppIcon name={icon} size={21} />
      </span>
      <div style={infoTextBlock}>
        <h2 style={infoTitle}>{title}</h2>
        <p style={infoText}>{children}</p>
      </div>
    </article>
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
  padding: "18px",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  textAlign: "center",
  marginBottom: "18px",
};

const eyebrow = {
  margin: "0 0 4px",
  color: "#1f57d6",
  fontSize: "14px",
  fontWeight: "800",
};

const backRow = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "14px",
};

const backButton = {
  minHeight: "42px",
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  border: 0,
  borderRadius: "12px",
  padding: "0 13px",
  marginBottom: "12px",
  background: "#081a4a",
  color: "white",
  fontSize: "14px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 5px 16px rgba(8, 26, 74, 0.2)",
};

const directionsButton = {
  minHeight: "44px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "14px",
  padding: "0 14px",
  background: "#081a4a",
  color: "white",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "800",
  boxShadow: "0 6px 18px rgba(8, 26, 74, 0.22)",
};

const mapShell = {
  overflow: "hidden",
  borderRadius: "18px",
  border: "1px solid #d9e0f0",
  background: "white",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const mapFrame = {
  width: "100%",
  height: "min(62vh, 520px)",
  minHeight: "360px",
  border: 0,
  display: "block",
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "14px",
  marginTop: "16px",
};

const infoCard = {
  minWidth: 0,
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  background: "white",
  borderRadius: "16px",
  padding: "16px",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const infoIcon = {
  width: "42px",
  height: "42px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const infoTextBlock = {
  minWidth: 0,
};

const infoTitle = {
  margin: "0 0 5px",
  color: "#111735",
  fontSize: "17px",
  lineHeight: 1.25,
};

const infoText = {
  margin: 0,
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

export default CampusMap;
