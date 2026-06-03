import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";
import { getRoleCopy } from "../utils/users";

function News() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const roleCopy = getRoleCopy(user);
  const stories = useMemo(() => getStories(user, roleCopy.newsLifeTitle), [user, roleCopy.newsLifeTitle]);
  const categories = ["All", ...Array.from(new Set(stories.map((story) => story.category)))];
  const requestedCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(requestedCategory) ? requestedCategory : "All"
  );
  const filteredStories = activeCategory === "All"
    ? stories
    : stories.filter((story) => story.category === activeCategory);

  const content = (
    <NewsContent
      activeCategory={activeCategory}
      categories={categories}
      filteredStories={filteredStories}
      isDesktop={isDesktop}
      navigate={navigate}
      setActiveCategory={setActiveCategory}
    />
  );

  if (!isDesktop) {
    return (
      <MobilePageLayout title="News & Events">
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

function NewsContent({ activeCategory, categories, filteredStories, isDesktop, navigate, setActiveCategory }) {
  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={header}>
        <div>
          <p style={eyebrow}>Campus feed</p>
          <p style={lastUpdated}>Last updated today</p>
        </div>
        <button onClick={() => navigate("/app")} style={dashboardButton} type="button">
          <AppIcon name="dashboard" size={18} />
          <span>Dashboard</span>
        </button>
      </div>

      <div aria-label="News categories" style={chipRow}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            style={activeCategory === category ? activeChip : chip}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      <div style={feedGrid}>
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}

function StoryCard({ story }) {
  return (
    <article style={storyCard}>
      <span style={{ ...storyIcon, color: story.color, background: story.tint }}>
        <AppIcon name={story.icon} size={21} />
      </span>
      <div style={storyBody}>
        <div style={storyTop}>
          <span style={categoryPill}>{story.category}</span>
          <span style={storyDate}>{story.date}</span>
        </div>
        <h2 style={storyTitle}>{story.title}</h2>
        <p style={storyText}>{story.text}</p>
      </div>
    </article>
  );
}

function getStories(user, newsLifeTitle) {
  const role = user === "staff" ? "staff" : user === "professor" ? "professor" : "student";
  const roleStories = getRoleStories(role, newsLifeTitle);

  return [
    {
      id: "featured-conference",
      category: "Events",
      icon: "megaphone",
      color: "#1f57d6",
      tint: "#eef4ff",
      title: "Conference with Thibault Cauvin",
      text: "A campus event for the Rennes School of Business community with live discussion and networking.",
      date: "This week",
      image: "/images/event1.png",
    },
    ...roleStories,
    {
      id: "campus-map",
      category: "Campus",
      icon: "mapPin",
      color: "#006f86",
      tint: "#e8faff",
      title: "Campus access and directions",
      text: "Use the campus map to find buildings, services, and key student areas.",
      date: "Updated",
      image: "/images/event2.png",
    },
    {
      id: "services",
      category: "Services",
      icon: "school",
      color: "#7a0b4f",
      tint: "#fde6f3",
      title: "School services hub is available",
      text: "Find department contacts, support hours, and role-specific services in one place.",
      date: "New",
      image: "/images/event3.png",
    },
  ];
}

function getRoleStories(role, newsLifeTitle) {
  if (role === "professor") {
    return [
      {
        id: "faculty-life",
        category: "Faculty",
        icon: "presentation",
        color: "#1f57d6",
        tint: "#eef4ff",
        title: newsLifeTitle,
        text: "Teaching updates, seminar reminders, and faculty coordination notes are now grouped for professors.",
        date: "Today",
        image: "/images/event2.png",
      },
      {
        id: "research-seminar",
        category: "Research",
        icon: "bookOpen",
        color: "#915900",
        tint: "#fff3d9",
        title: "Research seminar series",
        text: "Faculty research sessions continue this month with guest speakers and internal presentations.",
        date: "Next week",
        image: "/images/event3.png",
      },
    ];
  }

  if (role === "staff") {
    return [
      {
        id: "staff-life",
        category: "Staff",
        icon: "briefcase",
        color: "#1f57d6",
        tint: "#eef4ff",
        title: newsLifeTitle,
        text: "Staff life updates now include internal events, department reminders, and operations news.",
        date: "Today",
        image: "/images/event2.png",
      },
      {
        id: "operations",
        category: "Operations",
        icon: "building",
        color: "#915900",
        tint: "#fff3d9",
        title: "Campus operations update",
        text: "Facilities, access, and room preparation updates are available for staff teams.",
        date: "This month",
        image: "/images/event3.png",
      },
    ];
  }

  return [
    {
      id: "student-life",
      category: "Student Life",
      icon: "users",
      color: "#1f57d6",
      tint: "#eef4ff",
      title: newsLifeTitle,
      text: "Student activities, campus events, and association updates are available this week.",
      date: "Today",
      image: "/images/event2.png",
    },
    {
      id: "career",
      category: "Career",
      icon: "briefcase",
      color: "#915900",
      tint: "#fff3d9",
      title: "Career center appointments",
      text: "Book CV reviews, internship coaching, and interview preparation sessions.",
      date: "Open",
      image: "/images/event3.png",
    },
  ];
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
  justifyContent: "space-between",
  alignItems: "center",
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

const dashboardButton = {
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

const chipRow = {
  display: "flex",
  gap: "8px",
  overflowX: "auto",
  padding: "2px 0 14px",
};

const chip = {
  flexShrink: 0,
  minHeight: "38px",
  border: 0,
  borderRadius: "999px",
  padding: "0 14px",
  background: "white",
  color: "#111735",
  fontSize: "14px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 3px 10px rgba(20, 25, 50, 0.09)",
};

const activeChip = {
  ...chip,
  background: "#081a4a",
  color: "white",
};

const feedGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "14px",
};

const storyCard = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  borderRadius: "18px",
  padding: "16px",
  background: "white",
  textAlign: "center",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const storyIcon = {
  width: "44px",
  height: "44px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
};

const storyBody = {
  minWidth: 0,
};

const storyTop = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginBottom: "8px",
};

const categoryPill = {
  minHeight: "26px",
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  padding: "0 9px",
  background: "#eef4ff",
  color: "#1f57d6",
  fontSize: "12px",
  fontWeight: "800",
};

const storyDate = {
  color: "#4d5872",
  fontSize: "13px",
  fontWeight: "800",
};

const storyTitle = {
  margin: "0 0 6px",
  color: "#111735",
  fontSize: "18px",
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const storyText = {
  margin: 0,
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

export default News;
