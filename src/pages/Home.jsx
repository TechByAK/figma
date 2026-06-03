import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import { getCurrentProfile, getRoleCopy } from "../utils/users";
import { getEventsForDay } from "../utils/schedules";

function Home() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") || "guest";
  const profileData = getCurrentProfile();
  const roleCopy = getRoleCopy(user);
  const nextEvent = getEventsForDay(user, 16)[0];
  const unreadCount = getUnreadNotificationCount(user);
  const urgentCount = getUrgentNotificationCount(user);
  const [activeFeed, setActiveFeed] = useState("events");
  const previewNews = getPreviewNews(user, roleCopy.newsLifeTitle);

  return (
    <div style={page}>
      <div style={header}>
        <div style={profile}>
          <img src={profileData.avatar} style={avatarStyle} />
          <div>
            <p style={{ margin: 0, color: "#111735", fontSize: "22px" }}>Hi</p>
            <h1 style={nameTitle}>{profileData.name}!</h1>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button style={circleBtn} onClick={() => navigate("/notifications")} aria-label="Notifications">
            <AppIcon name="bell" size={23} />
            {unreadCount > 0 && <span style={unreadBadgeStyle}>{unreadCount}</span>}
            {urgentCount > 0 && <span style={urgentBadgeStyle}>{urgentCount}</span>}
          </button>
          <button style={circleBtn} onClick={() => navigate("/settings")} aria-label="Settings">
            <AppIcon name="settings" size={23} />
          </button>
        </div>
      </div>

      <div style={cardsWrapper}>
        {nextEvent ? (
          <div style={courseCard}>
            <div style={dateBox}>
              <div>Tue</div>
              <strong>16</strong>
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>{nextEvent.title}</h2>
              <p style={{ color: "#007c8c" }}>{nextEvent.location}</p>
              <p>{nextEvent.time}</p>
            </div>
          </div>
        ) : (
          <div style={courseCard}>
            <div style={{ flex: 1 }}>
              <h2 style={{ margin: 0 }}>No upcoming schedule</h2>
              <p>Guest users do not have a personal schedule.</p>
            </div>
          </div>
        )}

        <div style={welcomeCard}>
          <h2>Welcome to Rennes School of Business!</h2>
          <p style={{ color: "#111735" }}>
            {roleCopy.welcomeText}
          </p>
          <div style={welcomeActions}>
            <button style={welcomeButton} onClick={() => navigate("/campus-map")}>
              <span style={welcomeButtonIcon}>
                <AppIcon name="map" size={20} />
              </span>
              <span style={welcomeButtonText}>
                <span style={welcomeButtonTitle}>Campus map</span>
                <span style={welcomeButtonSubtitle}>Find buildings</span>
              </span>
            </button>

            <button style={welcomeButton} onClick={() => navigate("/school-services")}>
              <span style={welcomeButtonIcon}>
                <AppIcon name="school" size={20} />
              </span>
              <span style={welcomeButtonText}>
                <span style={welcomeButtonTitle}>Services</span>
                <span style={welcomeButtonSubtitle}>Contacts & help</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <div style={eventsHeader}>
        <div style={eventTabs}>
          <h2
            style={activeFeed === "events" ? activeEventTab : eventTab}
            onClick={() => setActiveFeed("events")}
          >
            Events
          </h2>
          <h2
            style={activeFeed === "news" ? activeEventTab : eventTab}
            onClick={() => setActiveFeed("news")}
          >
            News
          </h2>
        </div>

        <button
          style={seeAllButton}
          onClick={() => navigate(activeFeed === "events" ? "/news?category=Events" : "/news")}
        >
          See All
        </button>
      </div>

      {activeFeed === "events" ? (
        <>
          <img src="/images/event1.png" style={eventImg} />
          <img src="/images/event2.png" style={eventImg} />
        </>
      ) : (
        <div style={previewGrid}>
          {previewNews.map((story) => (
            <PreviewNewsCard key={story.title} story={story} />
          ))}
        </div>
      )}

      <BottomNav navigate={navigate} active="home" />
    </div>
  );
}

function getUnreadNotificationCount(user) {
  try {
    const readIds = JSON.parse(localStorage.getItem(`readNotifications:${user}`)) || [];
    return Math.max(0, 4 - readIds.length);
  } catch {
    return 4;
  }
}

function getUrgentNotificationCount(user) {
  try {
    return (JSON.parse(localStorage.getItem(`urgentNotifications:${user}`)) || []).length;
  } catch {
    return 0;
  }
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
    ];
  }

  if (user === "staff") {
    return [
      { category: "Staff", icon: "briefcase", color: "#1f57d6", tint: "#eef4ff", title: newsLifeTitle, text: "Internal events and department reminders are available." },
      { category: "Operations", icon: "building", color: "#915900", tint: "#fff3d9", title: "Campus operations update", text: "Facilities and room preparation updates are ready." },
    ];
  }

  return [
    { category: "Student Life", icon: "users", color: "#1f57d6", tint: "#eef4ff", title: newsLifeTitle, text: "Campus activities and association updates are available." },
    { category: "Career", icon: "briefcase", color: "#915900", tint: "#fff3d9", title: "Career center appointments", text: "Book CV reviews and internship coaching." },
  ];
}

