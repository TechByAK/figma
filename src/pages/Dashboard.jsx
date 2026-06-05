import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import { getWeekdayName2026 } from "../utils/calendar2026";
import { getRoleCopy } from "../utils/users";
import { getScheduleForUser } from "../utils/schedules";

function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user") || "guest";
  const roleCopy = getRoleCopy(user);
  const courses = getDashboardCourses(user);
  const [activeFeed, setActiveFeed] = useState("events");
  const previewNews = getPreviewNews(user, roleCopy.newsLifeTitle);

  return (
    <DesktopLayout>
          <div style={dashboardCard}>

            {/* Next course */}
            <div style={nextCourseBox}>
              <h2 style={sectionTitle}>Next course</h2>

              {courses.length === 0 ? (
                <div style={emptyCourse}>
                  <AppIcon name="calendar" size={42} color="#111735" />
                  <h3>No schedule available</h3>
                  <p>Add an item from the calendar to build this schedule.</p>
                </div>
              ) : (
                courses.map((course) => (
                  <Course key={`${course.title}-${course.time}`} course={course} />
                ))
              )}
            </div>

            {/* Events */}
            <div style={eventsBox}>
              <div style={eventsHeader}>
                <div style={tabs}>
                  <h2
                    onClick={() => setActiveFeed("events")}
                    style={activeFeed === "events" ? activeTab : inactiveTab}
                  >
                    Events
                  </h2>

                  <h2
                    onClick={() => setActiveFeed("news")}
                    style={activeFeed === "news" ? activeTab : inactiveTab}
                  >
                    News
                  </h2>
                </div>

                <h3
                  onClick={() => navigate(activeFeed === "events" ? "/news?category=Events" : "/news")}
                  style={seeAll}
                >
                  See All
                </h3>
              </div>

              {activeFeed === "events" ? (
                <>
                  <EventImage src="/images/event1.png" />
                  <EventImage src="/images/event2.png" />
                  <EventImage src="/images/event3.png" />
                </>
              ) : (
                <div style={previewGrid}>
                  {previewNews.map((story) => (
                    <PreviewNewsCard key={story.title} story={story} />
                  ))}
                </div>
              )}
            </div>

            {/* Welcome */}
            <div style={welcomeBox}>
              <h2 style={welcomeTitle}>
                Welcome to Rennes School of Business !
              </h2>

              <p style={welcomeText}>
                {roleCopy.welcomeText}
              </p>

              <button style={blueButton} onClick={() => navigate("/campus-map")}>
                <AppIcon name="map" size={21} />
                <span>Campus map</span>
              </button>
              <button style={cyanButton} onClick={() => navigate("/school-services")}>
                <AppIcon name="school" size={21} />
                <span>School services</span>
              </button>
            </div>

          </div>
    </DesktopLayout>
  );
}

function PreviewNewsCard({ story }) {
  return (
    <article style={previewCard}>
      <span style={{ ...previewIcon, color: story.color, background: story.tint }}>
        <AppIcon name={story.icon} size={20} />
      </span>
      <div style={{ minWidth: 0 }}>
        <p style={previewCategory}>{story.category}</p>
        <h3 style={previewTitle}>{story.title}</h3>
        <p style={previewText}>{story.text}</p>
      </div>
    </article>
  );
}

function getPreviewNews(user, newsLifeTitle) {
  if (user === "professor") {
    return [
      { category: "Faculty", icon: "presentation", color: "#1f57d6", tint: "#eef4ff", title: newsLifeTitle, text: "Teaching updates and seminar reminders are ready." },
      { category: "Research", icon: "bookOpen", color: "#915900", tint: "#fff3d9", title: "Research seminar series", text: "Faculty research sessions continue this month." },
      { category: "Campus", icon: "mapPin", color: "#006f86", tint: "#e8faff", title: "Campus services", text: "Check faculty support and classroom services." },
    ];
  }

  if (user === "staff") {
    return [
      { category: "Staff", icon: "briefcase", color: "#1f57d6", tint: "#eef4ff", title: newsLifeTitle, text: "Internal events and department reminders are available." },
      { category: "Operations", icon: "building", color: "#915900", tint: "#fff3d9", title: "Campus operations update", text: "Facilities and room preparation updates are ready." },
      { category: "Services", icon: "school", color: "#7a0b4f", tint: "#fde6f3", title: "Department services", text: "Staff service contacts are grouped in one place." },
    ];
  }

  return [
    { category: "Student Life", icon: "users", color: "#1f57d6", tint: "#eef4ff", title: newsLifeTitle, text: "Campus activities and association updates are available." },
    { category: "Career", icon: "briefcase", color: "#915900", tint: "#fff3d9", title: "Career center appointments", text: "Book CV reviews and internship coaching." },
    { category: "Campus", icon: "mapPin", color: "#006f86", tint: "#e8faff", title: "Campus access", text: "Use the map to find services and key areas." },
  ];
}

