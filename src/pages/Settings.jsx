import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIcon from "../components/AppIcon";
import DesktopLayout from "../components/DesktopLayout";
import MobilePageLayout from "../components/MobilePageLayout";
import useScreenSize from "../hooks/useScreenSize";
import { getCurrentProfile } from "../utils/users";

function Settings() {
  const navigate = useNavigate();
  const isDesktop = useScreenSize();
  const user = localStorage.getItem("user") || "guest";
  const profile = getCurrentProfile();
  const contact = getDepartmentContact(user);

  function logout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  if (!isDesktop) {
    return (
      <MobilePageLayout title="Settings">
        <section style={mobilePanel}>
          <SettingsContent contact={contact} profile={profile} user={user} />

          <button onClick={logout} style={dangerButton}>
            <AppIcon name="logout" size={21} />
            <span>Logout</span>
          </button>
        </section>
      </MobilePageLayout>
    );
  }

  return (
    <DesktopLayout>
      <section style={panel}>
        <h1 style={title}>Settings</h1>
        <SettingsContent contact={contact} profile={profile} user={user} />

        <button onClick={logout} style={dangerButton}>
          <AppIcon name="logout" size={21} />
          <span>Logout</span>
        </button>
      </section>
    </DesktopLayout>
  );
}

function SettingsContent({ contact, profile, user }) {
  const [openSection, setOpenSection] = useState(null);
  const [resetMessage, setResetMessage] = useState("");
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installMessage, setInstallMessage] = useState(getInstallGuidance());
  const account = getAccountDetails(user, profile);
  const policies = getPolicies(user);

  useEffect(() => {
    function handleBeforeInstallPrompt(event) {
      event.preventDefault();
      setInstallPrompt(event);
      setInstallMessage("");
    }

    function handleAppInstalled() {
      setInstallPrompt(null);
      setInstallMessage("App added. You can now open it from your home screen or desktop.");
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  async function handleInstallClick() {
    if (isAppInstalled()) {
      setInstallMessage("This app is already running as an installed app.");
      return;
    }

    if (installPrompt) {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;

      setInstallPrompt(null);
      setInstallMessage(
        choice?.outcome === "accepted"
          ? "Install started. Check your home screen or app list."
          : getInstallGuidance()
      );
      return;
    }

    if (isIOSDevice() && navigator.share) {
      try {
        await navigator.share({
          title: "Rennes School App",
          text: "Add this prototype to your home screen.",
          url: window.location.href,
        });
      } catch {
        setInstallMessage(getInstallGuidance());
        return;
      }
    }

    setInstallMessage(getInstallGuidance());
  }

  function toggleSection(section) {
    setOpenSection((current) => (current === section ? null : section));
  }

  return (
    <div style={settingsGrid}>
      <SettingCard
        icon="user"
        isOpen={openSection === "profile"}
        onToggle={() => toggleSection("profile")}
        title="Profile"
      >
        <div style={profileSummary}>
          <img src={profile.avatar} alt="" style={profileAvatar} />
          <div style={profileIdentity}>
            <h2 style={profileName}>{profile.name}</h2>
            <p style={profileRole}>{account.roleLabel}</p>
          </div>
        </div>

        <div style={detailGrid}>
          <ProfileDetail label="Account type" value={account.accountType} />
          <ProfileDetail label="University email" value={account.emailPattern} />
          <ProfileDetail label="Campus" value="Rennes" />
          <ProfileDetail label="Session status" value="Active" />
          {account.extraDetails.map((detail) => (
            <ProfileDetail key={detail.label} label={detail.label} value={detail.value} />
          ))}
        </div>

        <div style={sessionNote}>
          <AppIcon name="shieldCheck" size={19} />
          <span>{account.sessionNote}</span>
        </div>
      </SettingCard>

      <SettingCard
        icon="phone"
        isOpen={openSection === "contact"}
        onToggle={() => toggleSection("contact")}
        title="Contact"
      >
        <p style={text}>
          <span style={detailLabel}>Department phone</span>
          {contact.phone}
        </p>
        <p style={text}>
          <span style={detailLabel}>Email</span>
          {contact.email}
        </p>
      </SettingCard>

      <SettingCard
        icon="fileText"
        isOpen={openSection === "policies"}
        onToggle={() => toggleSection("policies")}
        title="Policies"
      >
        <div style={policyGrid}>
          {policies.map((policy) => (
            <PolicyRow centered key={policy.title} policy={policy} />
          ))}
        </div>
        <p style={policyNote}>Prototype policy information for app demonstration. Official rules should be checked through Rennes School of Business services.</p>
      </SettingCard>

      <SettingCard
        icon="download"
        isOpen={openSection === "pwa"}
        onToggle={() => toggleSection("pwa")}
        title="Install app"
      >
        <button
          onClick={handleInstallClick}
          style={installButton}
          type="button"
        >
          <AppIcon name="download" size={18} />
          <span>Install app</span>
        </button>
        <p style={installNote}>
          <span style={noteMarker}>*</span>
          <span>{installMessage || getInstallGuidance()}</span>
        </p>
      </SettingCard>

      <SettingCard
        icon="help"
        isOpen={openSection === "prototype"}
        onToggle={() => toggleSection("prototype")}
        title="About prototype"
      >
        <div style={policyGrid}>
          <PolicyRow
            centered
            policy={{
              icon: "presentation",
              title: "Project purpose",
              text: "This app is a university prototype created to demonstrate a digital campus experience.",
            }}
          />
          <PolicyRow
            centered
            policy={{
              icon: "user",
              title: "Simulated login",
              text: "Student, professor, staff, guest, and Naima accounts are demo identities, not real university accounts.",
            }}
          />
          <PolicyRow
            centered
            policy={{
              icon: "calendar",
              title: "Prototype data",
              text: "Schedules, notifications, news, policies, services, contacts, and profile details are sample data.",
            }}
          />
          <PolicyRow
            centered
            policy={{
              icon: "shieldCheck",
              title: "No real validation",
              text: "Email domain checks are used only to simulate role access for the presentation.",
            }}
          />
        </div>
      </SettingCard>

      <SettingCard
        icon="trash"
        isOpen={openSection === "reset"}
        onToggle={() => toggleSection("reset")}
        title="Demo data"
      >
        <NoteText>Reset custom schedules and read notifications before a presentation.</NoteText>
        <button
          onClick={() => {
            clearDemoData();
            setResetMessage("Demo data cleared. Your current login was kept.");
          }}
          style={resetButton}
          type="button"
        >
          <AppIcon name="trash" size={18} />
          <span>Clear demo data</span>
        </button>
        {resetMessage && <p style={resetMessageStyle}>{resetMessage}</p>}
      </SettingCard>
    </div>
  );
}

function isIOSDevice() {
  if (typeof window === "undefined") return false;

  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isAppInstalled() {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function getInstallGuidance() {
  if (typeof window === "undefined") {
    return "Use your browser install option to add the app to your home screen.";
  }

  if (isAppInstalled()) {
    return "The app is already installed on this device.";
  }

  if (isIOSDevice()) {
    return "On iPhone, tap Share, then choose Add to Home Screen.";
  }

  return "If no install prompt opens, use your browser menu and choose Install app or Add to Home Screen.";
}

function SettingCard({ children, icon, isOpen, onToggle, title }) {
  return (
    <div style={settingCard}>
      <button
        aria-expanded={isOpen}
        onClick={onToggle}
        style={settingHeader}
        type="button"
      >
        <span style={settingIcon}>
          <AppIcon name={icon} size={21} />
        </span>
        <span style={settingTitle}>{title}</span>
        <span style={chevronIcon}>
          <AppIcon name={isOpen ? "chevronUp" : "chevronDown"} size={21} />
        </span>
      </button>
      {isOpen && <div style={settingDetails}>{children}</div>}
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <p style={detailItem}>
      <span style={detailLabel}>{label}</span>
      {value}
    </p>
  );
}

function NoteText({ children }) {
  return (
    <p style={installNote}>
      <span style={noteMarker}>*</span>
      <span>{children}</span>
    </p>
  );
}

function PolicyRow({ centered = false, policy }) {
  return (
    <article style={centered ? centeredPolicyRow : policyRow}>
      <span style={policyIcon}>
        <AppIcon name={policy.icon} size={20} />
      </span>
      <div style={centered ? centeredPolicyBody : policyBody}>
        <h3 style={policyTitle}>{policy.title}</h3>
        <p style={policyText}>{policy.text}</p>
      </div>
    </article>
  );
}

function getAccountDetails(user, profile) {
  if (user === "naima") {
    return {
      accountType: "Sample student profile",
      emailPattern: "naima@student.rennes-sb.com",
      extraDetails: [
        { label: "Faculty", value: "School of Management" },
        { label: "Major", value: "International Business" },
        { label: "Student ID", value: "RSB-2026-1048" },
      ],
      roleLabel: profile.role,
      sessionNote: "You are viewing the saved Naima sample account.",
    };
  }

  if (user === "professor") {
    return {
      accountType: "Prototype professor account",
      emailPattern: "name@prof.rennes-sb.com",
      extraDetails: [
        { label: "Faculty", value: "Marketing & Strategy" },
        { label: "Position", value: "Associate Professor" },
      ],
      roleLabel: "Professor",
      sessionNote: "Professor session connected with prototype university credentials.",
    };
  }

  if (user === "staff") {
    return {
      accountType: "Prototype staff account",
      emailPattern: "name@staff.rennes-sb.com",
      extraDetails: [],
      roleLabel: "Staff",
      sessionNote: "Staff session connected with prototype university credentials.",
    };
  }

  if (user === "student") {
    return {
      accountType: "Prototype student account",
      emailPattern: "name@student.rennes-sb.com",
      extraDetails: [
        { label: "Faculty", value: "School of Management" },
        { label: "Major", value: "International Business" },
        { label: "Student ID", value: "RSB-2026-0001" },
      ],
      roleLabel: "Student",
      sessionNote: "Student session connected with prototype university credentials.",
    };
  }

  return {
    accountType: "Guest access",
    emailPattern: "No university email connected",
    extraDetails: [],
    roleLabel: profile.role,
    sessionNote: "Guest mode is limited and does not use university credentials.",
  };
}

function getPolicies(user) {
  const presenceTitle = user === "staff" ? "Working presence" : user === "professor" ? "Teaching presence" : "Attendance";

  return [
    {
      icon: "shieldCheck",
      title: "Privacy & data",
      text: "Profile and schedule data are handled as prototype information for this app experience.",
    },
    {
      icon: "calendar",
      title: presenceTitle,
      text: "Schedule, class, course, or task information should be checked regularly for updates.",
    },
    {
      icon: "wifi",
      title: "Digital services",
      text: "School accounts, Wi-Fi, email, and learning platforms should be used responsibly.",
    },
    {
      icon: "building",
      title: "Campus conduct",
      text: "Campus spaces, classrooms, offices, and shared services should be used respectfully.",
    },
  ];
}

function getDepartmentContact(user) {
  if (user === "professor") {
    return {
      phone: "+33 2 99 54 63 28",
      email: "faculty.support@rennes-sb.com",
    };
  }

  if (user === "staff") {
    return {
      phone: "+33 2 99 54 71 46",
      email: "staff.department@rennes-sb.com",
    };
  }

  return {
    phone: "+33 2 99 54 81 12",
    email: "student.services@rennes-sb.com",
  };
}

function clearDemoData() {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith("customSchedule:") || key.startsWith("readNotifications:") || key.startsWith("urgentNotifications:")) {
      localStorage.removeItem(key);
    }
  });
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
  padding: "20px",
};

const title = {
  margin: "0 0 14px",
  lineHeight: 1.15,
  color: "#111735",
};

const text = {
  margin: 0,
  lineHeight: 1.6,
  color: "#111735",
  fontSize: "17px",
  overflowWrap: "anywhere",
};

const settingsGrid = {
  display: "grid",
  gap: "14px",
};

const settingCard = {
  background: "white",
  borderRadius: "16px",
  padding: "8px",
  boxShadow: "0 4px 14px rgba(20, 25, 50, 0.1)",
};

const settingHeader = {
  width: "100%",
  minHeight: "58px",
  display: "grid",
  gridTemplateColumns: "44px minmax(0, 1fr) 32px",
  alignItems: "center",
  gap: "10px",
  background: "transparent",
  border: 0,
  padding: "6px 8px",
  color: "#111735",
  cursor: "pointer",
  textAlign: "left",
};

const settingIcon = {
  width: "42px",
  height: "42px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "13px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const settingTitle = {
  minWidth: 0,
  color: "#111735",
  fontSize: "20px",
  fontWeight: "800",
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

const settingDetails = {
  display: "grid",
  gap: "8px",
  padding: "4px 12px 14px clamp(12px, 7vw, 62px)",
};

const profileSummary = {
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  gap: "12px",
  borderRadius: "16px",
  padding: "14px",
  background: "#f5f7fb",
};

const profileAvatar = {
  width: "58px",
  height: "58px",
  flexShrink: 0,
  borderRadius: "50%",
  objectFit: "cover",
};

const profileIdentity = {
  minWidth: 0,
};

const profileName = {
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "21px",
  lineHeight: 1.2,
  overflowWrap: "anywhere",
};

const profileRole = {
  margin: 0,
  color: "#4d5872",
  fontSize: "15px",
  fontWeight: "800",
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const detailGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "10px",
};

const detailItem = {
  margin: 0,
  borderRadius: "14px",
  padding: "12px",
  background: "#f9fbff",
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

const sessionNote = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  borderRadius: "14px",
  padding: "12px",
  background: "#eefaf0",
  color: "#116331",
  fontSize: "15px",
  fontWeight: "800",
  lineHeight: 1.4,
};

const policyGrid = {
  display: "grid",
  gap: "10px",
};

const policyRow = {
  minWidth: 0,
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  borderRadius: "14px",
  padding: "12px",
  background: "#f5f7fb",
};

const centeredPolicyRow = {
  ...policyRow,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const policyIcon = {
  width: "40px",
  height: "40px",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  color: "#1f57d6",
  background: "#eef4ff",
};

const policyBody = {
  minWidth: 0,
};

const centeredPolicyBody = {
  ...policyBody,
  textAlign: "center",
};

const policyTitle = {
  margin: "0 0 4px",
  color: "#111735",
  fontSize: "16px",
  lineHeight: 1.25,
};

const policyText = {
  margin: 0,
  color: "#111735",
  fontSize: "14px",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const policyNote = {
  margin: "2px 0 0",
  color: "#4d5872",
  fontSize: "14px",
  fontWeight: "700",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const installNote = {
  width: "100%",
  maxWidth: "520px",
  margin: "10px 0 0",
  display: "flex",
  alignItems: "flex-start",
  gap: "7px",
  color: "#5f6b86",
  fontSize: "12px",
  fontWeight: "800",
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};

const noteMarker = {
  color: "#1f57d6",
  fontSize: "14px",
  lineHeight: 1,
  marginTop: "2px",
};

const dangerButton = {
  marginTop: "20px",
  minHeight: "52px",
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  background: "#ff5757",
  color: "white",
  border: 0,
  borderRadius: "14px",
  padding: "0 20px",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(255, 87, 87, 0.22)",
};

const resetButton = {
  width: "fit-content",
  minHeight: "44px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: 0,
  borderRadius: "13px",
  padding: "0 14px",
  background: "#ff5757",
  color: "white",
  fontSize: "14px",
  fontWeight: "800",
  cursor: "pointer",
};

const installButton = {
  ...resetButton,
  background: "#081a4a",
};

const resetMessageStyle = {
  margin: 0,
  color: "#116331",
  fontSize: "14px",
  fontWeight: "800",
};

export default Settings;
