import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  const months = [
    "January 2025",
    "February 2025",
    "March 2025",
    "April 2025",
    "May 2025",
    "June 2025",
    "July 2025",
    "August 2025",
    "September 2025",
    "October 2025",
    "November 2025",
    "December 2025",
  ];

  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);

  function previousMonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
      setSelectedDay(1);
    }
  }

  function nextMonth() {
    if (monthIndex < months.length - 1) {
      setMonthIndex(monthIndex + 1);
      setSelectedDay(1);
    }
  }

  function previousDay() {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  }

  function nextDay() {
    if (selectedDay < 28) {
      setSelectedDay(selectedDay + 1);
    }
  }

  const weekDays = [
    { label: "Mon", number: 15 },
    { label: "Tue", number: 16 },
    { label: "Wed", number: 17 },
    { label: "Thu", number: 18 },
    { label: "Fri", number: 19 },
  ];

  return (
    <div style={page}>
      <div style={monthHeader}>
        <button onClick={previousMonth} style={navBtn}>
          ←
        </button>

        <h1 style={monthTitle}>{months[monthIndex]}</h1>

        <button onClick={nextMonth} style={navBtn}>
          →
        </button>
      </div>

      <div style={dayNavigator}>
        <button onClick={previousDay} style={smallBtn}>
          ← Day
        </button>

        <strong>Day {selectedDay}</strong>

        <button onClick={nextDay} style={smallBtn}>
          Day →
        </button>
      </div>

      <div style={days}>
        {weekDays.map((day) => (
          <div
            key={day.number}
            onClick={() => setSelectedDay(day.number)}
            style={day.number === selectedDay ? selectedDayStyle : dayStyle}
          >
            {day.label}
            <br />
            {day.number}
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
        <ScheduleForDay selectedDay={selectedDay} />
      )}

      <BottomNav navigate={navigate} />
    </div>
  );
}

function ScheduleForDay({ selectedDay }) {
  if (selectedDay === 16) {
    return (
      <div style={timeline}>
        <TimeRow time="9 AM">
          <CourseCard
            title="Stellar Physics"
            location="Bat. B • Salle 12"
            time="9:30 AM — 11:30 AM"
            color="#45c9d8"
          />
        </TimeRow>

        <TimeRow time="10 AM" />
        <TimeRow time="11 AM" />
        <TimeRow time="12 PM" />

        <TimeRow time="1 PM">
          <CourseCard
            title="Stellar Physics"
            location="Cancelled"
            time="1 PM — 3 PM"
            cancelled
          />
        </TimeRow>

        <TimeRow time="2 PM" />
        <TimeRow time="3 PM" />
        <TimeRow time="4 PM" />

        <TimeRow time="5 PM">
          <CourseCard
            title="General relativity"
            location="Bat. A • Salle 1"
            time="5 PM — 6 PM"
          />
        </TimeRow>

        <TimeRow time="6 PM" />
      </div>
    );
  }

  if (selectedDay === 17) {
    return (
      <div style={timeline}>
        <TimeRow time="9 AM">
          <CourseCard
            title="Business Analytics"
            location="Bat. B • Salle 12"
            time="9:30 AM — 11:30 AM"
            color="#00c39a"
          />
        </TimeRow>

        <TimeRow time="10 AM" />
        <TimeRow time="11 AM" />
        <TimeRow time="12 PM" />

        <TimeRow time="1 PM" />
        <TimeRow time="2 PM">
          <CourseCard
            title="Change Management"
            location="Bat. B • Salle 12"
            time="2 PM — 3 PM"
            color="#00c39a"
          />
        </TimeRow>

        <TimeRow time="3 PM" />
        <TimeRow time="4 PM" />
        <TimeRow time="5 PM" />
        <TimeRow time="6 PM" />
      </div>
    );
  }

  return (
    <div style={timeline}>
      <TimeRow time="9 AM" />
      <TimeRow time="10 AM" />
      <TimeRow time="11 AM" />
      <TimeRow time="12 PM" />
      <TimeRow time="1 PM" />
      <TimeRow time="2 PM" />
      <TimeRow time="3 PM" />
      <TimeRow time="4 PM" />
      <TimeRow time="5 PM" />
      <TimeRow time="6 PM" />

      <div style={emptyCard}>
        <h2>No events for this day</h2>
        <p style={{ color: "#6b7190" }}>
          There are no scheduled classes on Day {selectedDay}.
        </p>
      </div>
    </div>
  );
}

function TimeRow({ time, children }) {
  return (
    <div style={timeRow}>
      <div style={timeLabel}>{time}</div>

      <div style={timeContent}>
        {children}
      </div>
    </div>
  );
}

function CourseCard({ title, location, time, color, cancelled }) {
  return (
    <div
      style={{
        ...courseCard,
        border: cancelled
          ? "3px solid #ff6b6b"
          : color
          ? `3px solid ${color}`
          : "1px solid #d4d8e8",
      }}
    >
      <h2 style={{ marginTop: 0 }}>{title}</h2>

      <p style={{ color: cancelled ? "#ff6b6b" : "#596080" }}>
        {location}
      </p>

      <p>{time}</p>
    </div>
  );
}

function BottomNav({ navigate }) {
  return (
    <div style={bottomNav}>
      <div onClick={() => navigate("/app")}>
        𓃑
        <br />
        Dashboard
      </div>

      <div style={{ color: "#111735" }} onClick={() => navigate("/schedule")}>
        🗓️
        <br />
        Schedule
      </div>

      <div onClick={() => navigate("/studies")}>
        🎓
        <br />
        Studies
      </div>

      <div onClick={() => navigate("/help")}>
        ❔
        <br />
        Help
      </div>
    </div>
  );
}

const page = {
  padding: "24px",
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

const monthTitle = {
  fontSize: "28px",
  textAlign: "center",
};

const navBtn = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  border: "1px solid #d4d8e8",
  background: "white",
  fontSize: "20px",
};

const dayNavigator = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const smallBtn = {
  padding: "8px 12px",
  borderRadius: "10px",
  border: "1px solid #d4d8e8",
  background: "white",
};

const days = {
  display: "flex",
  justifyContent: "space-between",
  margin: "35px 0",
  fontSize: "20px",
};

const dayStyle = {
  padding: "12px",
  cursor: "pointer",
  textAlign: "center",
  color: "#596080",
};

const selectedDayStyle = {
  ...dayStyle,
  background: "#081a4a",
  color: "white",
  borderRadius: "15px",
};

const timeline = {
  marginTop: "20px",
};

const timeRow = {
  display: "flex",
  minHeight: "85px",
  borderTop: "1px solid #e4e7f0",
};

const timeLabel = {
  width: "75px",
  fontSize: "18px",
  color: "#8a90a5",
  paddingTop: "16px",
};

const timeContent = {
  flex: 1,
  padding: "10px 0",
};

const courseCard = {
  background: "white",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 4px 18px #ddd",
};

const emptyCard = {
  background: "white",
  borderRadius: "20px",
  padding: "30px",
  boxShadow: "0 4px 18px #ddd",
  textAlign: "center",
  marginTop: "30px",
};

const bottomNav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  background: "white",
  display: "flex",
  justifyContent: "space-around",
  padding: "20px 0",
  boxShadow: "0 -4px 18px #ddd",
  color: "#9aa0b5",
  textAlign: "center",
};

export default Calendar;