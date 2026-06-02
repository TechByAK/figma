import { useNavigate } from "react-router-dom";

function DesktopCalendar() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, fontFamily: "Arial", background: "#f5f6fa" }}>

      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* Sidebar */}

        <div style={{
          width:"120px",
          background:"white",
          textAlign:"center",
          paddingTop:"20px"
        }}>

          <img
            src="/images/Frame-desktop.png"
            style={{ width:"90px" }}
          />

          <div style={{ marginTop:"60px" }}>

            <p
              onClick={() => navigate("/dashboard")}
              style={{ cursor:"pointer", color:"gray" }}
            >
              𓃑<br/>Dashboard
            </p>

            <p>
              <b>🗓️<br/>Schedule</b>
            </p>

            <p style={{ color:"gray" }}>
              🎓<br/>Studies
            </p>

            <p style={{ color:"gray" }}>
              ❔<br/>Help
            </p>

          </div>

        </div>

        {/* Main */}

        <div style={{ flex:1, padding:"25px" }}>

          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center"
          }}>

            <h1>Hi Naima !</h1>

            <div>
              🔔 ⚙️
            </div>

          </div>

          <div style={{
            background:"white",
            borderRadius:"20px",
            padding:"25px",
            marginTop:"25px",
            boxShadow:"0 4px 18px #ddd"
          }}>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}>

              <h2>February 2025</h2>

              <div>

                <button>Day</button>

                <button style={{ margin:"0 10px" }}>
                  Week
                </button>

                <button>Month</button>

              </div>

            </div>

            {/* Days */}

            <div style={{
              display:"grid",
              gridTemplateColumns:"80px repeat(7,1fr)",
              marginTop:"40px",
              marginBottom:"25px",
              textAlign:"center"
            }}>

              <div></div>

              <div>Mon 15</div>

              <div style={{
                background:"#081a4a",
                color:"white",
                borderRadius:"12px",
                padding:"10px"
              }}>
                Tue 16
              </div>

              <div>Wed 17</div>

              <div>Thu 18</div>

              <div>Fri 19</div>

              <div>Sat 20</div>

              <div>Sun 21</div>

            </div>

            {/* Timeline */}

            {[9,10,11,12,1,2,3,4,5,6].map((hour) => (

              <div
                key={hour}
                style={{
                  display:"grid",
                  gridTemplateColumns:"80px repeat(7,1fr)",
                  height:"70px",
                  borderTop:"1px solid #e4e7f0"
                }}
              >

                <div style={{ color:"#8a90a5" }}>
                  {hour} {hour < 6 ? "AM" : "PM"}
                </div>

                <div></div>

                <div style={{ position:"relative" }}>

                  {hour === 9 && (

                    <div style={{
                      position:"absolute",
                      width:"170px",
                      background:"white",
                      borderLeft:"6px solid #45c9d8",
                      borderRadius:"12px",
                      padding:"12px",
                      boxShadow:"0 4px 15px #ddd"
                    }}>

                      <b>Stellar Physics</b>

                      <p>9:30 AM → 11:30 AM</p>

                    </div>

                  )}

                </div>

                <div style={{ position:"relative" }}>

                  {hour === 9 && (

                    <div style={{
                      position:"absolute",
                      width:"170px",
                      background:"white",
                      borderLeft:"6px solid #00c39a",
                      borderRadius:"12px",
                      padding:"12px",
                      boxShadow:"0 4px 15px #ddd"
                    }}>

                      <b>Business Analytics</b>

                      <p>9:30 AM → 11:30 AM</p>

                    </div>

                  )}

                </div>

                <div></div>

                <div style={{ position:"relative" }}>

                  {hour === 1 && (

                    <div style={{
                      position:"absolute",
                      width:"170px",
                      background:"white",
                      border:"3px solid #ff6b6b",
                      borderRadius:"12px",
                      padding:"12px",
                      boxShadow:"0 4px 15px #ddd"
                    }}>

                      <b>Stellar Physics</b>

                      <p>Cancelled</p>

                    </div>

                  )}

                </div>

                <div></div>
                <div></div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default DesktopCalendar;