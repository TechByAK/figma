import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, fontFamily: "Arial", background: "#f5f6fa" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>

        <div style={{ width: "120px", background: "white", textAlign: "center", paddingTop: "20px" }}>
          <img src="/images/Frame-desktop.png" style={{ width: "90px" }} />

          <div style={{ marginTop: "60px" }}>
            <p><b>𓃑<br />Dashboard</b></p>
            <p onClick={() => navigate("/desktop-calendar")} style={{ cursor: "pointer", color: "gray" }}>🗓️<br />Schedule</p>
            <p style={{ color: "gray" }}>🎓<br />Studies</p>
            <p style={{ color: "gray" }}>❔<br />Help</p>
          </div>

          <p style={{ marginTop: "250px", color: "gray" }}>↪<br />Logout</p>
        </div>

        <div style={{ flex: 1, padding: "25px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img src="/images/naima-figma.png" style={{ width: "45px", height: "45px", borderRadius: "50%" }} />
              <div>
                <p style={{ margin: 0, color: "#1c2440" }}>Hi</p>
                <h1 style={{ margin: 0, color: "#111735" }}>Naima !</h1>
              </div>
            </div>

            <div style={{ display: "flex", gap: "15px" }}>
              <button>🔔</button>
              <button>⚙️</button>
            </div>
          </div>

          <div style={{ marginTop: "25px", background: "white", borderRadius: "20px", padding: "25px", boxShadow: "0 4px 18px #ddd", minHeight: "780px", display: "flex", gap: "40px" }}>
            
            <div style={{ width: "330px", background: "#f3f4f8", borderRadius: "14px", padding: "15px" }}>
              <h3>Next course</h3>

              <div style={{ background: "white", padding: "15px", borderRadius: "12px", marginBottom: "15px" }}>
                <b>Stellar Physics</b>
                <p>Tue 16 • 9:30 PM — 11:30 PM</p>
              </div>

              <div style={{ background: "white", padding: "15px", borderRadius: "12px", marginBottom: "15px" }}>
                <b>Business Analytics</b>
                <p>Wed 17 • 9:30 PM — 11:30 PM</p>
              </div>

              <div style={{ background: "white", padding: "15px", borderRadius: "12px" }}>
                <b>Change Management</b>
                <p>Wed 17 • 2 PM — 4 PM</p>
              </div>
            </div>

            <div style={{ width: "520px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "30px" }}>
                  <h3 style={{ borderBottom: "3px solid #111735" }}>Events</h3>
                  <h3 style={{ color: "gray" }}>News</h3>
                </div>
                <p style={{ color: "#00a8c8" }}>See All</p>
              </div>

              <img src="/images/event1.png" style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }} />
              <img src="/images/event2.png" style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }} />
              <img src="/images/event3.png" style={{ width: "100%", borderRadius: "12px" }} />
            </div>

            <div style={{ width: "310px", height: "160px", background: "white", borderRadius: "14px", padding: "20px", boxShadow: "0 4px 15px #ddd" }}>
              <h3>Welcome to Rennes School of Business !</h3>
              <p style={{ color: "#596080" }}>
                We are delighted to welcome you to this space dedicated to your academic and personal success...
              </p>
              <button>Campus map</button>
              <button>School services</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;