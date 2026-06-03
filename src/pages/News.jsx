import { useNavigate } from "react-router-dom";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

function News() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();

  if (!isDesktop) {
    return (
      <MobilePageLayout title="News & Events">
        <div style={mobileCard}>
          <h2 style={cardTitle}>Conference with Thibault Cauvin</h2>
          <p style={cardText}>Upcoming event at Rennes School of Business.</p>
        </div>

        <div style={mobileCard}>
          <h2 style={cardTitle}>Student Life Update</h2>
          <p style={cardText}>New activities and campus events are available.</p>
        </div>
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      <section style={panel}>
        <div style={header}>
          <h1 style={title}>News & Events</h1>
          <button onClick={() => navigate("/app")} style={linkButton}>
            Dashboard
          </button>
        </div>

        <div style={card}>
          <h2>Conference with Thibault Cauvin</h2>
          <p>Upcoming event at Rennes School of Business.</p>
        </div>

        <div style={card}>
          <h2>Student Life Update</h2>
          <p>New activities and campus events are available.</p>
        </div>
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

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
};

const title = {
  margin: 0,
  color: "#111735",
};

const card = {
  background: "#f5f6fa",
  padding: "20px",
  borderRadius: "16px",
  marginBottom: "20px",
};

const mobileCard = {
  background: "#f5f6fa",
  padding: "18px",
  borderRadius: "16px",
  marginBottom: "14px",
  color: "#111735",
};

const cardTitle = {
  margin: "0 0 8px",
  fontSize: "20px",
  lineHeight: 1.25,
  color: "#111735",
};

const cardText = {
  margin: 0,
  lineHeight: 1.5,
  color: "#111735",
};

const linkButton = {
  border: 0,
  background: "#081a4a",
  color: "white",
  borderRadius: "14px",
  padding: "12px 18px",
  fontWeight: "700",
  cursor: "pointer",
};

export default News;
