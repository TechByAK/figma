export const USER_PROFILES = {
  guest: {
    name: "Guest",
    role: "Guest",
    avatar: "/images/guest.png",
  },
  naima: {
    name: "Naima",
    role: "Student sample",
    avatar: "/images/naima-figma.png",
  },
  student: {
    name: "Student",
    role: "Student",
    avatar: "/images/guest.png",
  },
  professor: {
    name: "Professor",
    role: "Professor",
    avatar: "/images/guest.png",
  },
  staff: {
    name: "Staff",
    role: "Staff",
    avatar: "/images/guest.png",
  },
};

export const ROLE_RULES = {
  student: {
    emailDomain: "@student.rennes-sb.com",
  },
  professor: {
    emailDomain: "@prof.rennes-sb.com",
  },
  staff: {
    emailDomain: "@staff.rennes-sb.com",
  },
};

export function getCurrentProfile() {
  const user = localStorage.getItem("user") || "guest";
  const storedName = localStorage.getItem("displayName");
  const profile = USER_PROFILES[user] || USER_PROFILES.guest;

  return {
    ...profile,
    name: storedName || profile.name,
  };
}

export function validatePrototypeCredentials(role, email) {
  const rule = ROLE_RULES[role];

  if (!rule) {
    return false;
  }

  return email.trim().toLowerCase().endsWith(rule.emailDomain);
}

export function getRoleCopy(user = localStorage.getItem("user") || "guest") {
  if (user === "professor") {
    return {
      studiesLabel: "Teachings",
      studiesTitle: "Teachings",
      studiesText: "Your classes, teaching material, and supervision documents will appear here.",
      helpText: "Contact faculty support, classroom services, or academic coordination.",
      newsLifeTitle: "Professor Life Update",
      welcomeText: "Your teaching schedule, campus resources, and faculty updates are available here.",
    };
  }

  if (user === "staff") {
    return {
      studiesLabel: "Departments",
      studiesTitle: "Departments",
      studiesText: "Your department resources, service documents, and internal updates will appear here.",
      helpText: "Contact staff support, IT services, or campus operations.",
      newsLifeTitle: "Staff Life Update",
      welcomeText: "Your staff updates, service information, and campus events are available here.",
    };
  }

  return {
    studiesLabel: "Studies",
    studiesTitle: "Studies",
    studiesText: "Your courses, grades, and study documents will appear here.",
    helpText: "Contact student support or check school services.",
    newsLifeTitle: "Student Life Update",
    welcomeText: "We are delighted to welcome you to this space dedicated to your academic and personal success.",
  };
}
