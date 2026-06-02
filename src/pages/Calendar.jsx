import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import {
  MONTHS_2026,
  getDaysInMonth2026,
  getVisibleWeekDays2026,
} from "../utils/calendar2026";

function Calendar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);
  const weekDays = getVisibleWeekDays2026(monthIndex, selectedDay);

  function previousMonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
      setSelectedDay(1);
    }
  }

  function nextMonth() {
    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      setSelectedDay(1);
    }
  }

  function previousDay() {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
      return;
    }

    if (monthIndex > 0) {
      const previousMonthIndex = monthIndex - 1;

      setMonthIndex(previousMonthIndex);
      setSelectedDay(getDaysInMonth2026(previousMonthIndex));
    }
  }

  function nextDay() {
    const monthLength = getDaysInMonth2026(monthIndex);

    if (selectedDay < monthLength) {
      setSelectedDay(selectedDay + 1);
      return;
    }

    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      setSelectedDay(1);
    }
  }

  return (
    <div style={page}>
      <div style={monthHeader}>
        <button onClick={previousMonth} style={navBtn}>
          <AppIcon name="arrowLeft" size={20} />
        </button>

        <h1 style={monthTitle}>{MONTHS_2026[monthIndex]}</h1>

        <button onClick={nextMonth} style={navBtn}>
          <AppIcon name="arrowRight" size={20} />
        </button>
      </div>

      <div style={dayNavigator}>
        <button onClick={previousDay} style={smallBtn}>
          <AppIcon name="arrowLeft" size={17} />
          <span>Day</span>
        </button>

        <strong>Day {selectedDay}</strong>

        <button onClick={nextDay} style={smallBtn}>
          <span>Day</span>
          <AppIcon name="arrowRight" size={17} />
        </button>
      </div>

      <div style={days}>
        {weekDays.map((day) => (
          <button
            key={`${day.label}-${day.number || "empty"}`}
            onClick={() => day.number && setSelectedDay(day.number)}
            style={
              day.number === selectedDay
                ? selectedDayStyle
                : day.number
                ? dayStyle
                : emptyDayStyle
            }
            disabled={!day.number}
          >
            {day.label}
            <br />
            {day.number || ""}
          </button>
        ))}
      </div>

      {user === "guest" ? (
        <div style={emptyCard}>
          <h2>No schedule available</h2>
          <p style={{ color: "#111735" }}>
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
        <p style={{ color: "#111735" }}>
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

      <p style={{ color: cancelled ? "#ff6b6b" : "#111735" }}>
        {location}
      </p>

      <p>{time}</p>
    </div>
  );
}

function BottomNav({ navigate }) {
  return (
    <div style={bottomNav}>
      <div style={navItem} onClick={() => navigate("/app")}>
        <AppIcon name="dashboard" size={22} />
        <span>Dashboard</span>
      </div>

      <div style={activeNavItem} onClick={() => navigate("/schedule")}>
        <AppIcon name="calendar" size={22} />
        <span>Schedule</span>
      </div>

      <div style={navItem} onClick={() => navigate("/studies")}>
        <AppIcon name="school" size={22} />
        <span>Studies</span>
      </div>

      <div style={navItem} onClick={() => navigate("/help")}>
        <AppIcon name="help" size={22} />
        <span>Help</span>
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
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  border: "1px solid #d4d8e8",
  background: "white",
  color: "#111735",
};

const dayNavigator = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const smallBtn = {
  minHeight: "38px",
  padding: "0 12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  borderRadius: "10px",
  border: "1px solid #d4d8e8",
  background: "white",
  color: "#111735",
  fontWeight: "600",
};

const days = {
  display: "grid",
  gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
  gap: "4px",
  margin: "35px 0",
  fontSize: "16px",
};

const dayStyle = {
  minHeight: "58px",
  padding: "8px 4px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  border: 0,
  background: "transparent",
  cursor: "pointer",
  textAlign: "center",
  color: "#111735",
  font: "inherit",
};

const selectedDayStyle = {
  ...dayStyle,
  background: "#081a4a",
  color: "white",
  borderRadius: "15px",
};

const emptyDayStyle = {
  ...dayStyle,
  cursor: "default",
  color: "#111735",
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
  color: "#111735",
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
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  padding: "14px 0 16px",
  boxShadow: "0 -4px 18px #ddd",
  color: "#111735",
  textAlign: "center",
};

const navItem = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const activeNavItem = {
  ...navItem,
  color: "#111735",
};

export default Calendar;