function getDashboardCourses(user) {
  const schedule = getScheduleForUser(user);
  const seenCourses = new Set();

  return Object.entries(schedule)
    .sort(([firstDay], [secondDay]) => Number(firstDay) - Number(secondDay))
    .flatMap(([day, events]) =>
      events.map((event) => ({
        title: event.title,
        day,
        weekday: getWeekdayName2026(1, Number(day)),
        time: event.cancelled ? "Cancelled" : event.time,
        location: event.location,
        color: event.cancelled ? "#ff6b6b" : event.color || "#1f57d6",
        cancelled: event.cancelled,
      }))
    )
    .filter((course) => {
      const courseKey = `${course.title}-${course.time}-${course.location || ""}`;

      if (seenCourses.has(courseKey)) {
        return false;
      }

      seenCourses.add(courseKey);
      return true;
    })
    .slice(0, 3);
}

function Course({ course }) {
  return (
    <div
      style={{
        ...courseCard,
        borderLeft: `5px solid ${course.color}`,
        background: course.cancelled ? "#fff1f1" : "white",
      }}
    >
      <span style={{ ...courseIcon, color: course.color, background: getCourseTint(course.color) }}>
        <AppIcon name="calendar" size={20} />
      </span>

      <div style={courseText}>
        <b style={courseTitle}>{course.title}</b>
        <span style={courseMeta}>
          {course.weekday} {course.day} • {course.time}
        </span>
        {course.location && <span style={courseLocation}>{course.location}</span>}
      </div>
    </div>
  );
}

function getCourseTint(color) {
  if (color === "#ff6b6b") return "#fff1f1";
  if (color === "#915900") return "#fff3d9";
  if (color === "#7a0b4f") return "#fde6f3";
  if (color === "#006f86") return "#e8faff";
  return "#eef4ff";
}

function EventImage({ src }) {
  return (
    <img
      src={src}
      style={{
        width: "100%",
        height: "145px",
        objectFit: "cover",
        borderRadius: "16px",
        marginTop: "24px",
        display: "block",
      }}
    />
  );
}

/* STYLES */

const dashboardCard = {
  background: "white",
  borderRadius: "26px",
  padding: "24px",
  boxShadow: "0 5px 22px #ddd",
  display: "grid",
  gridTemplateColumns:
    "minmax(240px, 0.8fr) minmax(360px, 1.5fr) minmax(230px, 0.8fr)",
  gap: "22px",
  width: "100%",
  minHeight: "calc(100vh - 160px)",
  boxSizing: "border-box",
};

const nextCourseBox = {
  background: "#f3f4f8",
  borderRadius: "20px",
  padding: "20px",
  minHeight: "520px",
  boxSizing: "border-box",
};

const sectionTitle = {
  textAlign: "center",
  color: "#111735",
  marginTop: 0,
};

const emptyCourse = {
  background: "white",
  padding: "28px",
  borderRadius: "18px",
  textAlign: "center",
  color: "#111735",
  marginTop: "25px",
};

const courseCard = {
  minWidth: 0,
  background: "white",
  padding: "13px 14px",
  border: "1px solid #e3e7f2",
  borderRadius: "14px",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  boxShadow: "0 4px 14px rgba(20,25,50,0.08)",
};

const courseIcon = {
  width: "42px",
  height: "42px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
};

const courseText = {
  minWidth: 0,
  display: "grid",
  gap: "3px",
};

const courseTitle = {
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const courseMeta = {
  color: "#4d5872",
  fontSize: "12px",
  fontWeight: "800",
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const courseLocation = {
  color: "#006f86",
  fontSize: "12px",
  fontWeight: "800",
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const eventsBox = {
  minWidth: 0,
};

const eventsHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const tabs = {
  display: "flex",
  gap: "28px",
};

const activeTab = {
  borderBottom: "4px solid #111735",
  margin: 0,
};

const inactiveTab = {
  color: "#111735",
  margin: 0,
  cursor: "pointer",
};

const seeAll = {
  color: "#00a8c8",
  cursor: "pointer",
  margin: 0,
  fontSize: "18px",
};

const previewGrid = {
  display: "grid",
  gap: "14px",
  marginTop: "24px",
};

const previewCard = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  background: "#f5f6fa",
  borderRadius: "16px",
  padding: "15px",
  textAlign: "center",
  boxShadow: "0 4px 14px rgba(20,25,50,0.1)",
};

const previewIcon = {
  width: "42px",
  height: "42px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
};

const previewCategory = {
  margin: "0 0 5px",
  color: "#1f57d6",
  fontSize: "13px",
  fontWeight: "800",
};

const previewTitle = {
  margin: "0 0 5px",
  color: "#111735",
  fontSize: "17px",
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const previewText = {
  margin: 0,
  color: "#111735",
  fontSize: "14px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const welcomeBox = {
  background: "white",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 5px 20px #ddd",
  textAlign: "center",
  minHeight: "520px",
  boxSizing: "border-box",
};

const welcomeTitle = {
  color: "#111735",
  lineHeight: "1.3",
  fontSize: "22px",
};

const welcomeText = {
  color: "#111735",
  fontSize: "16px",
  lineHeight: "1.6",
  marginTop: "28px",
};

const blueButton = {
  width: "100%",
  marginTop: "38px",
  minHeight: "58px",
  padding: "0 18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  fontSize: "17px",
  borderRadius: "18px",
  border: "none",
  background: "#081a4a",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 5px 18px rgba(8,26,74,0.25)",
  whiteSpace: "nowrap",
};

const cyanButton = {
  ...blueButton,
  marginTop: "20px",
  background: "#00a8c8",
};

export default Dashboard;
