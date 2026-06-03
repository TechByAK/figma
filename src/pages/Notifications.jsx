import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";
import { getCurrentProfile } from "../utils/users";
import { getNextScheduleEvent } from "../utils/schedules";
import { getWeekdayName2026 } from "../utils/calendar2026";

function Notifications() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const profile = getCurrentProfile();
  const nextEvent = getNextScheduleEvent(user);
  const notifications = useMemo(
    () => getNotifications(user, profile.name, nextEvent),
    [user, profile.name, nextEvent]
  );
  const [readIds, setReadIds] = useState(() => getReadIds(user));
  const [urgentIds, setUrgentIds] = useState(() => getUrgentIds(user));

  function toggleRead(id) {
    const nextIds = readIds.includes(id)
      ? readIds.filter((readId) => readId !== id)
      : Array.from(new Set([...readIds, id]));
    setReadIds(nextIds);
    localStorage.setItem(getReadKey(user), JSON.stringify(nextIds));
  }

  function toggleUrgent(id) {
    const nextIds = urgentIds.includes(id)
      ? urgentIds.filter((urgentId) => urgentId !== id)
      : Array.from(new Set([...urgentIds, id]));
    setUrgentIds(nextIds);
    localStorage.setItem(getUrgentKey(user), JSON.stringify(nextIds));
  }

  function markAllRead() {
    const nextIds = notifications.map((notification) => notification.id);
    setReadIds(nextIds);
    localStorage.setItem(getReadKey(user), JSON.stringify(nextIds));
  }

  const content = (
    <NotificationsContent
      isDesktop={isDesktop}
      markAllRead={markAllRead}
      navigate={navigate}
      notifications={notifications}
      readIds={readIds}
      toggleRead={toggleRead}
      toggleUrgent={toggleUrgent}
      urgentIds={urgentIds}
    />
  );

  if (!isDesktop) {
    return (
      <MobilePageLayout title="Notifications">
        {content}
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      {content}
    </DesktopLayout>
  );
}

