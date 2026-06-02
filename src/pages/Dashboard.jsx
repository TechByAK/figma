import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";

function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  return (
    <DesktopLayout>
          <div style={dashboardCard}>

            {/* Next course */}
            <div style={nextCourseBox}>
              <h2 style={sectionTitle}>Next course</h2>

              {user === "guest" ? (
                <div style={emptyCourse}>
                  <AppIcon name="calendar" size={42} color="#111735" />
                  <h3>No courses available</h3>
                  <p>Guest users do not have a personal schedule.</p>
                </div>
              ) : (
                <>
                  <Course title="Stellar Physics" text="Tue 16 • 9:30 PM — 11:30 PM" />
                  <Course title="Business Analytics" text="Wed 17 • 9:30 PM — 11:30 PM" />
                  <Course title="Change Management" text="Wed 17 • 2 PM — 4 PM" />
                </>
              )}
            </div>

            {/* Events */}
            <div style={eventsBox}>
              <div style={eventsHeader}>
                <div style={tabs}>
                  <h2 style={activeTab}>Events</h2>

                  <h2
                    onClick={() => navigate("/news")}
                    style={inactiveTab}
                  >
                    News
                  </h2>
                </div>

                <h3
                  onClick={() => navigate("/news")}
                  style={seeAll}
                >
                  See All
                </h3>
              </div>

              <EventImage src="/images/event1.png" />
              <EventImage src="/images/event2.png" />
              <EventImage src="/images/event3.png" />
            </div>

            {/* Welcome */}
            <div style={welcomeBox}>
              <h2 style={welcomeTitle}>
                Welcome to Rennes School of Business !
              </h2>

              <p style={welcomeText}>
                We are delighted to welcome you to this space dedicated to your
                academic and personal success...
              </p>

              <button style={blueButton}>
                <AppIcon name="map" size={21} />
                <span>Campus map</span>
              </button>
              <button style={cyanButton}>
                <AppIcon name="school" size={21} />
                <span>School services</span>
              </button>
            </div>

          </div>
    </DesktopLayout>
  );
}

function Course({ title, text }) {
  return (
    <div style={courseCard}>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}

function EventImage({ src }) {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        height: "145px",
        objectFit: "cover",
        borderRadius: "16px",
        marginTop: "24px",
        display: "block",
      }}
    />
  );
}

/* STYLES */

const dashboardCard = {
  background: "white",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 5px 22px #ddd",
  display: "grid",
  gridTemplateColumns:
    "minmax(240px, 0.8fr) minmax(360px, 1.5fr) minmax(230px, 0.8fr)",
  gap: "22px",
  width: "100%",
  minHeight: "calc(100vh - 160px)",
  boxSizing: "border-box",
};

const nextCourseBox = {
  background: "#f3f4f8",
  borderRadius: "20px",
  padding: "20px",
  minHeight: "520px",
  boxSizing: "border-box",
};

const sectionTitle = {
  textAlign: "center",
  color: "#111735",
  marginTop: 0,
};

const emptyCourse = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  textAlign: "center",
  color: "#111735",
  marginTop: "25px",
};

const courseCard = {
  background: "white",
  padding: "16px",
  borderRadius: "15px",
  marginBottom: "16px",
  textAlign: "center",
};

const eventsBox = {
  minWidth: 0,
};

const eventsHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tabs = {
  display: "flex",
  gap: "28px",
};

const activeTab = {
  borderBottom: "4px solid #111735",
  margin: 0,
};

const inactiveTab = {
  color: "#111735",
  margin: 0,
  cursor: "pointer",
};

const seeAll = {
  color: "#00a8c8",
  cursor: "pointer",
  margin: 0,
  fontSize: "18px",
};

const welcomeBox = {
  background: "white",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 5px 20px #ddd",
  textAlign: "center",
  minHeight: "520px",
  boxSizing: "border-box",
};

const welcomeTitle = {
  color: "#111735",
  lineHeight: "1.3",
  fontSize: "22px",
};

const welcomeText = {
  color: "#111735",
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "28px",
};

const blueButton = {
  width: "100%",
  marginTop: "38px",
  minHeight: "58px",
  padding: "0 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontSize: "17px",
  borderRadius: "18px",
  border: "none",
  background: "#081a4a",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 5px 18px rgba(8,26,74,0.25)",
  whiteSpace: "nowrap",
};

const cyanButton = {
  ...blueButton,
  marginTop: "20px",
  background: "#00a8c8",
};

export default Dashboard;
