import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();

  return (
    <div style={{ margin: 0, fontFamily: "Arial", background: "white" }}>
      <div style={{ padding: "35px", paddingBottom: "130px", minHeight: "100vh" }}>
        <h1 style={{ textAlign: "center", marginBottom: "55px" }}>February</h1>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "30px",
          marginBottom: "60px"
        }}>
          <div>Mon<br />15</div>
          <div style={{
            background: "#081a4a",
            color: "white",
            padding: "18px 24px",
            borderRadius: "18px"
          }}>Tue<br />16</div>
          <div>Wed<br />17</div>
          <div>Thu<br />18</div>
          <div>Fri<br />19</div>
        </div>

        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 14px" }}>
          <tbody>
            <tr style={{ height: "80px" }}>
              <td style={{ width: "90px", fontSize: "24px" }}>9 AM</td>
              <td rowSpan="3" style={{
                background: "white",
                borderLeft: "6px solid #45c9d8",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 4px 18px #ddd"
              }}>
                <h2>Stellar Physics</h2>
                <p>Bat. B • Salle 12</p>
                <p>9:30 AM — 11:30 AM</p>
              </td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>10 AM</td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>11 AM</td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>12 PM</td>
              <td style={{ borderTop: "1px solid #ddd" }}></td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>1 PM</td>
              <td rowSpan="3" style={{
                background: "white",
                border: "4px solid #ff6b6b",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 4px 18px #ddd"
              }}>
                <h2>Stellar Physics</h2>
                <p>Cancelled</p>
                <p>1 PM — 3 PM</p>
              </td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>2 PM</td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>3 PM</td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>4 PM</td>
              <td style={{ borderTop: "1px solid #ddd" }}></td>
            </tr>

            <tr style={{ height: "80px" }}>
              <td style={{ fontSize: "24px" }}>5 PM</td>
              <td style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 4px 18px #ddd"
              }}>
                <h2>General relativity</h2>
                <p>5 PM — 6 PM</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        display: "flex",
        justifyContent: "space-around",
        padding: "22px 0",
        boxShadow: "0 -4px 18px #ddd",
        borderRadius: "28px 28px 0 0"
      }}>
        <div onClick={() => navigate("/")} style={{ textAlign: "center", color: "#9aa0b5", cursor: "pointer" }}>
          ⊞<br />Dashboard
        </div>

        <div style={{ textAlign: "center", color: "#111735" }}>
          🗓️<br />Schedule
        </div>

        <div style={{ textAlign: "center", color: "#9aa0b5" }}>
          🎓<br />Studies
        </div>

        <div style={{ textAlign: "center", color: "#9aa0b5" }}>
          ❔<br />Help
        </div>
      </div>
    </div>
  );
}

export default Calendar;