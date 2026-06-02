import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || "guest";

  const name = user === "naima" ? "Naima" : "Guest";
  const avatar =
    user === "naima" ? "/images/naima-figma.png" : "/images/guest.png";

  return (
    <div style={page}>
      <div style={header}>
        <div style={profile}>
          <img src={avatar} style={avatarStyle} />
          <div>
            <p style={{ margin: 0, color: "#6b7190", fontSize: "22px" }}>Hi</p>
            <h1 style={{ margin: 0 }}>{name}!</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={circleBtn} onClick={() => navigate("/notifications")}>🔔</button>
          <button style={circleBtn} onClick={() => navigate("/settings")}>⚙️</button>
        </div>
      </div>

      <div style={cardsWrapper}>
        <div style={courseCard}>
          <div style={dateBox}>
            <div>Tue</div>
            <strong>16</strong>
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ margin: 0 }}>Stellar Physics</h2>
            <p style={{ color: "#007c8c" }}>📍 Bat. B &nbsp; Salle 12</p>
            <p>🕘 3 PM → 5 PM</p>
          </div>

          <h3 style={{ color: "#9aa0b5" }}>2h.</h3>
        </div>

        <div style={welcomeCard}>
          <h2>Welcome to Rennes School of Business!</h2>
          <p style={{ color: "#6b7190" }}>
            We are delighted to welcome you to this space dedicated to your academic and personal success.
          </p>
          <button>Campus map</button>
          <button style={{ marginLeft: "10px" }}>School services</button>
        </div>
      </div>

      <div style={eventsHeader}>
        <div style={{ display: "flex", gap: "35px" }}>
          <h2 style={{ borderBottom: "4px solid #111735" }}>Events</h2>
          <h2 style={{ color: "#6b7190", cursor: "pointer" }} onClick={() => navigate("/news")}>
            News
          </h2>
        </div>

        <h2 style={{ color: "#00a8c8", cursor: "pointer" }} onClick={() => navigate("/news")}>
          See All
        </h2>
      </div>

      <img src="/images/event1.png" style={eventImg} />
      <img src="/images/event2.png" style={eventImg} />

      <BottomNav navigate={navigate} active="home" />
    </div>
  );
}

function BottomNav({ navigate }) {
  return (
    <div style={bottomNav}>
      <div style={activeNav} onClick={() => navigate("/home")}>𓃑<br />Dashboard</div>
      <div onClick={() => navigate("/calendar")}>🗓️<br />Schedule</div>
      <div onClick={() => navigate("/studies")}>🎓<br />Studies</div>
      <div onClick={() => navigate("/help")}>❔<br />Help</div>
    </div>
  );
}

const page = { padding: "32px", paddingBottom: "120px", minHeight: "100vh", background: "white", fontFamily: "Arial" };
const header = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" };
const profile = { display: "flex", alignItems: "center", gap: "15px" };
const avatarStyle = { width: "58px", height: "58px", borderRadius: "50%" };
const circleBtn = { border: "none", background: "#f4f5f8", borderRadius: "50%", width: "55px", height: "55px", fontSize: "24px" };
const cardsWrapper = { background: "#f4f4f6", padding: "16px", borderRadius: "28px", marginBottom: "60px" };
const courseCard = { background: "white", borderRadius: "18px", padding: "16px", display: "flex", gap: "20px", alignItems: "center", boxShadow: "0 4px 15px #ddd" };
const dateBox = { background: "#fde6f3", borderRadius: "12px", padding: "18px", textAlign: "center", color: "#7a0b4f", fontSize: "20px" };
const welcomeCard = { background: "white", borderRadius: "18px", padding: "25px", marginTop: "20px", boxShadow: "0 4px 15px #ddd" };
const eventsHeader = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const eventImg = { width: "100%", borderRadius: "18px", marginTop: "25px" };
const bottomNav = { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", display: "flex", justifyContent: "space-around", padding: "22px 0", boxShadow: "0 -4px 18px #ddd", color: "#9aa0b5" };
const activeNav = { color: "#111735", cursor: "pointer" };

export default Home;