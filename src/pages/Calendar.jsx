import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import ScheduleEventForm from "../components/ScheduleEventForm";
import { getRoleCopy } from "../utils/users";
import {
  MONTHS_2026,
  getDaysInMonth2026,
  getVisibleWeekDays2026,
} from "../utils/calendar2026";
import {
  SCHEDULE_HOURS,
  clearScheduleForUser,
  deleteScheduleEvent,
  getEventsForDay,
  getEventSpan,
} from "../utils/schedules";

function Calendar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";

  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleVersion, setScheduleVersion] = useState(0);
  const [editingEvent, setEditingEvent] = useState(null);
  const weekDays = getVisibleWeekDays2026(monthIndex, selectedDay);
  const monthLength = getDaysInMonth2026(monthIndex);

  function selectDay(day) {
    setSelectedDay(day);
    setSelectedEvent(null);
    setEditingEvent(null);
  }

  function previousMonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
      selectDay(1);
    }
  }

  function nextMonth() {
    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      selectDay(1);
    }
  }

  function previousDay() {
    if (selectedDay > 1) {
      selectDay(selectedDay - 1);
      return;
    }

    if (monthIndex > 0) {
      const previousMonthIndex = monthIndex - 1;

      setMonthIndex(previousMonthIndex);
      selectDay(getDaysInMonth2026(previousMonthIndex));
    }
  }

  function nextDay() {
    const monthLength = getDaysInMonth2026(monthIndex);

    if (selectedDay < monthLength) {
      selectDay(selectedDay + 1);
      return;
    }

    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      selectDay(1);
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
            onClick={() => day.number && selectDay(day.number)}
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
        <>
          {user !== "naima" && (
            <>
              <ScheduleEventForm
                key={editingEvent?.id || "new"}
                day={selectedDay}
                editingEvent={editingEvent}
                monthIndex={monthIndex}
                monthLength={monthLength}
                user={user}
                onCancelEdit={() => {
                  setEditingEvent(null);
                  setSelectedEvent(null);
                }}
                onAdded={() => {
                  setEditingEvent(null);
                  setSelectedEvent(null);
                  setScheduleVersion((version) => version + 1);
                }}
              />
              <div style={scheduleActions}>
                <button
                  style={clearButton}
                  onClick={() => {
                    if (!selectedEvent) {
                      return;
                    }

                    deleteScheduleEvent(user, selectedEvent.day || selectedDay, selectedEvent.id, monthIndex);
                    setSelectedEvent(null);
                    setEditingEvent(null);
                    setScheduleVersion((version) => version + 1);
                  }}
                  disabled={!selectedEvent}
                >
                  <AppIcon name="trash" size={21} />
                </button>
                <button
                  style={clearAllButton}
                  onClick={() => {
                    clearScheduleForUser(user);
                    setSelectedEvent(null);
                    setEditingEvent(null);
                    setScheduleVersion((version) => version + 1);
                  }}
                >
                  Clear all
                </button>
              </div>
            </>
          )}
          <ScheduleForDay
            key={`${selectedDay}-${scheduleVersion}`}
            onEdit={setEditingEvent}
            onSelect={setSelectedEvent}
            selectedEventId={selectedEvent?.id}
            selectedDay={selectedDay}
            monthIndex={monthIndex}
            user={user}
          />
        </>
      )}

      <BottomNav navigate={navigate} />
    </div>
  );
}

function ScheduleForDay({ monthIndex, onEdit, onSelect, selectedEventId, selectedDay, user }) {
  const events = getEventsForDay(user, selectedDay, monthIndex);

  return (
    <div style={timeline}>
      {SCHEDULE_HOURS.map((hour) => (
        <TimeRow key={hour} time={hour}>
          {events
            .filter((event) => event.startHour === hour)
            .map((event) => (
              <CourseCard
                key={`${event.title}-${event.time}`}
                title={event.title}
                location={event.location}
                time={event.time}
                color={event.color}
                cancelled={event.cancelled}
                event={{ ...event, day: selectedDay }}
                span={getEventSpan(event)}
                onEdit={onEdit}
                onSelect={onSelect}
                selected={selectedEventId === event.id}
              />
            ))}
        </TimeRow>
      ))}

      {events.length === 0 && (
        <div style={emptyCard}>
          <h2>No events for this day</h2>
          <p style={{ color: "#111735" }}>
            There are no scheduled classes on Day {selectedDay}.
          </p>
        </div>
      )}
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

function CourseCard({ title, location, time, color, cancelled, event, onEdit, onSelect, selected, span }) {
  return (
    <div
      onClick={() => event?.custom && onSelect(event)}
      style={{
        ...courseCard,
        height: `${Math.max(1, span) * 85 - 16}px`,
        top: "8px",
        border: selected
          ? "3px solid #081a4a"
          : cancelled
          ? "3px solid #ff6b6b"
          : color
          ? `3px solid ${color}`
          : "1px solid #d4d8e8",
        boxShadow: selected
          ? "0 0 0 4px rgba(8, 26, 74, 0.12)"
          : courseCard.boxShadow,
      }}
    >
      <h2 style={eventTitle}>{title}</h2>

      <p style={{ ...eventText, color: cancelled ? "#ff6b6b" : "#111735" }}>
        {location}
      </p>

      <p style={eventText}>{time}</p>

      {event?.custom && (
        <button
          style={editButton}
          onClick={(clickEvent) => {
            clickEvent.stopPropagation();
            onSelect(event);
            onEdit(event);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}

function BottomNav({ navigate }) {
  const roleCopy = getRoleCopy();

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
        <span>{roleCopy.studiesLabel}</span>
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
  paddingBottom: "150px",
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
  height: "85px",
  borderTop: "1px solid #e4e7f0",
  overflow: "visible",
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
  position: "relative",
  overflow: "visible",
};

const courseCard = {
  background: "white",
  borderRadius: "18px",
  padding: "10px 64px 10px 12px",
  boxShadow: "0 4px 18px #ddd",
  position: "absolute",
  left: 0,
  right: 0,
  zIndex: 2,
  overflow: "hidden",
  cursor: "pointer",
};

const eventTitle = {
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.15,
};

const eventText = {
  margin: "2px 0",
  color: "#111735",
  fontSize: "13px",
  lineHeight: 1.2,
};

const editButton = {
  position: "absolute",
  top: "8px",
  right: "8px",
  border: 0,
  borderRadius: "10px",
  background: "#081a4a",
  color: "white",
  padding: "6px 10px",
  fontSize: "12px",
  fontWeight: "800",
  zIndex: 4,
};

const clearButton = {
  width: "48px",
  height: "48px",
  minHeight: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: 0,
  border: "1px solid #ff5757",
  borderRadius: "50%",
  background: "white",
  color: "#d9234f",
  fontWeight: "800",
  cursor: "pointer",
  opacity: 1,
};

const scheduleActions = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginBottom: "14px",
};

const clearAllButton = {
  minHeight: "44px",
  border: 0,
  borderRadius: "12px",
  background: "#d9234f",
  color: "white",
  padding: "0 16px",
  fontWeight: "800",
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
  zIndex: 100,
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
  color: "#00337a",
  fontWeight: "800",
  background: "#eef4ff",
  borderRadius: "14px",
  margin: "0 6px",
  padding: "6px 0",
};

export default Calendar;