function NotificationsContent({ isDesktop, markAllRead, navigate, notifications, readIds, toggleRead, toggleUrgent, urgentIds }) {
  const unreadCount = notifications.filter((notification) => !readIds.includes(notification.id)).length;
  const urgentCount = urgentIds.length;
  const groups = ["Today", "Upcoming", "System"];

  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={header}>
        <div>
          <p style={eyebrow}>Notification center</p>
          <p style={lastUpdated}>Last updated today</p>
        </div>

        <button onClick={markAllRead} style={markAllButton} type="button">
          <AppIcon name="shieldCheck" size={18} />
          <span>Mark all read</span>
        </button>
      </div>

      <div style={summaryGrid}>
        <SummaryCard icon="bell" label="Unread" value={String(unreadCount)} />
        <SummaryCard icon="alertTriangle" label="Urgent" value={String(urgentCount)} />
        <SummaryCard icon="calendar" label="Schedule" value="Live" />
        <SummaryCard icon="shieldCheck" label="Systems" value="Normal" />
      </div>

      <div style={groupGrid}>
        {groups.map((group) => {
          const items = notifications.filter((notification) => notification.group === group);

          return (
            <section key={group} style={groupSection}>
              <h2 style={groupTitle}>{group}</h2>
              <div style={notificationGrid}>
                {items.map((notification) => (
                  <NotificationCard
                    isRead={readIds.includes(notification.id)}
                    key={notification.id}
                    isUrgent={urgentIds.includes(notification.id)}
                    navigate={navigate}
                    notification={notification}
                    toggleRead={toggleRead}
                    toggleUrgent={toggleUrgent}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

function SummaryCard({ icon, label, value }) {
  return (
    <article style={summaryCard}>
      <span style={summaryIcon}>
        <AppIcon name={icon} size={20} />
      </span>
      <div>
        <p style={summaryLabel}>{label}</p>
        <h2 style={summaryValue}>{value}</h2>
      </div>
    </article>
  );
}

function NotificationCard({ isRead, isUrgent, navigate, notification, toggleRead, toggleUrgent }) {
  return (
    <article style={{ ...notificationCard, ...(isUrgent ? urgentCard : {}), opacity: isRead ? 0.78 : 1 }}>
      <span style={{ ...notificationIcon, background: notification.tint, color: notification.color }}>
        <AppIcon name={notification.icon} size={21} />
        {!isRead && <span style={iconUnreadDot} />}
        {isUrgent && <span style={iconUrgentDot} />}
      </span>

      <div style={notificationBody}>
        <div style={notificationTop}>
          <h3 style={notificationTitle}>{notification.title}</h3>
          <span style={statusMarks}>
            {isUrgent && <span style={urgentPill}>Urgent</span>}
            {!isRead && <span style={unreadDot} />}
          </span>
        </div>
        <p style={notificationText}>{notification.text}</p>
        <p style={notificationMeta}>{notification.meta}</p>

        <div style={actionRow}>
          {notification.action && (
            <button onClick={() => navigate(notification.action.path)} style={actionButton} type="button">
              {notification.action.label}
            </button>
          )}
          <button onClick={() => toggleRead(notification.id)} style={quietButton} type="button">
            {isRead ? "Mark unread" : "Mark read"}
          </button>
          <button onClick={() => toggleUrgent(notification.id)} style={isUrgent ? urgentButton : quietButton} type="button">
            {isUrgent ? "Unflag urgent" : "Flag urgent"}
          </button>
        </div>
      </div>
    </article>
  );
}

function getNotifications(user, name, nextEvent) {
  const role = user === "staff" ? "staff" : user === "professor" ? "professor" : "student";
  const itemLabel = role === "staff" ? "task" : role === "professor" ? "class" : "course";
  const roleCopy = getRoleNotifications(role);
  const scheduleNotification = nextEvent
    ? {
        id: `next-${role}-${nextEvent.day}-${nextEvent.title}`,
        group: "Today",
        icon: "calendar",
        color: "#1f57d6",
        tint: "#eef4ff",
        title: `Next ${itemLabel}`,
        text: `${nextEvent.title} is on ${getWeekdayName2026(1, nextEvent.day)} at ${nextEvent.startHour}.`,
        meta: `${nextEvent.location || "Campus"} • ${nextEvent.time || ""}`,
        action: { label: "Open schedule", path: "/schedule" },
      }
    : {
        id: `empty-${role}`,
        group: "Today",
        icon: "calendar",
        color: "#006f86",
        tint: "#e8faff",
        title: `No ${itemLabel} scheduled`,
        text: `${name}, your schedule is empty for now.`,
        meta: "Add an item in the calendar to receive smarter notifications.",
        action: { label: "Open schedule", path: "/schedule" },
      };

  return [
    scheduleNotification,
    ...roleCopy,
    {
      id: `system-${role}`,
      group: "System",
      icon: "shieldCheck",
      color: "#178a48",
      tint: "#eefaf0",
      title: "Campus systems operational",
      text: "Wi-Fi, Moodle, and campus access are currently operating normally.",
      meta: "Updated today",
      action: { label: "View help", path: "/help" },
    },
  ];
}

function getRoleNotifications(role) {
  if (role === "professor") {
    return [
      {
        id: "prof-grading",
        group: "Upcoming",
        icon: "star",
        color: "#7a0b4f",
        tint: "#fde6f3",
        title: "Grading reminder",
        text: "Case study evaluations are waiting for review before the end of the week.",
        meta: "Teaching hub",
        action: { label: "Open teachings", path: "/studies" },
      },
      {
        id: "prof-room",
        group: "Upcoming",
        icon: "building",
        color: "#915900",
        tint: "#fff3d9",
        title: "Room update",
        text: "Check classroom equipment before your next workshop session.",
        meta: "Faculty services",
        action: { label: "School services", path: "/school-services" },
      },
    ];
  }

  if (role === "staff") {
    return [
      {
        id: "staff-task",
        group: "Upcoming",
        icon: "listCheck",
        color: "#1f57d6",
        tint: "#eef4ff",
        title: "Department task",
        text: "Facilities and IT request follow-ups are waiting in your department hub.",
        meta: "Departments",
        action: { label: "Open departments", path: "/studies" },
      },
      {
        id: "staff-hr",
        group: "Upcoming",
        icon: "briefcase",
        color: "#7a0b4f",
        tint: "#fde6f3",
        title: "HR update",
        text: "Internal staff documents and leave procedures have been refreshed.",
        meta: "Staff services",
        action: { label: "School services", path: "/school-services" },
      },
    ];
  }

  return [
    {
      id: "student-assignment",
      group: "Upcoming",
      icon: "listCheck",
      color: "#7a0b4f",
      tint: "#fde6f3",
      title: "Assignment deadline",
      text: "A marketing case study deadline is coming soon. Check your study hub.",
      meta: "Studies",
      action: { label: "Open studies", path: "/studies" },
    },
    {
      id: "student-career",
      group: "Upcoming",
      icon: "briefcase",
      color: "#006f86",
      tint: "#e8faff",
      title: "Career center",
      text: "New internship support appointments are available this week.",
      meta: "Student services",
      action: { label: "School services", path: "/school-services" },
    },
  ];
}

function getReadIds(user) {
  try {
    return JSON.parse(localStorage.getItem(getReadKey(user))) || [];
  } catch {
    return [];
  }
}

function getReadKey(user) {
  return `readNotifications:${user}`;
}

function getUrgentIds(user) {
  try {
    return JSON.parse(localStorage.getItem(getUrgentKey(user))) || [];
  } catch {
    return [];
  }
}

function getUrgentKey(user) {
  return `urgentNotifications:${user}`;
}

const panel = {
  background: "white",
  borderRadius: "26px",
  padding: "28px",
  minHeight: "calc(100vh - 160px)",
  boxShadow: "0 5px 22px rgba(20, 25, 50, 0.12)",
};

const mobilePanel = {
  background: "#f5f6fa",
  borderRadius: "18px",
  padding: "18px",
};

const header = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "14px",
  flexWrap: "wrap",
  marginBottom: "16px",
};

const eyebrow = {
  margin: "0 0 5px",
  color: "#1f57d6",
  fontSize: "14px",
  fontWeight: "800",
};

const lastUpdated = {
  margin: "4px 0 0",
  color: "#5f6b86",
  fontSize: "14px",
  fontWeight: "800",
};

const markAllButton = {
  minHeight: "44px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: 0,
  borderRadius: "13px",
  padding: "0 14px",
  background: "#081a4a",
  color: "white",
  fontSize: "14px",
  fontWeight: "800",
  cursor: "pointer",
};

const summaryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "12px",
  marginBottom: "18px",
};

const summaryCard = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderRadius: "16px",
  padding: "14px",
  background: "white",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const summaryIcon = {
  width: "42px",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const summaryLabel = {
  margin: 0,
  color: "#4d5872",
  fontSize: "13px",
  fontWeight: "800",
};

const summaryValue = {
  margin: "2px 0 0",
  color: "#111735",
  fontSize: "23px",
  lineHeight: 1.1,
};

const groupGrid = {
  display: "grid",
  gap: "18px",
};

const groupTitle = {
  margin: "0 0 10px",
  color: "#111735",
  fontSize: "20px",
};

const groupSection = {
  minWidth: 0,
};

const notificationGrid = {
  display: "grid",
  gap: "12px",
};

const notificationCard = {
  minWidth: 0,
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  borderRadius: "18px",
  padding: "16px",
  background: "white",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const urgentCard = {
  border: "1px solid #ffd1dc",
  boxShadow: "0 5px 18px rgba(255, 87, 87, 0.16)",
};

const notificationIcon = {
  position: "relative",
  width: "44px",
  height: "44px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
};

const iconUnreadDot = {
  position: "absolute",
  top: "-3px",
  right: "-3px",
  width: "11px",
  height: "11px",
  borderRadius: "50%",
  border: "2px solid white",
  background: "#1f57d6",
};

const iconUrgentDot = {
  position: "absolute",
  bottom: "-3px",
  right: "-3px",
  width: "11px",
  height: "11px",
  borderRadius: "50%",
  border: "2px solid white",
  background: "#ff5757",
};

const notificationBody = {
  minWidth: 0,
  flex: 1,
};

const notificationTop = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
};

const notificationTitle = {
  margin: 0,
  color: "#111735",
  fontSize: "18px",
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const unreadDot = {
  width: "10px",
  height: "10px",
  flexShrink: 0,
  borderRadius: "50%",
  background: "#1f57d6",
};

const statusMarks = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  flexShrink: 0,
};

const urgentPill = {
  minHeight: "24px",
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  padding: "0 8px",
  background: "#fde6f3",
  color: "#7a0b4f",
  fontSize: "12px",
  fontWeight: "900",
};

const notificationText = {
  margin: "6px 0",
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const notificationMeta = {
  margin: 0,
  color: "#4d5872",
  fontSize: "14px",
  fontWeight: "800",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const actionRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "12px",
};

const actionButton = {
  minHeight: "36px",
  border: 0,
  borderRadius: "11px",
  padding: "0 12px",
  background: "#081a4a",
  color: "white",
  fontSize: "13px",
  fontWeight: "800",
  cursor: "pointer",
};

const quietButton = {
  ...actionButton,
  background: "#eef4ff",
  color: "#1f57d6",
};

const urgentButton = {
  ...actionButton,
  background: "#fde6f3",
  color: "#7a0b4f",
};

export default Notifications;
