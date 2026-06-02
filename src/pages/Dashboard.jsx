import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";
  const name = user === "naima" ? "Naima" : "Guest";
  const avatar = user === "naima" ? "/images/naima-figma.png" : "/images/guest.png";

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={page}>
      <div style={layout}>

        {/* Sidebar */}
        <div style={sidebar}>
          <img src="/images/Frame-desktop.png" style={logo} />

          <SideItem active label="𓃑" text="Dashboard" onClick={() => navigate("/app")} />
          <SideItem label="🗓️" text="Schedule" onClick={() => navigate("/schedule")} />
          <SideItem label="🎓" text="Studies" onClick={() => navigate("/studies")} />
          <SideItem label="❔" text="Help" onClick={() => navigate("/help")} />

          <button onClick={logout} style={logoutBtn}>
            🚪 Logout
          </button>
        </div>

        {/* Main */}
        <div style={main}>

          {/* Header */}
          <div style={header}>
            <div style={profile}>
              <img src={avatar} style={avatarStyle} />

              <div>
                <p style={hiText}>Hi</p>
                <h1 style={nameTitle}>{name} !</h1>
              </div>
            </div>

            <div style={topButtons}>
              <TopButton onClick={() => navigate("/notifications")}>🔔</TopButton>
              <TopButton onClick={() => navigate("/settings")}>⚙️</TopButton>
            </div>
          </div>

          {/* Main Dashboard Card */}
          <div style={dashboardCard}>

            {/* Next course */}
            <div style={nextCourseBox}>
              <h2 style={sectionTitle}>Next course</h2>

              {user === "guest" ? (
                <div style={emptyCourse}>
                  <div style={{ fontSize: "42px" }}>🗓️</div>
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

              <button style={blueButton}>🗺️ Campus map</button>
              <button style={cyanButton}>🎓 School services</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SideItem({ label, text, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "13px",
        borderRadius: "14px",
        marginBottom: "16px",
        cursor: "pointer",
        background: active ? "#f0efff" : "white",
        color: active ? "#081a4a" : "#333",
        fontWeight: active ? "bold" : "normal",
        fontSize: "15px",
      }}
    >
      <span style={{ fontSize: "21px" }}>{label}</span>
      <span>{text}</span>
    </div>
  );
}

function TopButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={topButton}>
      {children}
    </button>
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

const page = {
  fontFamily: "Arial",
  background: "#f5f6fa",
  minHeight: "100vh",
  width: "100vw",
  overflowX: "hidden",
};

const layout = {
  display: "flex",
  minHeight: "100vh",
  width: "100%",
};

const sidebar = {
  width: "140px",
  flexShrink: 0,
  background: "white",
  padding: "20px 10px",
  boxSizing: "border-box",
};

const logo = {
  width: "95px",
  display: "block",
  margin: "0 auto 50px",
};

const main = {
  flex: 1,
  padding: "24px",
  boxSizing: "border-box",
  minWidth: 0,
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "28px",
};

const profile = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const avatarStyle = {
  width: "58px",
  height: "58px",
  borderRadius: "50%",
};

const hiText = {
  margin: 0,
  fontSize: "17px",
};

const nameTitle = {
  margin: 0,
  fontSize: "42px",
  color: "#111735",
};

const topButtons = {
  display: "flex",
  gap: "16px",
};

const topButton = {
  width: "64px",
  height: "64px",
  borderRadius: "18px",
  border: "none",
  background: "white",
  fontSize: "28px",
  cursor: "pointer",
  boxShadow: "0 5px 18px #ddd",
};

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
  color: "#6b6677",
  marginTop: 0,
};

const emptyCourse = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  textAlign: "center",
  color: "#6b6677",
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
  color: "gray",
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
  color: "#596080",
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "28px",
};

const blueButton = {
  width: "100%",
  marginTop: "38px",
  padding: "18px",
  fontSize: "18px",
  borderRadius: "18px",
  border: "none",
  background: "#081a4a",
  color: "white",
  cursor: "pointer",
  boxShadow: "0 5px 18px rgba(8,26,74,0.25)",
};

const cyanButton = {
  ...blueButton,
  marginTop: "20px",
  background: "#00a8c8",
};

const logoutBtn = {
  marginTop: "110px",
  width: "100%",
  padding: "14px",
  border: "none",
  borderRadius: "16px",
  background: "white",
  color: "#666",
  fontSize: "15px",
  cursor: "pointer",
};

export default Dashboard;