const NAIMA_SCHEDULE = {
    16: [
      {
        title: "Stellar Physics",
        location: "Bat. B • Salle 12",
        time: "9:30 AM — 11:30 AM",
        startHour: "9 AM",
        color: "#45c9d8",
      },
      {
        title: "Stellar Physics",
        location: "Cancelled",
        time: "1 PM — 3 PM",
        startHour: "1 PM",
        cancelled: true,
      },
      {
        title: "General relativity",
        location: "Bat. A • Salle 1",
        time: "5 PM — 6 PM",
        startHour: "5 PM",
      },
    ],
    17: [
      {
        title: "Business Analytics",
        location: "Bat. B • Salle 12",
        time: "9:30 AM — 11:30 AM",
        startHour: "9 AM",
        color: "#00c39a",
      },
      {
        title: "Change Management",
        location: "Bat. B • Salle 12",
        time: "2 PM — 3 PM",
        startHour: "2 PM",
        color: "#00c39a",
      },
    ],
    19: [
      {
        title: "Stellar Physics",
        location: "Bat. B • Salle 12",
        time: "9:30 AM — 11:30 AM",
        startHour: "1 PM",
      },
    ],
};

const SCHEDULES = {
  guest: {},
  student: {},
  professor: {},
  staff: {},
  naima: NAIMA_SCHEDULE,
};

export const SCHEDULE_HOURS = [
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

const EVENT_COLORS = [
  "#45c9d8",
  "#7c5cff",
  "#00c39a",
  "#ff9f43",
  "#e84393",
  "#006f86",
];

export function getScheduleForUser(user) {
  const baseSchedule = SCHEDULES[user] || {};
  const customSchedule = getCustomScheduleForUser(user);
  const days = new Set([
    ...Object.keys(baseSchedule),
    ...Object.keys(customSchedule),
  ]);

  return Array.from(days).reduce((schedule, day) => {
    schedule[day] = [
      ...(baseSchedule[day] || []),
      ...(customSchedule[day] || []).map((event, index) => ({
        ...event,
        custom: true,
        id: event.id || `legacy-${day}-${index}-${event.title}`,
      })),
    ];

    return schedule;
  }, {});
}

export function getEventsForDay(user, day) {
  return getScheduleForUser(user)[day] || [];
}

export function getNextScheduleEvent(user) {
  const schedule = getScheduleForUser(user);
  const days = Object.keys(schedule)
    .map(Number)
    .sort((a, b) => a - b);

  for (const day of days) {
    const events = schedule[day];

    if (events?.length) {
      return {
        day,
        ...events[0],
      };
    }
  }

  return null;
}

export function addScheduleEvent(user, day, event, options = {}) {
  const schedule = getCustomScheduleForUser(user);
  const monthLength = options.monthLength || 31;
  const targetDays = options.repeatWeekly
    ? Array.from(
        { length: Math.floor((monthLength - day) / 7) + 1 },
        (_, index) => day + index * 7
      )
    : [day];

  targetDays.forEach((targetDay, index) => {
    const events = schedule[targetDay] || [];

    schedule[targetDay] = [
      ...events,
      {
        ...event,
        color: event.color || getEventColor(event.title),
        id: `${Date.now()}-${targetDay}-${index}`,
      },
    ];
  });

  localStorage.setItem(getCustomScheduleKey(user), JSON.stringify(schedule));
}

export function updateScheduleEvent(user, day, eventId, nextEvent) {
  const schedule = getCustomScheduleForUser(user);
  const events = schedule[day] || [];

  schedule[day] = events.map((event) =>
    event.id === eventId
      ? {
          ...event,
          ...nextEvent,
          color: event.color || getEventColor(nextEvent.title),
          id: event.id,
        }
      : event
  );
  localStorage.setItem(getCustomScheduleKey(user), JSON.stringify(schedule));
}

export function deleteScheduleEvent(user, day, eventId) {
  const schedule = getCustomScheduleForUser(user);
  const events = schedule[day] || [];

  schedule[day] = events.filter((event) => event.id !== eventId);

  if (schedule[day].length === 0) {
    delete schedule[day];
  }

  localStorage.setItem(getCustomScheduleKey(user), JSON.stringify(schedule));
}

export function clearScheduleForUser(user) {
  localStorage.removeItem(getCustomScheduleKey(user));
}

export function clearScheduleDayForUser(user, day) {
  const schedule = getCustomScheduleForUser(user);

  delete schedule[day];
  localStorage.setItem(getCustomScheduleKey(user), JSON.stringify(schedule));
}

export function getEventSpan(event) {
  const startIndex = SCHEDULE_HOURS.indexOf(event.startHour);
  const endIndex = SCHEDULE_HOURS.indexOf(getEndHour(event));

  if (startIndex === -1 || endIndex === -1) {
    return 1;
  }

  return Math.max(1, endIndex - startIndex);
}

export function getNextHour(hour) {
  const index = SCHEDULE_HOURS.indexOf(hour);

  return SCHEDULE_HOURS[Math.min(index + 1, SCHEDULE_HOURS.length - 1)] || "10 AM";
}

function getEndHour(event) {
  return event.endHour || event.time?.split("—")[1]?.trim();
}

function getEventColor(title) {
  const value = Array.from(title || "").reduce(
    (hash, char) => hash + char.charCodeAt(0),
    0
  );

  return EVENT_COLORS[value % EVENT_COLORS.length];
}

function getCustomScheduleForUser(user) {
  try {
    const schedule = JSON.parse(localStorage.getItem(getCustomScheduleKey(user))) || {};

    return normalizeCustomSchedule(user, schedule);
  } catch {
    return {};
  }
}

function getCustomScheduleKey(user) {
  return `customSchedule:${user}`;
}

function normalizeCustomSchedule(user, schedule) {
  let changed = false;
  const normalizedSchedule = Object.entries(schedule).reduce((nextSchedule, [day, events]) => {
    nextSchedule[day] = (events || []).map((event, index) => {
      if (event.id) {
        return event;
      }

      changed = true;
      return {
        ...event,
        id: `legacy-${day}-${index}-${event.title}`,
      };
    });

    return nextSchedule;
  }, {});

  if (changed) {
    localStorage.setItem(getCustomScheduleKey(user), JSON.stringify(normalizedSchedule));
  }

  return normalizedSchedule;
}
