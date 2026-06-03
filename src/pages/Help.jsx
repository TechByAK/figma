import { useState } from "react";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";
import { getRoleCopy } from "../utils/users";

function Help() {
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const content = <HelpContent isDesktop={isDesktop} user={user} />;

  if (!isDesktop) {
    return (
      <MobilePageLayout active="help" title="Help">
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

function HelpContent({ isDesktop, user }) {
  const roleCopy = getRoleCopy(user);
  const helpData = getHelpData(user);
  const [openFaq, setOpenFaq] = useState(null);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [form, setForm] = useState({
    category: helpData.quickActions[0]?.title || "General support",
    urgency: "Normal",
    message: "",
  });
  const [sentRequest, setSentRequest] = useState(null);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function submitRequest(event) {
    event.preventDefault();
    setSentRequest({
      category: form.category,
      urgency: form.urgency,
    });
    setForm((current) => ({ ...current, message: "" }));
  }

  return (
    <section style={isDesktop ? panel : mobilePanel}>
      <div style={pageHeader}>
        <p style={eyebrow}>Support center</p>
        <h1 style={title}>How can we help?</h1>
        <p style={intro}>
          <span style={noteMark}>*</span>
          <span>{roleCopy.helpText}</span>
        </p>
      </div>

      <div style={quickGrid}>
        {helpData.quickActions.map((action) => (
          <QuickAction
            action={action}
            key={action.title}
            onSelect={() => {
              updateField("category", action.title);
              setIsRequestOpen(true);
            }}
          />
        ))}
      </div>

      <div style={{ ...contentGrid, gridTemplateColumns: isDesktop ? contentGrid.gridTemplateColumns : "1fr" }}>
        <div style={mainColumn}>
          <section style={sectionCard}>
            <h2 style={sectionTitle}>Frequently asked questions</h2>
            <div style={faqGrid}>
              {helpData.faqs.map((faq) => (
                <FaqItem
                  faq={faq}
                  isOpen={openFaq === faq.id}
                  key={faq.id}
                  onToggle={() => setOpenFaq((current) => (current === faq.id ? null : faq.id))}
                />
              ))}
            </div>
          </section>

          <section style={sectionCard}>
            <button
              aria-expanded={isRequestOpen}
              onClick={() => setIsRequestOpen((current) => !current)}
              style={sectionToggle}
              type="button"
            >
              <span style={sectionTitle}>Submit a request</span>
              <AppIcon name={isRequestOpen ? "chevronUp" : "chevronDown"} size={21} />
            </button>

            {isRequestOpen && (
              <>
                <form onSubmit={submitRequest} style={requestForm}>
                  <label style={fieldLabel}>
                    Category
                    <select
                      onChange={(event) => updateField("category", event.target.value)}
                      style={field}
                      value={form.category}
                    >
                      {helpData.requestCategories.map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                    </select>
                  </label>

                  <label style={fieldLabel}>
                    Urgency
                    <select
                      onChange={(event) => updateField("urgency", event.target.value)}
                      style={field}
                      value={form.urgency}
                    >
                      <option>Normal</option>
                      <option>Important</option>
                      <option>Urgent</option>
                    </select>
                  </label>

                  <label style={fieldLabel}>
                    Message
                    <textarea
                      onChange={(event) => updateField("message", event.target.value)}
                      placeholder="Describe what you need help with"
                      required
                      rows={4}
                      style={messageField}
                      value={form.message}
                    />
                  </label>

                  <button style={submitButton} type="submit">
                    <AppIcon name="send" size={18} />
                    <span>Send request</span>
                  </button>
                </form>

                {sentRequest && (
                  <div style={confirmation}>
                    <AppIcon name="shieldCheck" size={20} />
                    <span>
                      Request sent to {sentRequest.category} with {sentRequest.urgency.toLowerCase()} priority.
                    </span>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        <aside style={sideColumn}>
          <section style={sectionCard}>
            <h2 style={sectionTitle}>Service status</h2>
            <div style={statusGrid}>
              {helpData.status.map((item) => (
                <StatusItem item={item} key={item.name} />
              ))}
            </div>
          </section>

          <section style={sectionCard}>
            <h2 style={sectionTitle}>Useful contacts</h2>
            <div style={contactsGrid}>
              {helpData.contacts.map((contact) => (
                <ContactCard contact={contact} key={contact.title} />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function QuickAction({ action, onSelect }) {
  return (
    <button onClick={onSelect} style={quickAction} type="button">
      <span style={quickIcon}>
        <AppIcon name={action.icon} size={22} />
      </span>
      <span style={quickTextBlock}>
        <span style={quickTitle}>{action.title}</span>
        <span style={quickText}>{action.text}</span>
      </span>
    </button>
  );
}

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <article style={faqCard}>
      <button aria-expanded={isOpen} onClick={onToggle} style={faqHeader} type="button">
        <span style={faqQuestion}>{faq.question}</span>
        <AppIcon name={isOpen ? "chevronUp" : "chevronDown"} size={20} />
      </button>
      {isOpen && <p style={faqAnswer}>{faq.answer}</p>}
    </article>
  );
}

function StatusItem({ item }) {
  return (
    <div style={statusItem}>
      <span style={statusDot} />
      <div>
        <h3 style={statusTitle}>{item.name}</h3>
        <p style={statusText}>{item.text}</p>
      </div>
    </div>
  );
}

function ContactCard({ contact }) {
  return (
    <article style={contactCard}>
      <span style={contactIcon}>
        <AppIcon name={contact.icon} size={20} />
      </span>
      <div style={contactBody}>
        <h3 style={contactTitle}>{contact.title}</h3>
        <p style={contactText}>{contact.phone}</p>
        <p style={contactText}>{contact.email}</p>
      </div>
    </article>
  );
}

function getHelpData(user) {
  if (user === "professor") {
    return {
      quickActions: [
        { icon: "building", title: "Room issue", text: "Classroom access or equipment" },
        { icon: "wifi", title: "IT problem", text: "Moodle, email, or projector" },
        { icon: "calendar", title: "Schedule issue", text: "Class timing or room conflict" },
      ],
      requestCategories: ["Room issue", "IT problem", "Schedule issue", "Faculty support", "HR question"],
      faqs: [
        {
          id: "room",
          question: "What should I do if my teaching room is unavailable?",
          answer: "Contact room support and include the class name, time, room number, and expected student group.",
        },
        {
          id: "moodle",
          question: "Where do I report Moodle or classroom technology issues?",
          answer: "Use IT support for Moodle, school email, classroom screens, projectors, and access rights.",
        },
        {
          id: "absence",
          question: "Who should I contact for teaching absence or schedule changes?",
          answer: "Faculty support coordinates replacement planning, schedule updates, and communication with students.",
        },
      ],
      contacts: [
        { icon: "users", title: "Faculty support", phone: "+33 2 99 54 63 28", email: "faculty.support@rennes-sb.com" },
        { icon: "building", title: "Room support", phone: "+33 2 99 54 62 14", email: "rooms.support@rennes-sb.com" },
        { icon: "wifi", title: "IT support", phone: "+33 2 99 54 67 10", email: "it.support@rennes-sb.com" },
      ],
      status: sharedStatus,
    };
  }

  if (user === "staff") {
    return {
      quickActions: [
        { icon: "briefcase", title: "HR request", text: "Contract, leave, or documents" },
        { icon: "building", title: "Facilities", text: "Building access or maintenance" },
        { icon: "wifi", title: "IT problem", text: "Account, system, or device" },
      ],
      requestCategories: ["HR request", "Facilities", "IT problem", "Department support", "Policy question"],
      faqs: [
        {
          id: "access",
          question: "How do I report a campus access problem?",
          answer: "Contact facilities with your building, access point, badge issue, and the time the problem happened.",
        },
        {
          id: "tools",
          question: "Who manages staff software and system access?",
          answer: "IT support handles account rights, shared tools, workstation issues, and school system access.",
        },
        {
          id: "documents",
          question: "Where do I ask for internal documents?",
          answer: "HR handles staff records, leave documents, onboarding papers, and contract-related requests.",
        },
      ],
      contacts: [
        { icon: "briefcase", title: "Human resources", phone: "+33 2 99 54 71 46", email: "hr.staff@rennes-sb.com" },
        { icon: "building", title: "Facilities", phone: "+33 2 99 54 74 22", email: "facilities@rennes-sb.com" },
        { icon: "wifi", title: "IT support", phone: "+33 2 99 54 67 10", email: "it.support@rennes-sb.com" },
      ],
      status: sharedStatus,
    };
  }

  return {
    quickActions: [
      { icon: "alertTriangle", title: "Urgent help", text: "Campus safety or emergency" },
      { icon: "wifi", title: "IT problem", text: "Wi-Fi, Moodle, or email" },
      { icon: "school", title: "Academic issue", text: "Grades, course, or timetable" },
    ],
    requestCategories: ["Urgent help", "IT problem", "Academic issue", "Lost student card", "Student services"],
    faqs: [
      {
        id: "card",
        question: "What if I lose my student card?",
        answer: "Contact student services with your full name and student email. They will confirm the replacement process.",
      },
      {
        id: "schedule",
        question: "Who can help if my timetable looks wrong?",
        answer: "Academic office can check course groups, timetable conflicts, room changes, and attendance questions.",
      },
      {
        id: "wifi",
        question: "Where do I get help with Wi-Fi or Moodle?",
        answer: "IT support can help with Wi-Fi access, Moodle login, school email, and password problems.",
      },
    ],
    contacts: [
      { icon: "users", title: "Student services", phone: "+33 2 99 54 81 12", email: "student.services@rennes-sb.com" },
      { icon: "school", title: "Academic office", phone: "+33 2 99 54 82 45", email: "academic.office@rennes-sb.com" },
      { icon: "wifi", title: "IT support", phone: "+33 2 99 54 67 10", email: "it.support@rennes-sb.com" },
    ],
    status: sharedStatus,
  };
}

const sharedStatus = [
  { name: "Wi-Fi", text: "Operational" },
  { name: "Moodle", text: "Operational" },
  { name: "Campus access", text: "Normal service" },
];

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
  margin: "8px 0 0",
  display: "flex",
  alignItems: "flex-start",
  gap: "6px",
  borderRadius: "12px",
  padding: "9px 11px",
  background: "#f9fbff",
  color: "#5f6b86",
  fontSize: "13px",
  fontWeight: "700",
  lineHeight: 1.4,
  overflowWrap: "anywhere",
};

const noteMark = {
  flexShrink: 0,
  color: "#1f57d6",
  fontWeight: "900",
};

const quickGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "14px",
  marginBottom: "16px",
};

const quickAction = {
  minWidth: 0,
  minHeight: "86px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  border: 0,
  borderRadius: "16px",
  padding: "14px",
  background: "white",
  color: "#111735",
  textAlign: "left",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const quickIcon = {
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

const quickTextBlock = {
  minWidth: 0,
  display: "grid",
  gap: "4px",
};

const quickTitle = {
  color: "#111735",
  fontSize: "17px",
  fontWeight: "800",
  lineHeight: 1.2,
  overflowWrap: "anywhere",
};

const quickText = {
  color: "#4d5872",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const contentGrid = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1.45fr) minmax(260px, 0.85fr)",
  gap: "16px",
};

const mainColumn = {
  minWidth: 0,
  display: "grid",
  gap: "16px",
};

const sideColumn = {
  minWidth: 0,
  display: "grid",
  alignContent: "start",
  gap: "16px",
};

const sectionCard = {
  minWidth: 0,
  background: "white",
  borderRadius: "18px",
  padding: "18px",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const sectionTitle = {
  margin: "0 0 14px",
  color: "#111735",
  fontSize: "20px",
  lineHeight: 1.2,
};

const sectionToggle = {
  width: "100%",
  minHeight: "44px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  border: 0,
  background: "transparent",
  color: "#111735",
  padding: 0,
  cursor: "pointer",
  textAlign: "left",
};

const faqGrid = {
  display: "grid",
  gap: "10px",
};

const faqCard = {
  borderRadius: "14px",
  background: "#f5f7fb",
};

const faqHeader = {
  width: "100%",
  minHeight: "50px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 26px",
  alignItems: "center",
  gap: "10px",
  border: 0,
  background: "transparent",
  padding: "12px",
  color: "#111735",
  cursor: "pointer",
  textAlign: "left",
};

const faqQuestion = {
  minWidth: 0,
  fontSize: "16px",
  fontWeight: "800",
  lineHeight: 1.3,
  overflowWrap: "anywhere",
};

const faqAnswer = {
  margin: 0,
  padding: "0 12px 14px",
  color: "#111735",
  fontSize: "15px",
  lineHeight: 1.5,
  overflowWrap: "anywhere",
};

const requestForm = {
  display: "grid",
  gap: "12px",
};

const fieldLabel = {
  display: "grid",
  gap: "6px",
  color: "#111735",
  fontSize: "14px",
  fontWeight: "800",
};

const field = {
  width: "100%",
  minHeight: "46px",
  border: "1px solid #d7deee",
  borderRadius: "13px",
  padding: "0 12px",
  background: "#f9fbff",
  color: "#111735",
  fontSize: "15px",
  boxSizing: "border-box",
};

const messageField = {
  ...field,
  minHeight: "104px",
  padding: "12px",
  resize: "vertical",
  fontFamily: "Arial, sans-serif",
};

const submitButton = {
  width: "fit-content",
  minHeight: "44px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: 0,
  borderRadius: "13px",
  padding: "0 16px",
  background: "#081a4a",
  color: "white",
  fontSize: "15px",
  fontWeight: "800",
  cursor: "pointer",
  boxShadow: "0 5px 16px rgba(8, 26, 74, 0.2)",
};

const confirmation = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "12px",
  borderRadius: "13px",
  padding: "12px",
  background: "#eefaf0",
  color: "#116331",
  fontSize: "15px",
  fontWeight: "800",
  lineHeight: 1.35,
};

const statusGrid = {
  display: "grid",
  gap: "10px",
};

const statusItem = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  borderRadius: "14px",
  padding: "12px",
  background: "#f5f7fb",
  textAlign: "center",
};

const statusDot = {
  width: "10px",
  height: "10px",
  flexShrink: 0,
  borderRadius: "50%",
  background: "#22a95a",
};

const statusTitle = {
  margin: 0,
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.25,
};

const statusText = {
  margin: "3px 0 0",
  color: "#4d5872",
  fontSize: "14px",
  fontWeight: "700",
  textAlign: "center",
};

const contactsGrid = {
  display: "grid",
  gap: "10px",
};

const contactCard = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  borderRadius: "14px",
  padding: "12px",
  background: "#f5f7fb",
  textAlign: "center",
};

const contactIcon = {
  width: "38px",
  height: "38px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const contactBody = {
  minWidth: 0,
  width: "100%",
};

const contactTitle = {
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.25,
};

const contactText = {
  margin: 0,
  color: "#111735",
  fontSize: "14px",
  lineHeight: 1.45,
  textAlign: "center",
  overflowWrap: "anywhere",
};

export default Help;
