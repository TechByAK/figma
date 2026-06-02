import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  const name = user === "naima" ? "Naima" : "Guest";

  const avatar =
    user === "naima" ? "/images/naima-figma.png" : "/images/guest.png";

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={{ margin: 0, fontFamily: "Arial", background: "#f5f6fa" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div
          style={{
            width: "120px",
            background: "white",
            textAlign: "center",
            paddingTop: "20px",
          }}
        >
          <img src="/images/Frame-desktop.png" style={{ width: "90px" }} />

          <div style={{ marginTop: "60px" }}>
            <p onClick={() => navigate("/app")} style={{ cursor: "pointer" }}>
              <b>
                𓃑
                <br />
                Dashboard
              </b>
            </p>

            <p
              onClick={() => navigate("/schedule")}
              style={{ cursor: "pointer", color: "gray" }}
            >
              🗓️
              <br />
              Schedule
            </p>

            <p
              onClick={() => navigate("/studies")}
              style={{ cursor: "pointer", color: "gray" }}
            >
              🎓
              <br />
              Studies
            </p>

            <p
              onClick={() => navigate("/help")}
              style={{ cursor: "pointer", color: "gray" }}
            >
              ❔
              <br />
              Help
            </p>
          </div>

          <p
            onClick={logout}
            style={{
              marginTop: "250px",
              color: "gray",
              cursor: "pointer",
            }}
          >
            ↪
            <br />
            Logout
          </p>
        </div>

        <div style={{ flex: 1, padding: "25px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <img
                src={avatar}
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                }}
              />

              <div>
                <p style={{ margin: 0, color: "#1c2440" }}>Hi</p>
                <h1 style={{ margin: 0, color: "#111735" }}>{name} !</h1>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
  <button
    onClick={() => navigate("/notifications")}
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "18px",
      border: "none",
      background: "white",
      fontSize: "32px",
      cursor: "pointer",
      boxShadow: "0 4px 15px #ddd"
    }}
  >
    🔔
  </button>

  <button
    onClick={() => navigate("/settings")}
    style={{
      width: "70px",
      height: "70px",
      borderRadius: "18px",
      border: "none",
      background: "white",
      fontSize: "32px",
      cursor: "pointer",
      boxShadow: "0 4px 15px #ddd"
    }}
  >
    ⚙️
  </button>
</div>
          </div>

          <div
            style={{
              marginTop: "25px",
              background: "white",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 4px 18px #ddd",
              minHeight: "780px",
              display: "flex",
              gap: "40px",
            }}
          >
            <div
              style={{
                width: "330px",
                background: "#f3f4f8",
                borderRadius: "14px",
                padding: "15px",
              }}
            >
              <h3>Next course</h3>

              {user === "guest" ? (
                <div
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    color: "gray",
                  }}
                >
                  <b>No courses available</b>
                  <p>Guest users do not have a personal schedule.</p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      background: "white",
                      padding: "15px",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  >
                    <b>Stellar Physics</b>
                    <p>Tue 16 • 9:30 PM — 11:30 PM</p>
                  </div>

                  <div
                    style={{
                      background: "white",
                      padding: "15px",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  >
                    <b>Business Analytics</b>
                    <p>Wed 17 • 9:30 PM — 11:30 PM</p>
                  </div>

                  <div
                    style={{
                      background: "white",
                      padding: "15px",
                      borderRadius: "12px",
                    }}
                  >
                    <b>Change Management</b>
                    <p>Wed 17 • 2 PM — 4 PM</p>
                  </div>
                </>
              )}
            </div>

            <div style={{ width: "520px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "30px" }}>
                  <h3 style={{ borderBottom: "3px solid #111735" }}>
                    Events
                  </h3>

                  <h3
                    onClick={() => navigate("/news")}
                    style={{ color: "gray", cursor: "pointer" }}
                  >
                    News
                  </h3>
                </div>

                <p
                  onClick={() => navigate("/news")}
                  style={{ color: "#00a8c8", cursor: "pointer" }}
                >
                  See All
                </p>
              </div>

              <img
                src="/images/event1.png"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "15px",
                }}
              />

              <img
                src="/images/event2.png"
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  marginBottom: "15px",
                }}
              />

              <img
                src="/images/event3.png"
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </div>

            <div
              style={{
                width: "310px",
                height: "160px",
                background: "white",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 4px 15px #ddd",
              }}
            >
              <h3>Welcome to Rennes School of Business !</h3>

              <p style={{ color: "#596080" }}>
                We are delighted to welcome you to this space dedicated to your
                academic and personal success...
              </p>

              <div style={{
  display:"flex",
  justifyContent:"center",
  gap:"18px",
  marginTop:"20px"
}}>

<button
  style={{
    padding:"18px 30px",
    fontSize:"20px",
    borderRadius:"18px",
    border:"none",
    background:"#081a4a",
    color:"white",
    cursor:"pointer",
    boxShadow:"0 5px 18px rgba(8,26,74,0.25)"
  }}
>
  🗺️ Campus map
</button>

<button
  style={{
    padding:"18px 30px",
    fontSize:"20px",
    borderRadius:"18px",
    border:"none",
    background:"#00a8c8",
    color:"white",
    cursor:"pointer",
    boxShadow:"0 5px 18px rgba(0,168,200,0.25)"
  }}
>
  🎓 School services
</button>

</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;