function BottomNav({ navigate }) {
  const roleCopy = getRoleCopy();

  return (
    <div style={bottomNav}>

      <div
        style={activeNav}
        onClick={() => {
          if (window.innerWidth >= 900) {
            navigate("/dashboard");
          } else {
            navigate("/app");
          }
        }}
      >
        <AppIcon name="dashboard" size={22} />
        <span>Dashboard</span>
      </div>

      <div style={navItem} onClick={() => navigate("/schedule")}>
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

const page = { padding: "32px", paddingBottom: "120px", minHeight: "100vh", background: "white", fontFamily: "Arial" };
const header = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" };
const profile = { display: "flex", alignItems: "center", gap: "15px" };
const avatarStyle = { width: "58px", height: "58px", borderRadius: "50%" };
const circleBtn = { position: "relative", border: "none", background: "#f4f5f8", borderRadius: "50%", width: "55px", height: "55px", color: "#111735", display: "inline-flex", alignItems: "center", justifyContent: "center" };
const nameTitle = { margin: 0, color: "#111735", overflowWrap: "anywhere", lineHeight: 1.1 };
const badgeStyle = { position: "absolute", minWidth: "18px", height: "18px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", border: "2px solid white", color: "white", fontSize: "10px", fontWeight: "900", lineHeight: 1, padding: "0 4px" };
const unreadBadgeStyle = { ...badgeStyle, top: "3px", right: "3px", background: "#1f57d6" };
const urgentBadgeStyle = { ...badgeStyle, bottom: "3px", right: "3px", background: "#ff5757" };
const cardsWrapper = { background: "#f4f4f6", padding: "16px", borderRadius: "28px", marginBottom: "60px" };
const courseCard = { background: "white", borderRadius: "18px", padding: "16px", display: "flex", gap: "20px", alignItems: "center", boxShadow: "0 4px 15px #ddd" };
const dateBox = { background: "#fde6f3", borderRadius: "12px", padding: "18px", textAlign: "center", color: "#7a0b4f", fontSize: "20px" };
const welcomeCard = { background: "white", borderRadius: "18px", padding: "25px", marginTop: "20px", boxShadow: "0 4px 15px #ddd" };
const welcomeActions = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "12px", marginTop: "18px" };
const welcomeButton = { minHeight: "74px", minWidth: 0, background:"white", color:"#081a4a", border:"1px solid #e3e8f3", borderRadius:"16px", padding:"10px", cursor:"pointer", boxShadow:"0 4px 14px rgba(20,25,50,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", textAlign: "center" };
const welcomeButtonIcon = { width: "36px", height: "36px", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "12px", background: "#eef4ff", color: "#1f57d6" };
const welcomeButtonText = { minWidth: 0, display: "grid", gap: "2px" };
const welcomeButtonTitle = { color: "#111735", fontSize: "14px", fontWeight: "800", lineHeight: 1.15, overflowWrap: "anywhere" };
const welcomeButtonSubtitle = { color: "#5f6b86", fontSize: "12px", fontWeight: "800", lineHeight: 1.2, overflowWrap: "anywhere" };
const eventsHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "14px", marginBottom: "2px" };
const eventTabs = { minWidth: 0, display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" };
const activeEventTab = { margin: 0, borderBottom: "4px solid #111735", color: "#111735", fontSize: "22px", lineHeight: 1.2 };
const eventTab = { margin: 0, color: "#111735", cursor: "pointer", fontSize: "22px", lineHeight: 1.2 };
const seeAllButton = { flexShrink: 0, minHeight: "40px", border: 0, borderRadius: "12px", background: "#e8faff", color: "#006f86", padding: "0 12px", fontSize: "16px", fontWeight: "800", cursor: "pointer", whiteSpace: "nowrap" };
const eventImg = { width: "100%", borderRadius: "18px", marginTop: "25px" };
const previewGrid = { display: "grid", gap: "14px", marginTop: "16px" };
const previewCard = { minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", background: "#f5f6fa", borderRadius: "18px", padding: "16px", textAlign: "center", boxShadow: "0 4px 14px rgba(20,25,50,0.1)" };
const previewIcon = { width: "42px", height: "42px", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: "13px" };
const previewCategory = { margin: "0 0 5px", color: "#1f57d6", fontSize: "13px", fontWeight: "800" };
const previewTitle = { margin: "0 0 5px", color: "#111735", fontSize: "18px", lineHeight: 1.25, overflowWrap: "anywhere" };
const previewText = { margin: 0, color: "#111735", fontSize: "14px", lineHeight: 1.45, overflowWrap: "anywhere" };
const bottomNav = { position: "fixed", bottom: 0, left: 0, right: 0, background: "white", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", padding: "14px 0 16px", boxShadow: "0 -4px 18px #ddd", color: "#111735" };
const navItem = { minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "5px", fontSize: "12px", fontWeight: "600", cursor: "pointer" };
const activeNav = { ...navItem, color: "#111735" };

export default Home;
