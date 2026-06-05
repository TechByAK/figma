import { useState } from "react";
import {
  SCHEDULE_HOURS,
  addScheduleEvent,
  getNextHour,
  updateScheduleEvent,
} from "../utils/schedules";

const ROLE_COPY = {
  student: {
    action: "Add course",
    title: "Course name",
    location: "Room or building",
  },
  professor: {
    action: "Add class",
    title: "Class name",
    location: "Room or building",
  },
  staff: {
    action: "Add task",
    title: "Task name",
    location: "Building location",
  },
};

function ScheduleEventForm({ day, editingEvent, monthLength, onAdded, onCancelEdit, user }) {
  const copy = ROLE_COPY[user];
  const [isOpen, setIsOpen] = useState(Boolean(editingEvent));
  const [title, setTitle] = useState(editingEvent?.title || copy?.title || "");
  const [location, setLocation] = useState(editingEvent?.location || "");
  const [startHour, setStartHour] = useState(editingEvent?.startHour || "9 AM");
  const [endTime, setEndTime] = useState(
    editingEvent?.endHour || getEndTime(editingEvent?.time) || "10 AM"
  );
  const [repeatWeekly, setRepeatWeekly] = useState(false);

  if (!copy) {
    return null;
  }

  if (!isOpen) {
    return (
      <button style={openButton} onClick={() => setIsOpen(true)}>
        <span style={openIcon}>+</span>
        <span>{copy.action}</span>
      </button>
    );
  }

  function submitEvent(event) {
    event.preventDefault();

    const nextEvent = {
      title: title.trim() || copy.title,
      location: location.trim() || copy.location,
      time: `${startHour} — ${endTime}`,
      startHour,
      endHour: endTime,
    };

    if (editingEvent) {
      updateScheduleEvent(user, editingEvent.day || day, editingEvent.id, nextEvent);
      onCancelEdit?.();
    } else {
      addScheduleEvent(user, day, nextEvent, {
        monthLength,
        repeatWeekly,
      });
    }

    setTitle(copy.title);
    setLocation("");
    setStartHour("9 AM");
    setEndTime("10 AM");
    setRepeatWeekly(false);
    setIsOpen(false);
    onAdded();
  }

  return (
    <div style={panelOverlay}>
      <button
        aria-label="Close schedule panel"
        onClick={() => {
          if (editingEvent) {
            onCancelEdit?.();
          } else {
            setIsOpen(false);
          }
        }}
        style={panelBackdrop}
        type="button"
      />

      <form onSubmit={submitEvent} style={form}>
        <div style={formHeader}>
          <div>
            <p style={eyebrow}>{editingEvent ? "Edit schedule" : "Schedule item"}</p>
            <h2 style={heading}>{editingEvent ? "Edit item" : copy.action}</h2>
          </div>
          <button
            aria-label="Close form"
            style={minimizeButton}
            type="button"
            onClick={() => {
              if (editingEvent) {
                onCancelEdit?.();
              } else {
                setIsOpen(false);
              }
            }}
          >
            ×
          </button>
        </div>

        <div style={grid}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            style={input}
            placeholder={copy.title}
          />
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            style={input}
            placeholder={copy.location}
          />
          <select
            value={startHour}
            onChange={(event) => {
              setStartHour(event.target.value);
              setEndTime(getNextHour(event.target.value));
            }}
            style={input}
          >
            {SCHEDULE_HOURS.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={endTime}
            onChange={(event) => setEndTime(event.target.value)}
            style={input}
          >
            {SCHEDULE_HOURS.filter((hour) => {
              return SCHEDULE_HOURS.indexOf(hour) > SCHEDULE_HOURS.indexOf(startHour);
            }).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
        </div>

        {!editingEvent && (
          <label style={checkRow}>
            <input
              checked={repeatWeekly}
              onChange={(event) => setRepeatWeekly(event.target.checked)}
              type="checkbox"
            />
            <span>Save this schedule for all weeks</span>
          </label>
        )}

        <button style={button} type="submit">
          {editingEvent ? "Save changes" : copy.action}
        </button>

        {editingEvent && (
          <button style={secondaryButton} type="button" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}

      </form>
    </div>
  );
}

function getEndTime(time) {
  return time?.split("—")[1]?.trim();
}

const form = {
  position: "fixed",
  top: 0,
  right: 0,
  zIndex: 121,
  width: "min(92vw, 390px)",
  height: "100vh",
  overflowY: "auto",
  background: "white",
  padding: "22px 18px",
  boxShadow: "-8px 0 28px rgba(20, 25, 50, 0.22)",
};

const panelOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 120,
};

const panelBackdrop = {
  position: "absolute",
  inset: 0,
  border: 0,
  background: "rgba(8, 26, 74, 0.32)",
  cursor: "pointer",
};

const openButton = {
  width: "100%",
  minHeight: "50px",
  margin: "18px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  border: 0,
  borderRadius: "14px",
  background: "#081a4a",
  color: "white",
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
};

const openIcon = {
  width: "26px",
  height: "26px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  background: "rgba(255, 255, 255, 0.18)",
  fontSize: "22px",
  lineHeight: 1,
};

const formHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  marginBottom: "18px",
};

const eyebrow = {
  margin: "0 0 4px",
  color: "#1f57d6",
  fontSize: "13px",
  fontWeight: "900",
};

const heading = {
  margin: 0,
  color: "#111735",
  fontSize: "20px",
};

const minimizeButton = {
  width: "34px",
  height: "34px",
  flexShrink: 0,
  border: "1px solid #d4d8e8",
  borderRadius: "50%",
  background: "white",
  color: "#081a4a",
  fontSize: "22px",
  fontWeight: "900",
  lineHeight: 1,
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "10px",
};

const input = {
  minWidth: 0,
  minHeight: "44px",
  border: "1px solid #d4d8e8",
  borderRadius: "12px",
  padding: "0 12px",
  color: "#111735",
  background: "white",
  fontSize: "15px",
  fontWeight: "600",
};

const button = {
  width: "100%",
  minHeight: "46px",
  marginTop: "12px",
  border: 0,
  borderRadius: "12px",
  background: "#081a4a",
  color: "white",
  fontSize: "16px",
  fontWeight: "800",
  cursor: "pointer",
};

const secondaryButton = {
  ...button,
  marginTop: "8px",
  background: "white",
  color: "#081a4a",
  border: "1px solid #d4d8e8",
};

const checkRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "12px",
  color: "#111735",
  fontWeight: "700",
};

export default ScheduleEventForm;
