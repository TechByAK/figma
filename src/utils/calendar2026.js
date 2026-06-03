export const MONTHS_2026 = [
  "January 2026",
  "February 2026",
  "March 2026",
  "April 2026",
  "May 2026",
  "June 2026",
  "July 2026",
  "August 2026",
  "September 2026",
  "October 2026",
  "November 2026",
  "December 2026",
];

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const FULL_WEEKDAY_LABELS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function getDaysInMonth2026(monthIndex) {
  return new Date(2026, monthIndex + 1, 0).getDate();
}

export function getMondayFirstWeekdayIndex(monthIndex, day) {
  return (new Date(2026, monthIndex, day).getDay() + 6) % 7;
}

export function getWeekdayName2026(monthIndex, day) {
  return FULL_WEEKDAY_LABELS[getMondayFirstWeekdayIndex(monthIndex, day)];
}

export function getVisibleWeekDays2026(monthIndex, selectedDay) {
  const monthLength = getDaysInMonth2026(monthIndex);
  const weekdayIndex = getMondayFirstWeekdayIndex(monthIndex, selectedDay);
  const weekStart = selectedDay - weekdayIndex;

  return WEEKDAY_LABELS.map((label, index) => {
    const number = weekStart + index;

    return {
      label,
      number: number >= 1 && number <= monthLength ? number : null,
    };
  });
}
