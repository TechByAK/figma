import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DesktopCalendar() {
  const navigate = useNavigate();

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

  const [view, setView] = useState("week");
  const [monthIndex, setMonthIndex] = useState(1);
  const [selectedDay, setSelectedDay] = useState(16);

  function nextMonth() {
    if (monthIndex < months.length - 1) {
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
    if (selectedDay < 28) {
      setSelectedDay(selectedDay + 1);
    }
  }

  function previousDay() {
    if (selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    }
  }

  return (
    <div style={{ margin: 0, fontFamily: "Arial", background: "#f5f6fa" }}>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <div style={sidebar}>
          <img src="/images/Frame-desktop.png" style={{ width: "90px" }} />

          <div style={{ marginTop: "60px" }}>
            <p onClick={() => navigate("/app")} style={sideItem}>
              𓃑
              <br />
              Dashboard
            </p>

            <p style={{ ...sideItem, color: "#111735", fontWeight: "bold" }}>
              🗓️
              <br />
              Schedule
            </p>

            <p onClick={() => navigate("/studies")} style={sideItem}>
              🎓
              <br />
              Studies
            </p>

            <p onClick={() => navigate("/help")} style={sideItem}>
              ❔
              <br />
              Help
            </p>
          </div>

          <p
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            style={{ ...sideItem, marginTop: "250px" }}
          >
            ↪
            <br />
            Logout
          </p>
        </div>

        <div style={{ flex: 1, padding: "25px" }}>
          <div style={topbar}>
            <h1 style={{ margin: 0 }}>Hi Naima !</h1>

            <div style={{ display: "flex", gap: "15px" }}>
              <button onClick={() => navigate("/notifications")}>🔔</button>
              <button onClick={() => navigate("/settings")}>⚙️</button>
            </div>
          </div>

          <div style={calendarCard}>
            <div style={calendarHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <button onClick={previousMonth} style={normalBtn}>
                  ←
                </button>

                <h2 style={{ margin: 0 }}>{months[monthIndex]}</h2>

                <button onClick={nextMonth} style={normalBtn}>
                  →
                </button>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
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
                month={months[monthIndex]}
              />
            )}

            {view === "week" && (
              <WeekView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            )}

            {view === "month" && (
              <MonthView selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* DAY VIEW */

function DayView({ selectedDay, nextDay, previousDay, month }) {
  return (
    <div>
      <div style={dayHeader}>
        <button onClick={previousDay} style={normalBtn}>
          ← Previous Day
        </button>

        <h2 style={{ margin: 0 }}>
          Day {selectedDay} — {month}
        </h2>

        <button onClick={nextDay} style={normalBtn}>
          Next Day →
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

function WeekView({ selectedDay, setSelectedDay }) {
  const days = [
    { label: "Mon", number: 15 },
    { label: "Tue", number: 16 },
    { label: "Wed", number: 17 },
    { label: "Thu", number: 18 },
    { label: "Fri", number: 19 },
    { label: "Sat", number: 20 },
    { label: "Sun", number: 21 },
  ];

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
            key={day.number}
            onClick={() => setSelectedDay(day.number)}
            style={day.number === selectedDay ? selectedDayBox : dayCell}
          >
            {day.label}
            <br />
            {day.number}
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

function MonthView({ selectedDay, setSelectedDay }) {
  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div style={{ marginTop: "35px" }}>
      <div style={monthGridHeader}>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      <div style={monthGrid}>
        {days.map((day) => (
          <div
            key={day}
            onClick={() => setSelectedDay(day)}
            style={day === selectedDay ? selectedMonthDay : monthDay}
          >
            <strong>{day}</strong>

            {day === 16 && <p>Stellar Physics</p>}
            {day === 17 && <p>Business Analytics</p>}
            {day === 19 && <p>Stellar Physics</p>}
          </div>
        ))}
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

      <p style={{ margin: "8px 0 0", color: cancelled ? "#ff6b6b" : "#596080" }}>
        {time}
      </p>
    </div>
  );
}

/* STYLES */

const sidebar = {
  width: "120px",
  background: "white",
  textAlign: "center",
  paddingTop: "20px",
};

const sideItem = {
  cursor: "pointer",
  color: "gray",
};

const topbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const calendarCard = {
  background: "white",
  borderRadius: "20px",
  padding: "25px",
  marginTop: "25px",
  boxShadow: "0 4px 18px #ddd",
};

const calendarHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const normalBtn = {
  padding: "8px 18px",
  borderRadius: "8px",
  border: "1px solid #d4d8e8",
  background: "white",
  cursor: "pointer",
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
  color: "#8a90a5",
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
  color: "#596080",
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
  color: "#8a90a5",
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
  color: "#6b7190",
};

export default DesktopCalendar;