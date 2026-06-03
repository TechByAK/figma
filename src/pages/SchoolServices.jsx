import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";

function SchoolServices() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const services = getServicesForRole(user);
  const content = <ServicesContent isDesktop={isDesktop} onBack={() => goBack(navigate)} services={services} />;

  if (!isDesktop) {
    return (
      <MobilePageLayout title="School services">
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

function ServicesContent({ isDesktop, onBack, services }) {
  const [openService, setOpenService] = useState(null);

  function toggleService(serviceId) {
    setOpenService((current) => (current === serviceId ? null : serviceId));
  }

  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={pageHeader}>
        <button onClick={onBack} style={backButton} type="button">
          <AppIcon name="arrowLeft" size={18} />
          <span>Back</span>
        </button>
        <p style={eyebrow}>Rennes School of Business</p>
        <h1 style={title}>School services</h1>
        <p style={intro}>
          Find the right department, contact details, and support hours for your profile.
        </p>
      </div>

      <div style={servicesGrid}>
        {services.map((service) => (
          <ServiceCard
            isOpen={openService === service.id}
            key={service.id}
            onToggle={() => toggleService(service.id)}
            service={service}
          />
        ))}
      </div>
    </section>
  );
}

function goBack(navigate) {
  if (window.history.length > 1) {
    navigate(-1);
    return;
  }

  navigate("/app");
}

function ServiceCard({ isOpen, onToggle, service }) {
  return (
    <article style={serviceCard}>
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        style={serviceHeader}
        type="button"
      >
        <span style={serviceIcon}>
          <AppIcon name={service.icon} size={21} />
        </span>
        <span style={serviceTitleBlock}>
          <span style={serviceTitle}>{service.title}</span>
          <span style={serviceSummary}>{service.summary}</span>
        </span>
        <span style={chevronIcon}>
          <AppIcon name={isOpen ? "chevronUp" : "chevronDown"} size={21} />
        </span>
      </button>

      {isOpen && (
        <div style={serviceDetails}>
          <div style={detailGrid}>
            <Detail label="Hours" value={service.hours} />
            <Detail label="Contact" value={service.contact} />
            <Detail label="Location" value={service.location} />
          </div>

          <p style={detailText}>{service.details}</p>

          <a href={`mailto:${service.contact}`} style={contactButton}>
            <AppIcon name="mail" size={18} />
            <span>Contact service</span>
          </a>
        </div>
      )}
    </article>
  );
}

function Detail({ label, value }) {
  return (
    <p style={detailItem}>
      <span style={detailLabel}>{label}</span>
      {value}
    </p>
  );
}

function getServicesForRole(user) {
  if (user === "professor") {
    return [
      {
        id: "faculty-support",
        icon: "users",
        title: "Faculty support",
        summary: "Teaching coordination and faculty requests.",
        hours: "Mon-Fri, 8:30 AM-5:30 PM",
        contact: "faculty.support@rennes-sb.com",
        location: "Faculty office, Building A",
        details: "Support for class planning, room issues, academic coordination, and teaching administration.",
      },
      {
        id: "teaching-rooms",
        icon: "building",
        title: "Teaching rooms",
        summary: "Room access, equipment, and class spaces.",
        hours: "Mon-Fri, 8:00 AM-6:30 PM",
        contact: "rooms.support@rennes-sb.com",
        location: "Campus operations desk",
        details: "Check classroom access, projector support, room availability, and urgent teaching space issues.",
      },
      {
        id: "it-support",
        icon: "wifi",
        title: "IT support",
        summary: "Wi-Fi, accounts, Moodle, and devices.",
        hours: "Mon-Fri, 8:30 AM-6:00 PM",
        contact: "it.support@rennes-sb.com",
        location: "Digital services, Building B",
        details: "Help with faculty accounts, classroom technology, email, Moodle access, and school devices.",
      },
      {
        id: "hr",
        icon: "briefcase",
        title: "Human resources",
        summary: "Contracts, absence, and HR documents.",
        hours: "Mon-Fri, 9:00 AM-5:00 PM",
        contact: "hr.faculty@rennes-sb.com",
        location: "Administration, Building A",
        details: "Faculty HR questions, administrative documents, leave requests, and internal procedures.",
      },
    ];
  }

  if (user === "staff") {
    return [
      {
        id: "hr",
        icon: "briefcase",
        title: "Human resources",
        summary: "Staff documents and internal requests.",
        hours: "Mon-Fri, 9:00 AM-5:00 PM",
        contact: "hr.staff@rennes-sb.com",
        location: "Administration, Building A",
        details: "Support for contracts, leave, onboarding, staff records, and internal HR procedures.",
      },
      {
        id: "facilities",
        icon: "building",
        title: "Facilities",
        summary: "Campus operations and building support.",
        hours: "Mon-Fri, 8:00 AM-6:00 PM",
        contact: "facilities@rennes-sb.com",
        location: "Operations desk",
        details: "Report building issues, room setup needs, access problems, maintenance, and campus logistics.",
      },
      {
        id: "it-support",
        icon: "wifi",
        title: "IT support",
        summary: "Systems, email, equipment, and access.",
        hours: "Mon-Fri, 8:30 AM-6:00 PM",
        contact: "it.support@rennes-sb.com",
        location: "Digital services, Building B",
        details: "Support for workstations, school systems, staff email, software, access rights, and shared tools.",
      },
      {
        id: "department-services",
        icon: "fileText",
        title: "Department services",
        summary: "Internal processes and department contacts.",
        hours: "Mon-Fri, 9:00 AM-5:30 PM",
        contact: "department.services@rennes-sb.com",
        location: "Department office",
        details: "Find internal contacts, policies, operational resources, and department-specific service information.",
      },
    ];
  }

  return [
    {
      id: "student-services",
      icon: "users",
      title: "Student services",
      summary: "Student card, documents, and general support.",
      hours: "Mon-Fri, 9:00 AM-5:30 PM",
      contact: "student.services@rennes-sb.com",
      location: "Student services desk",
      details: "Help with student cards, certificates, administrative questions, housing guidance, and campus life support.",
    },
    {
      id: "academic-office",
      icon: "school",
      title: "Academic office",
      summary: "Courses, attendance, grades, and timetables.",
      hours: "Mon-Fri, 8:30 AM-5:30 PM",
      contact: "academic.office@rennes-sb.com",
      location: "Academic office, Building A",
      details: "Contact this service for timetable support, attendance questions, grade follow-up, and course changes.",
    },
    {
      id: "it-support",
      icon: "wifi",
      title: "IT support",
      summary: "Wi-Fi, Moodle, email, and passwords.",
      hours: "Mon-Fri, 8:30 AM-6:00 PM",
      contact: "it.support@rennes-sb.com",
      location: "Digital services, Building B",
      details: "Support for Wi-Fi access, school email, Moodle, password issues, and digital tools.",
    },
    {
      id: "career-center",
      icon: "briefcase",
      title: "Career center",
      summary: "Internships, jobs, and appointments.",
      hours: "Mon-Fri, 9:00 AM-5:00 PM",
      contact: "career.center@rennes-sb.com",
      location: "Career center",
      details: "Book CV reviews, internship guidance, interview preparation, and career appointments.",
    },
    {
      id: "library",
      icon: "bookOpen",
      title: "Library",
      summary: "Books, study rooms, and research help.",
      hours: "Mon-Fri, 8:30 AM-7:00 PM",
      contact: "library@rennes-sb.com",
      location: "Library area",
      details: "Access study rooms, library resources, research databases, books, and quiet work areas.",
    },
    {
      id: "wellbeing",
      icon: "heartPulse",
      title: "Wellbeing",
      summary: "Counseling, accessibility, and health support.",
      hours: "Mon-Fri, 9:00 AM-5:00 PM",
      contact: "wellbeing@rennes-sb.com",
      location: "Student support office",
      details: "Confidential support for wellbeing, accessibility needs, counseling guidance, and health-related questions.",
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
  fontSize: "clamp(26px, 4vw, 36px)",
  lineHeight: 1.12,
};

const backButton = {
  minHeight: "42px",
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  border: 0,
  borderRadius: "12px",
  padding: "0 13px",
  marginBottom: "12px",
  background: "#081a4a",
  color: "white",
  fontSize: "14px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 5px 16px rgba(8, 26, 74, 0.2)",
};

const intro = {
  maxWidth: "720px",
  margin: "10px 0 0",
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.55,
};

const servicesGrid = {
  display: "grid",
  gap: "14px",
};

const serviceCard = {
  background: "white",
  borderRadius: "16px",
  padding: "8px",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const serviceHeader = {
  width: "100%",
  minHeight: "66px",
  display: "grid",
  gridTemplateColumns: "44px minmax(0, 1fr) 32px",
  alignItems: "center",
  gap: "10px",
  background: "transparent",
  border: 0,
  padding: "8px",
  color: "#111735",
  cursor: "pointer",
  textAlign: "left",
};

const serviceIcon = {
  width: "42px",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const serviceTitleBlock = {
  minWidth: 0,
  display: "grid",
  gap: "3px",
};

const serviceTitle = {
  minWidth: 0,
  color: "#111735",
  fontSize: "19px",
  fontWeight: "800",
  lineHeight: 1.2,
  overflowWrap: "anywhere",
};

const serviceSummary = {
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

const serviceDetails = {
  display: "grid",
  gap: "12px",
  padding: "6px 12px 14px clamp(12px, 7vw, 62px)",
};

const detailGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "10px",
};

const detailItem = {
  margin: 0,
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const detailLabel = {
  display: "block",
  color: "#5f6b86",
  fontSize: "13px",
  fontWeight: "800",
  lineHeight: 1.35,
};

const detailText = {
  margin: 0,
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.55,
  overflowWrap: "anywhere",
};

const contactButton = {
  width: "fit-content",
  minHeight: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "13px",
  padding: "0 14px",
  background: "#081a4a",
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "800",
  boxShadow: "0 5px 16px rgba(8, 26, 74, 0.2)",
};

export default SchoolServices;
