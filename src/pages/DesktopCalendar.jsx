import { useState } from "react";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import ScheduleEventForm from "../components/ScheduleEventForm";
import {
  MONTHS_2026,
  WEEKDAY_LABELS,
  getDaysInMonth2026,
  getMondayFirstWeekdayIndex,
  getVisibleWeekDays2026,
} from "../utils/calendar2026";
import {
  SCHEDULE_HOURS,
  clearScheduleForUser,
  deleteScheduleEvent,
  getEventsForDay,
  getEventSpan,
} from "../utils/schedules";

function DesktopCalendar() {
  const user = localStorage.getItem("user") || "guest";
  const [view, setView] = useState("week");
  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scheduleVersion, setScheduleVersion] = useState(0);
  const [editingEvent, setEditingEvent] = useState(null);
  const monthLength = getDaysInMonth2026(monthIndex);

  function selectDay(day) {
    setSelectedDay(day);
    setSelectedEvent(null);
    setEditingEvent(null);
  }

  function nextMonth() {
    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      selectDay(1);
    }
  }

  function previousMonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
      selectDay(1);
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

  function nextWeek() {
    if (selectedDay + 7 <= monthLength) {
      selectDay(selectedDay + 7);
      return;
    }

    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      selectDay(Math.min(7 - (monthLength - selectedDay), getDaysInMonth2026(monthIndex + 1)));
    }
  }

  function previousWeek() {
    if (selectedDay > 7) {
      selectDay(selectedDay - 7);
      return;
    }

    if (monthIndex > 0) {
      const previousMonthIndex = monthIndex - 1;
      const previousMonthLength = getDaysInMonth2026(previousMonthIndex);

      setMonthIndex(previousMonthIndex);
      selectDay(previousMonthLength - (7 - selectedDay));
    }
  }

  return (
    <DesktopLayout>
          <div style={calendarCard}>
            <div style={calendarHeader}>
              <div style={monthControls}>
                <button onClick={previousMonth} style={iconBtn} aria-label="Previous month">
                  <AppIcon name="arrowLeft" size={20} />
                </button>

                <h2 style={monthTitle}>{MONTHS_2026[monthIndex]}</h2>

                <button onClick={nextMonth} style={iconBtn} aria-label="Next month">
                  <AppIcon name="arrowRight" size={20} />
                </button>
              </div>

              <div style={viewControls}>
                <button
                  onClick={() => setView("day")}
                  style={view === "day" ? activeBtn : normalBtn}
                >
                  Day
                </button>

                <button
                  onClick={() => setView("week")}
                  style={view === "week" ? activeBtn : normalBtn}
                >
                  Week
                </button>

                <button
                  onClick={() => setView("month")}
                  style={view === "month" ? activeBtn : normalBtn}
                >
                  Month
                </button>
              </div>
            </div>

            {user !== "guest" && user !== "naima" && (
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

            {view === "day" && (
              <DayView
                key={`day-${scheduleVersion}`}
                selectedDay={selectedDay}
                nextDay={nextDay}
                previousDay={previousDay}
                month={MONTHS_2026[monthIndex]}
                monthIndex={monthIndex}
                onEdit={setEditingEvent}
                onSelect={setSelectedEvent}
                selectedEventId={selectedEvent?.id}
                user={user}
              />
            )}

            {view === "week" && (
              <WeekView
                key={`week-${scheduleVersion}`}
                monthIndex={monthIndex}
                nextWeek={nextWeek}
                previousWeek={previousWeek}
                selectedDay={selectedDay}
                setSelectedDay={selectDay}
                onEdit={setEditingEvent}
                onSelect={setSelectedEvent}
                selectedEventId={selectedEvent?.id}
                user={user}
              />
            )}

            {view === "month" && (
              <MonthView
                key={`month-${scheduleVersion}`}
                monthIndex={monthIndex}
                selectedDay={selectedDay}
                setSelectedDay={selectDay}
                onEdit={setEditingEvent}
                onSelect={setSelectedEvent}
                user={user}
              />
            )}
          </div>
    </DesktopLayout>
  );
}

/* DAY VIEW */

function DayView({ selectedDay, nextDay, previousDay, month, monthIndex, onEdit, onSelect, selectedEventId, user }) {
  const events = getEventsForDay(user, selectedDay, monthIndex);

  return (
    <div>
      <div style={dayHeader}>
        <button onClick={previousDay} style={normalBtn}>
          <AppIcon name="arrowLeft" size={18} />
          <span>Previous Day</span>
        </button>

        <h2 style={{ margin: 0 }}>
          Day {selectedDay} — {month}
        </h2>

        <button onClick={nextDay} style={normalBtn}>
          <span>Next Day</span>
          <AppIcon name="arrowRight" size={18} />
        </button>
      </div>

      <div style={dayTimeline}>
        {SCHEDULE_HOURS.map((hour) => (
          <TimeRow key={hour} time={hour}>
            {events
              .filter((event) => event.startHour === hour)
              .map((event) => (
                <EventCard
                  key={`${event.title}-${event.time}`}
                  title={event.title}
                  time={event.time}
                  location={event.location}
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
          <div style={emptyMessage}>No events scheduled for this day.</div>
        )}
      </div>
    </div>
  );
}

function TimeRow({ time, children }) {
  return (
    <div style={timeRow}>
      <div style={timeLabel}>{time}</div>
      <div style={timeContent}>{children}</div>
    </div>
  );
}

/* WEEK VIEW */

function WeekView({ monthIndex, nextWeek, previousWeek, selectedDay, setSelectedDay, onEdit, onSelect, selectedEventId, user }) {
  const days = getVisibleWeekDays2026(monthIndex, selectedDay);

  return (
    <div style={{ marginTop: "40px" }}>
      <div style={weekNav}>
        <button onClick={previousWeek} style={normalBtn}>
          <AppIcon name="arrowLeft" size={18} />
          <span>Previous Week</span>
        </button>
        <button onClick={nextWeek} style={normalBtn}>
          <span>Next Week</span>
          <AppIcon name="arrowRight" size={18} />
        </button>
      </div>

      <div style={weekDays}>
        <div></div>

        {days.map((day) => (
          <div
            key={`${day.label}-${day.number || "empty"}`}
            onClick={() => day.number && setSelectedDay(day.number)}
            style={day.number === selectedDay ? selectedDayBox : dayCell}
          >
            {day.label}
            <br />
            {day.number || ""}
          </div>
        ))}
      </div>

      <div style={weekGrid}>
        {SCHEDULE_HOURS.map((hour) => (
          <div key={hour} style={gridRow}>
            <div style={gridTime}>{hour}</div>

            {days.map((day) => (
              <div key={`${day.label}-${day.number || "empty"}-${hour}`} style={gridCell}>
                {day.number &&
                  getEventsForDay(user, day.number, monthIndex)
                    .filter((event) => event.startHour === hour)
                    .map((event) => (
                      <EventCard
                        key={`${event.title}-${event.time}`}
                        title={event.title}
                        time={event.cancelled ? "Cancelled" : event.time}
                        location={event.location}
                        color={event.color}
                        cancelled={event.cancelled}
                        event={{ ...event, day: day.number }}
                        span={getEventSpan(event)}
                        selected={selectedEventId === event.id}
                        onEdit={(nextEvent) => {
                          setSelectedDay(day.number);
                          onSelect(nextEvent);
                          onEdit(nextEvent);
                        }}
                        onSelect={(nextEvent) => {
                          setSelectedDay(day.number);
                          onSelect(nextEvent);
                        }}
                      />
                    ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* MONTH VIEW */

function MonthView({ monthIndex, selectedDay, setSelectedDay, onSelect, user }) {
  const monthLength = getDaysInMonth2026(monthIndex);
  const leadingBlanks = getMondayFirstWeekdayIndex(monthIndex, 1);
  const cells = [
    ...Array.from({ length: leadingBlanks }, (_, index) => ({
      type: "blank",
      key: `blank-${index}`,
    })),
    ...Array.from({ length: monthLength }, (_, index) => ({
      type: "day",
      day: index + 1,
      key: `day-${index + 1}`,
    })),
  ];

  return (
    <div style={{ marginTop: "35px" }}>
      <div style={monthGridHeader}>
        {WEEKDAY_LABELS.map((label) => (
          <div key={label}>{label}</div>
        ))}
      </div>

      <div style={monthGrid}>
        {cells.map((cell) => {
          if (cell.type === "blank") {
            return <div key={cell.key} style={blankMonthDay} />;
          }

          const dayEvents = getEventsForDay(user, cell.day, monthIndex);

          return (
            <div
              key={cell.key}
              onClick={() => setSelectedDay(cell.day)}
              style={cell.day === selectedDay ? selectedMonthDay : monthDay}
            >
              <strong style={monthDayNumber}>{cell.day}</strong>

              <div style={monthEvents}>
                {dayEvents.slice(0, 3).map((event) => (
                  <button
                    key={`${event.title}-${event.time}`}
                    onClick={(clickEvent) => {
                      clickEvent.stopPropagation();
                      if (event.custom) {
                        setSelectedDay(cell.day);
                        onSelect({ ...event, day: cell.day });
                      }
                    }}
                    style={{
                      ...monthEventChip,
                      borderLeft: `4px solid ${
                        event.cancelled ? "#ff6b6b" : event.color || "#1f57d6"
                      }`,
                      background: event.cancelled ? "#fff1f1" : "white",
                    }}
                    type="button"
                  >
                    <span style={monthEventTitle}>{event.title}</span>
                    <span
                      style={{
                        ...monthEventTime,
                        color: event.cancelled ? "#d9234f" : "#4d5872",
                      }}
                    >
                      {event.cancelled ? "Cancelled" : event.time}
                    </span>
                    {event.location && (
                      <span style={monthEventLocation}>{event.location}</span>
                    )}
                  </button>
                ))}

                {dayEvents.length > 3 && (
                  <span style={monthMore}>+{dayEvents.length - 3} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* EVENT CARD */

function EventCard({ title, time, location, color, cancelled, event, onEdit, onSelect, selected, span = 1 }) {
  return (
    <div
      onClick={() => event?.custom && onSelect(event)}
      style={{
        ...eventCard,
        height: `${Math.max(1, span) * 92 - 16}px`,
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
          : eventCard.boxShadow,
      }}
    >
      <b style={eventTitle}>{title}</b>

      <p style={{ ...eventText, color: cancelled ? "#ff6b6b" : "#111735" }}>
        {time}
      </p>

      {location && <p style={eventLocation}>{location}</p>}

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

/* STYLES */

const calendarCard = {
  background: "white",
  borderRadius: "26px",
  padding: "25px",
  boxShadow: "0 5px 22px rgba(20, 25, 50, 0.12)",
  minHeight: "calc(100vh - 160px)",
  overflowX: "auto",
};

const calendarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
};

const monthControls = {
  minWidth: "260px",
  display: "flex",
  alignItems: "center",
  gap: "14px",
};

const monthTitle = {
  minWidth: 0,
  margin: 0,
  color: "#111735",
  whiteSpace: "nowrap",
};

const viewControls = {
  display: "flex",
  gap: "10px",
  flexShrink: 0,
};

const normalBtn = {
  minHeight: "40px",
  padding: "0 18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "8px",
  border: "1px solid #d4d8e8",
  background: "white",
  color: "#111735",
  fontWeight: "600",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const iconBtn = {
  ...normalBtn,
  width: "42px",
  padding: 0,
};

const activeBtn = {
  ...normalBtn,
  background: "#081a4a",
  color: "white",
};

const dayHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "35px",
};

const dayTimeline = {
  marginTop: "25px",
};

const timeRow = {
  display: "flex",
  height: "92px",
  borderTop: "1px solid #e4e7f0",
  overflow: "visible",
};

const timeLabel = {
  width: "90px",
  color: "#111735",
  paddingTop: "15px",
};

const timeContent = {
  flex: 1,
  padding: "10px",
  position: "relative",
  overflow: "visible",
};

const weekDays = {
  display: "grid",
  gridTemplateColumns: "80px repeat(7, 1fr)",
  textAlign: "center",
  marginBottom: "20px",
};

const dayCell = {
  padding: "12px",
  color: "#111735",
  cursor: "pointer",
};

const weekNav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "18px",
};

const selectedDayBox = {
  padding: "12px",
  background: "#081a4a",
  color: "white",
  borderRadius: "12px",
  cursor: "pointer",
};

const weekGrid = {
  width: "100%",
};

const gridRow = {
  display: "grid",
  gridTemplateColumns: "80px repeat(7, 1fr)",
  height: "92px",
  borderTop: "1px solid #e4e7f0",
  overflow: "visible",
};

const gridTime = {
  color: "#111735",
  paddingTop: "15px",
};

const gridCell = {
  padding: "8px",
  position: "relative",
  overflow: "visible",
};

const monthGridHeader = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: "10px",
};

const monthGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "10px",
};

const monthDay = {
  minHeight: "178px",
  background: "#f5f6fa",
  borderRadius: "12px",
  padding: "10px",
  cursor: "pointer",
  overflow: "hidden",
};

const blankMonthDay = {
  minHeight: "178px",
};

const monthDayNumber = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  height: "24px",
  color: "#111735",
};

const monthEvents = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginTop: "8px",
};

const monthEventChip = {
  width: "100%",
  minHeight: "42px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "2px",
  padding: "5px 6px 5px 8px",
  border: "1px solid #e3e7f2",
  borderRadius: "8px",
  color: "#111735",
  cursor: "pointer",
  textAlign: "left",
  boxShadow: "0 2px 8px rgba(20, 25, 50, 0.05)",
};

const monthEventTitle = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "12px",
  fontWeight: "800",
  lineHeight: 1.1,
};

const monthEventTime = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "11px",
  fontWeight: "700",
  lineHeight: 1.1,
};

const monthEventLocation = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#006f86",
  fontSize: "10px",
  fontWeight: "800",
  lineHeight: 1.1,
};

const monthMore = {
  display: "block",
  color: "#4d5872",
  fontSize: "11px",
  fontWeight: "800",
  lineHeight: 1.1,
};

const selectedMonthDay = {
  ...monthDay,
  border: "3px solid #081a4a",
  background: "white",
};

const eventCard = {
  background: "white",
  borderRadius: "12px",
  padding: "10px 60px 10px 10px",
  boxShadow: "0 4px 15px #ddd",
  fontSize: "13px",
  position: "absolute",
  left: "8px",
  right: "8px",
  zIndex: 3,
  overflow: "hidden",
};

const eventTitle = {
  display: "block",
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "13px",
  lineHeight: 1.15,
};

const eventText = {
  margin: "2px 0 0",
  color: "#111735",
  fontSize: "12px",
  lineHeight: 1.2,
};

const eventLocation = {
  ...eventText,
  color: "#006f86",
  fontWeight: "800",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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
  cursor: "pointer",
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
};

const scheduleActions = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginBottom: "16px",
};

const clearAllButton = {
  minHeight: "44px",
  border: 0,
  borderRadius: "12px",
  background: "#d9234f",
  color: "white",
  padding: "0 16px",
  fontWeight: "800",
  cursor: "pointer",
};

const emptyMessage = {
  marginTop: "20px",
  background: "#f5f6fa",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  color: "#111735",
};

export default DesktopCalendar;
