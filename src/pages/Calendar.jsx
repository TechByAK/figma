import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  const months = ["January 2025", "February 2025", "March 2025"];
  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);

  function previousMonth() {
    if (monthIndex > 0) setMonthIndex(monthIndex - 1);
  }

  function nextMonth() {
    if (monthIndex < months.length - 1) setMonthIndex(monthIndex + 1);
  }

  return (
    <div style={page}>
      <div style={monthHeader}>
        <button onClick={previousMonth}>←</button>
        <h1>{months[monthIndex]}</h1>
        <button onClick={nextMonth}>→</button>
      </div>

      <div style={days}>
        {[15, 16, 17, 18, 19].map((day) => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            style={day === selectedDay ? selectedDayStyle : dayStyle}
          >
            {day === 15
              ? "Mon"
              : day === 16
              ? "Tue"
              : day === 17
              ? "Wed"
              : day === 18
              ? "Thu"
              : "Fri"}
            <br />
            {day}
          </div>
        ))}
      </div>

      {user === "guest" ? (
        <div style={emptyCard}>
          <h2>No schedule available</h2>
          <p style={{ color: "#6b7190" }}>
            Guest users do not have access to a personal calendar.
          </p>
        </div>
      ) : (
        <table style={{ width: "100%", borderSpacing: "0 14px" }}>
          <tbody>
            <tr>
              <td style={time}>9 AM</td>
              <td rowSpan="3" style={blueCard}>
                <h2>Stellar Physics</h2>
                <p>9:30 AM — 11:30 AM</p>
              </td>
            </tr>

            <tr>
              <td style={time}>10 AM</td>
            </tr>

            <tr>
              <td style={time}>11 AM</td>
            </tr>

            <tr>
              <td style={time}>12 PM</td>
              <td style={line}></td>
            </tr>

            <tr>
              <td style={time}>1 PM</td>
              <td rowSpan="3" style={cancelCard}>
                <h2>Stellar Physics</h2>
                <p>Cancelled</p>
                <p>1 PM — 3 PM</p>
              </td>
            </tr>

            <tr>
              <td style={time}>2 PM</td>
            </tr>

            <tr>
              <td style={time}>3 PM</td>
            </tr>

            <tr>
              <td style={time}>4 PM</td>
              <td style={line}></td>
            </tr>

            <tr>
              <td style={time}>5 PM</td>
              <td style={normalCard}>
                <h2>General relativity</h2>
                <p>5 PM — 6 PM</p>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <BottomNav navigate={navigate} />
    </div>
  );
}

function BottomNav({ navigate }) {
  return (
    <div style={bottomNav}>
      <div onClick={() => navigate("/home")}>𓃑<br />Dashboard</div>
      <div style={{ color: "#111735" }}>🗓️<br />Schedule</div>
      <div onClick={() => navigate("/studies")}>🎓<br />Studies</div>
      <div onClick={() => navigate("/help")}>❔<br />Help</div>
    </div>
  );
}

const page = {
  padding: "30px",
  paddingBottom: "120px",
  minHeight: "100vh",
  background: "white",
  fontFamily: "Arial",
};

const monthHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const days = {
  display: "flex",
  justifyContent: "space-between",
  margin: "40px 0",
  fontSize: "22px",
};

const dayStyle = {
  padding: "12px",
  cursor: "pointer",
};

const selectedDayStyle = {
  ...dayStyle,
  background: "#081a4a",
  color: "white",
  borderRadius: "15px",
};

const time = {
  width: "90px",
  fontSize: "22px",
};

const blueCard = {
  background: "white",
  borderLeft: "6px solid #45c9d8",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 4px 18px #ddd",
};

const cancelCard = {
  background: "white",
  border: "4px solid #ff6b6b",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 4px 18px #ddd",
};

const normalCard = {
  background: "white",
  borderRadius: "20px",
  padding: "25px",
  boxShadow: "0 4px 18px #ddd",
};

const line = {
  borderTop: "1px solid #ddd",
};

const emptyCard = {
  background: "white",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0 4px 18px #ddd",
  textAlign: "center",
  marginTop: "40px",
};

const bottomNav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "white",
  display: "flex",
  justifyContent: "space-around",
  padding: "22px 0",
  boxShadow: "0 -4px 18px #ddd",
  color: "#9aa0b5",
};

export default Calendar;