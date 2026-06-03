import { useState } from "react";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";
import { getRoleCopy } from "../utils/users";

function Studies() {
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const roleCopy = getRoleCopy(user);
  const hub = getHubData(user);
  const content = <StudiesContent hub={hub} isDesktop={isDesktop} roleCopy={roleCopy} />;

  if (!isDesktop) {
    return (
      <MobilePageLayout active="studies" title={roleCopy.studiesTitle}>
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

function StudiesContent({ hub, isDesktop, roleCopy }) {
  const [openSection, setOpenSection] = useState(null);

  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={pageHeader}>
        <p style={eyebrow}>{hub.eyebrow}</p>
        <h1 style={title}>{roleCopy.studiesTitle}</h1>
        <p style={intro}>{hub.intro}</p>
      </div>

      <div style={metricGrid}>
        {hub.metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div style={contentGrid}>
        {hub.sections.map((section) => (
          <SectionCard
            isOpen={openSection === section.id}
            key={section.id}
            onToggle={() => setOpenSection((current) => (current === section.id ? null : section.id))}
            section={section}
          />
        ))}
      </div>
    </section>
  );
}

function MetricCard({ metric }) {
  return (
    <article style={metricCard}>
      <span style={metricIcon}>
        <AppIcon name={metric.icon} size={22} />
      </span>
      <div style={metricBody}>
        <p style={metricLabel}>{metric.label}</p>
        <h2 style={metricValue}>{metric.value}</h2>
        <p style={metricText}>{metric.text}</p>
      </div>
    </article>
  );
}

function SectionCard({ isOpen, onToggle, section }) {
  return (
    <article style={sectionCard}>
      <button aria-expanded={isOpen} onClick={onToggle} style={sectionHeader} type="button">
        <span style={sectionIcon}>
          <AppIcon name={section.icon} size={21} />
        </span>
        <span style={sectionTitleBlock}>
          <span style={sectionTitle}>{section.title}</span>
          <span style={sectionSummary}>{section.summary}</span>
        </span>
        <span style={chevronIcon}>
          <AppIcon name={isOpen ? "chevronUp" : "chevronDown"} size={21} />
        </span>
      </button>

      {isOpen && (
        <div style={sectionDetails}>
          {section.items.map((item) => (
            <DetailRow isCompact={window.innerWidth < 520} item={item} key={`${section.id}-${item.title}`} />
          ))}
        </div>
      )}
    </article>
  );
}

function DetailRow({ isCompact, item }) {
  return (
    <div style={{ ...detailRow, gridTemplateColumns: isCompact ? "1fr" : detailRow.gridTemplateColumns }}>
      <div style={detailBody}>
        <h3 style={detailTitle}>{item.title}</h3>
        <p style={detailText}>{item.text}</p>
      </div>
      {item.meta && <span style={detailMeta}>{item.meta}</span>}
    </div>
  );
}

function getHubData(user) {
  if (user === "professor") {
    return {
      eyebrow: "Teaching hub",
      intro: "Manage classes, materials, students, grading, and office hours from one place.",
      metrics: [
        { icon: "presentation", label: "Classes", value: "4", text: "Active this semester" },
        { icon: "users", label: "Students", value: "126", text: "Across all groups" },
        { icon: "listCheck", label: "Assessments", value: "8", text: "Pending reviews" },
      ],
      sections: [
        {
          id: "classes",
          icon: "presentation",
          title: "My classes",
          summary: "Groups, rooms, and upcoming sessions.",
          items: [
            { title: "Marketing Strategy", text: "MSc group A, Room B204, next session Monday 10:00 AM.", meta: "42 students" },
            { title: "Consumer Behaviour", text: "Bachelor group C, Room A118, next session Tuesday 2:00 PM.", meta: "36 students" },
            { title: "Business Analytics", text: "MBA workshop, Lab C301, next session Thursday 9:00 AM.", meta: "28 students" },
          ],
        },
        {
          id: "materials",
          icon: "bookOpen",
          title: "Teaching materials",
          summary: "Syllabus, slides, readings, and exams.",
          items: [
            { title: "Week 4 slides", text: "Upload or review lecture slides before the next class.", meta: "Draft" },
            { title: "Syllabus pack", text: "Course outline, assessment rules, and reading list.", meta: "Published" },
            { title: "Exam documents", text: "Prepare exam brief and marking rubric.", meta: "Private" },
          ],
        },
        {
          id: "assessment",
          icon: "star",
          title: "Assessment",
          summary: "Grading status and evaluation reminders.",
          items: [
            { title: "Case study grading", text: "24 submissions still waiting for review.", meta: "Due Friday" },
            { title: "Participation marks", text: "Update attendance-linked participation records.", meta: "Open" },
            { title: "Feedback release", text: "Publish individual feedback once grades are validated.", meta: "Pending" },
          ],
        },
        {
          id: "office-hours",
          icon: "calendar",
          title: "Office hours",
          summary: "Availability and student appointments.",
          items: [
            { title: "Wednesday office hours", text: "2:00 PM-4:00 PM, Faculty office A212.", meta: "Available" },
            { title: "Student appointments", text: "Three consultation slots reserved this week.", meta: "3 booked" },
          ],
        },
      ],
    };
  }

  if (user === "staff") {
    return {
      eyebrow: "Department hub",
      intro: "Track department priorities, requests, documents, and internal updates.",
      metrics: [
        { icon: "building", label: "Department", value: "Operations", text: "Current assignment" },
        { icon: "listCheck", label: "Tasks", value: "7", text: "Open this week" },
        { icon: "fileText", label: "Requests", value: "3", text: "Waiting for response" },
      ],
      sections: [
        {
          id: "department",
          icon: "building",
          title: "My department",
          summary: "Team details and department contacts.",
          items: [
            { title: "Operations team", text: "Campus coordination, rooms, services, and daily support.", meta: "Active" },
            { title: "Department manager", text: "Claire Martin, operations coordination.", meta: "A building" },
            { title: "Team inbox", text: "operations.department@rennes-sb.com", meta: "Shared" },
          ],
        },
        {
          id: "tasks",
          icon: "listCheck",
          title: "Tasks",
          summary: "Weekly priorities and operational work.",
          items: [
            { title: "Room readiness check", text: "Confirm classroom setup for Monday morning sessions.", meta: "Today" },
            { title: "Visitor badges", text: "Prepare badge list for the guest speaker event.", meta: "Open" },
            { title: "Service follow-up", text: "Update pending facilities and IT support tickets.", meta: "3 items" },
          ],
        },
        {
          id: "requests",
          icon: "briefcase",
          title: "Requests",
          summary: "Internal HR, facilities, and IT requests.",
          items: [
            { title: "Facilities request", text: "Maintenance team assigned to Building B access issue.", meta: "In progress" },
            { title: "HR document", text: "Leave confirmation waiting for validation.", meta: "Pending" },
            { title: "IT access", text: "Shared drive permission request submitted.", meta: "Open" },
          ],
        },
        {
          id: "documents",
          icon: "fileText",
          title: "Documents",
          summary: "Policies, forms, and procedures.",
          items: [
            { title: "Internal procedures", text: "Operational process documents and service guidelines.", meta: "Updated" },
            { title: "HR forms", text: "Absence, onboarding, and staff administration forms.", meta: "Available" },
            { title: "Campus policy", text: "Building access, safety, and visitor rules.", meta: "Read" },
          ],
        },
      ],
    };
  }

  if (user === "naima") {
    return {
      eyebrow: "Study hub",
      intro: "Follow your courses, assignments, documents, grades, and academic progress.",
      metrics: [
        { icon: "bookOpen", label: "Courses", value: "4", text: "This semester" },
        { icon: "trendingUp", label: "Credits", value: "24/30", text: "Completed" },
        { icon: "calendar", label: "Deadlines", value: "3", text: "Coming soon" },
      ],
      sections: [
        {
          id: "courses",
          icon: "bookOpen",
          title: "My courses",
          summary: "Course list matched with Naima's sample schedule.",
          items: [
            { title: "Stellar Physics", text: "Bat. B, Salle 12. Scheduled Monday and Thursday.", meta: "Mon / Thu" },
            { title: "General relativity", text: "Bat. A, Salle 1. Scheduled Monday from 5 PM to 6 PM.", meta: "Monday" },
            { title: "Business Analytics", text: "Bat. B, Salle 12. Scheduled Tuesday from 9:30 AM to 11:30 AM.", meta: "Tuesday" },
            { title: "Change Management", text: "Bat. B, Salle 12. Scheduled Tuesday from 2 PM to 3 PM.", meta: "Tuesday" },
          ],
        },
        {
          id: "assignments",
          icon: "listCheck",
          title: "Assignments",
          summary: "Upcoming deadlines and academic tasks.",
          items: [
            { title: "Stellar Physics reading", text: "Review lecture notes before the next scheduled session.", meta: "This week" },
            { title: "Business Analytics exercise", text: "Prepare the analytics practice set for the Tuesday class.", meta: "Open" },
            { title: "Change Management brief", text: "Draft a short reflection on organizational change cases.", meta: "Next week" },
          ],
        },
        {
          id: "grades",
          icon: "star",
          title: "Grades overview",
          summary: "Prototype grade cards and progress status.",
          items: [
            { title: "Stellar Physics", text: "Continuous assessment grade recorded.", meta: "16/20" },
            { title: "Business Analytics", text: "Project checkpoint completed.", meta: "Good" },
            { title: "Change Management", text: "Group work feedback waiting for validation.", meta: "Pending" },
          ],
        },
        {
          id: "documents",
          icon: "certificate",
          title: "Documents",
          summary: "Certificates, enrollment letters, and transcripts.",
          items: [
            { title: "Enrollment certificate", text: "Available for administrative use.", meta: "Ready" },
            { title: "Transcript", text: "Semester transcript will appear after grade validation.", meta: "Pending" },
            { title: "Attendance statement", text: "Request attendance proof from student services.", meta: "Request" },
          ],
        },
      ],
    };
  }

  return {
    eyebrow: "Study hub",
    intro: "Follow your courses, assignments, documents, grades, and academic progress.",
    metrics: [
      { icon: "bookOpen", label: "Courses", value: "5", text: "This semester" },
      { icon: "trendingUp", label: "Credits", value: "24/30", text: "Completed" },
      { icon: "calendar", label: "Deadlines", value: "3", text: "Coming soon" },
    ],
    sections: [
      {
        id: "courses",
        icon: "bookOpen",
        title: "My courses",
        summary: "Course list, credits, professors, and rooms.",
        items: [
          { title: "International Marketing", text: "Professor Laurent, Room B204, 6 ECTS.", meta: "Monday" },
          { title: "Corporate Finance", text: "Professor Dubois, Room A118, 6 ECTS.", meta: "Tuesday" },
          { title: "Business Analytics", text: "Professor Morel, Lab C301, 6 ECTS.", meta: "Thursday" },
        ],
      },
      {
        id: "assignments",
        icon: "listCheck",
        title: "Assignments",
        summary: "Upcoming deadlines and academic tasks.",
        items: [
          { title: "Marketing case study", text: "Submit individual analysis and references.", meta: "Due Friday" },
          { title: "Finance quiz", text: "Online quiz available on Moodle.", meta: "Open" },
          { title: "Analytics project", text: "Group dashboard prototype and short report.", meta: "Next week" },
        ],
      },
      {
        id: "grades",
        icon: "star",
        title: "Grades overview",
        summary: "Prototype grade cards and progress status.",
        items: [
          { title: "Marketing Strategy", text: "Continuous assessment grade recorded.", meta: "15/20" },
          { title: "Finance", text: "Midterm result waiting for validation.", meta: "Pending" },
          { title: "Analytics", text: "Project checkpoint completed.", meta: "Good" },
        ],
      },
      {
        id: "documents",
        icon: "certificate",
        title: "Documents",
        summary: "Certificates, enrollment letters, and transcripts.",
        items: [
          { title: "Enrollment certificate", text: "Available for administrative use.", meta: "Ready" },
          { title: "Transcript", text: "Semester transcript will appear after grade validation.", meta: "Pending" },
          { title: "Attendance statement", text: "Request attendance proof from student services.", meta: "Request" },
        ],
      },
    ],
  };
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

const pageHeader = {
  marginBottom: "18px",
};

const eyebrow = {
  margin: "0 0 5px",
  color: "#1f57d6",
  fontSize: "14px",
  fontWeight: "800",
};

const title = {
  margin: 0,
  color: "#111735",
  fontSize: "clamp(28px, 4vw, 38px)",
  lineHeight: 1.1,
};

const intro = {
  maxWidth: "760px",
  margin: "10px 0 0",
  lineHeight: 1.55,
  color: "#111735",
  fontSize: "16px",
  overflowWrap: "anywhere",
};

const metricGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "14px",
  marginBottom: "16px",
};

const metricCard = {
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderRadius: "16px",
  padding: "16px",
  background: "white",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const metricIcon = {
  width: "46px",
  height: "46px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "14px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const metricBody = {
  minWidth: 0,
};

const metricLabel = {
  margin: 0,
  color: "#4d5872",
  fontSize: "13px",
  fontWeight: "800",
};

const metricValue = {
  margin: "2px 0",
  color: "#111735",
  fontSize: "25px",
  lineHeight: 1.1,
};

const metricText = {
  margin: 0,
  color: "#111735",
  fontSize: "14px",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const contentGrid = {
  display: "grid",
  gap: "14px",
};

const sectionCard = {
  background: "white",
  borderRadius: "16px",
  padding: "8px",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const sectionHeader = {
  width: "100%",
  minHeight: "66px",
  display: "grid",
  gridTemplateColumns: "44px minmax(0, 1fr) 32px",
  alignItems: "center",
  gap: "10px",
  border: 0,
  borderRadius: "12px",
  padding: "8px",
  background: "transparent",
  color: "#111735",
  cursor: "pointer",
  textAlign: "left",
};

const sectionIcon = {
  width: "42px",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const sectionTitleBlock = {
  minWidth: 0,
  display: "grid",
  gap: "3px",
};

const sectionTitle = {
  minWidth: 0,
  color: "#111735",
  fontSize: "19px",
  fontWeight: "800",
  lineHeight: 1.2,
  overflowWrap: "anywhere",
};

const sectionSummary = {
  color: "#4d5872",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const chevronIcon = {
  width: "32px",
  height: "32px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#33406b",
};

const sectionDetails = {
  display: "grid",
  gap: "10px",
  padding: "6px 12px 14px clamp(12px, 7vw, 62px)",
};

const detailRow = {
  minWidth: 0,
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: "10px",
  borderRadius: "14px",
  padding: "12px",
  background: "#f5f7fb",
};

const detailBody = {
  minWidth: 0,
};

const detailTitle = {
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const detailText = {
  margin: 0,
  color: "#111735",
  fontSize: "14px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const detailMeta = {
  minHeight: "30px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "999px",
  padding: "0 10px",
  background: "#e8faff",
  color: "#006f86",
  fontSize: "13px",
  fontWeight: "800",
  whiteSpace: "nowrap",
};

export default Studies;
