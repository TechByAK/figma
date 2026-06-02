import { useState } from "react";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import {
  MONTHS_2026,
  WEEKDAY_LABELS,
  getDaysInMonth2026,
  getMondayFirstWeekdayIndex,
  getVisibleWeekDays2026,
} from "../utils/calendar2026";

function DesktopCalendar() {
  const [view, setView] = useState("week");
  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);

  function nextMonth() {
    if (monthIndex < MONTHS_2026.length - 1) {
      setMonthIndex(monthIndex + 1);
      setSelectedDay(1);
    }
  }

  function previousMonth() {
    if (monthIndex > 0) {
      setMonthIndex(monthIndex - 1);
      setSelectedDay(1);
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

            {view === "day" && (
              <DayView
                selectedDay={selectedDay}
                nextDay={nextDay}
                previousDay={previousDay}
                month={MONTHS_2026[monthIndex]}
              />
            )}

            {view === "week" && (
              <WeekView
                monthIndex={monthIndex}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            )}

            {view === "month" && (
              <MonthView
                monthIndex={monthIndex}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            )}
          </div>
    </DesktopLayout>
  );
}

/* DAY VIEW */

function DayView({ selectedDay, nextDay, previousDay, month }) {
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
        {selectedDay === 16 ? (
          <>
            <TimeRow time="9 AM">
              <EventCard
                title="Stellar Physics"
                time="9:30 AM → 11:30 AM"
                color="#45c9d8"
              />
            </TimeRow>

            <TimeRow time="10 AM" />
            <TimeRow time="11 AM" />
            <TimeRow time="12 PM" />

            <TimeRow time="1 PM">
              <EventCard title="Stellar Physics" time="1 PM → 3 PM" cancelled />
            </TimeRow>

            <TimeRow time="2 PM" />
            <TimeRow time="3 PM" />
            <TimeRow time="4 PM" />

            <TimeRow time="5 PM">
              <EventCard title="General relativity" time="5 PM → 6 PM" />
            </TimeRow>

            <TimeRow time="6 PM" />
          </>
        ) : selectedDay === 17 ? (
          <>
            <TimeRow time="9 AM">
              <EventCard
                title="Business Analytics"
                time="9:30 AM → 11:30 AM"
                color="#00c39a"
              />
            </TimeRow>

            <TimeRow time="10 AM" />
            <TimeRow time="11 AM" />
            <TimeRow time="12 PM" />

            <TimeRow time="1 PM" />
            <TimeRow time="2 PM">
              <EventCard
                title="Change Management"
                time="2 PM → 3 PM"
                color="#00c39a"
              />
            </TimeRow>

            <TimeRow time="3 PM" />
            <TimeRow time="4 PM" />
            <TimeRow time="5 PM" />
            <TimeRow time="6 PM" />
          </>
        ) : (
          <>
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

            <div style={emptyMessage}>No events scheduled for this day.</div>
          </>
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

function WeekView({ monthIndex, selectedDay, setSelectedDay }) {
  const days = getVisibleWeekDays2026(monthIndex, selectedDay);
  const hours = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
  ];

  return (
    <div style={{ marginTop: "40px" }}>
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
        {hours.map((hour) => (
          <div key={hour} style={gridRow}>
            <div style={gridTime}>{hour}</div>

            <div style={gridCell}></div>

            <div style={gridCell}>
              {hour === "9 AM" && (
                <EventCard
                  title="Stellar Physics"
                  time="9:30 AM → 11:30 AM"
                  color="#45c9d8"
                />
              )}

              {hour === "1 PM" && (
                <EventCard title="Stellar Physics" time="Cancelled" cancelled />
              )}

              {hour === "5 PM" && (
                <EventCard title="General relativity" time="5 PM → 6 PM" />
              )}
            </div>

            <div style={gridCell}>
              {hour === "9 AM" && (
                <EventCard
                  title="Business Analytics"
                  time="9:30 AM → 11:30 AM"
                  color="#00c39a"
                />
              )}

              {hour === "2 PM" && (
                <EventCard
                  title="Change Management"
                  time="2 PM → 3 PM"
                  color="#00c39a"
                />
              )}
            </div>

            <div style={gridCell}></div>

            <div style={gridCell}>
              {hour === "1 PM" && (
                <EventCard title="Stellar Physics" time="9:30 AM → 11:30 AM" />
              )}
            </div>

            <div style={gridCell}></div>
            <div style={gridCell}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* MONTH VIEW */

function MonthView({ monthIndex, selectedDay, setSelectedDay }) {
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
        {cells.map((cell) =>
          cell.type === "blank" ? (
            <div key={cell.key} style={blankMonthDay} />
          ) : (
          <div
            key={cell.key}
            onClick={() => setSelectedDay(cell.day)}
            style={cell.day === selectedDay ? selectedMonthDay : monthDay}
          >
            <strong>{cell.day}</strong>

            {cell.day === 16 && <p>Stellar Physics</p>}
            {cell.day === 17 && <p>Business Analytics</p>}
            {cell.day === 19 && <p>Stellar Physics</p>}
          </div>
          )
        )}
      </div>
    </div>
  );
}

/* EVENT CARD */

function EventCard({ title, time, color, cancelled }) {
  return (
    <div
      style={{
        ...eventCard,
        border: cancelled
          ? "3px solid #ff6b6b"
          : color
          ? `3px solid ${color}`
          : "1px solid #d4d8e8",
      }}
    >
      <b>{title}</b>

      <p style={{ margin: "8px 0 0", color: cancelled ? "#ff6b6b" : "#111735" }}>
        {time}
      </p>
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
  minHeight: "80px",
  borderTop: "1px solid #e4e7f0",
};

const timeLabel = {
  width: "90px",
  color: "#111735",
  paddingTop: "15px",
};

const timeContent = {
  flex: 1,
  padding: "10px",
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
  minHeight: "85px",
  borderTop: "1px solid #e4e7f0",
};

const gridTime = {
  color: "#111735",
  paddingTop: "15px",
};

const gridCell = {
  padding: "8px",
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
  minHeight: "100px",
  background: "#f5f6fa",
  borderRadius: "12px",
  padding: "12px",
  cursor: "pointer",
};

const blankMonthDay = {
  minHeight: "100px",
};

const selectedMonthDay = {
  ...monthDay,
  border: "3px solid #081a4a",
  background: "white",
};

const eventCard = {
  background: "white",
  borderRadius: "12px",
  padding: "12px",
  boxShadow: "0 4px 15px #ddd",
  fontSize: "14px",
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
