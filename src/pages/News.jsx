import { useNavigate } from "react-router-dom";
import DesktopLayout from "../components/DesktopLayout";

function News() {
  const navigate = useNavigate();

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
