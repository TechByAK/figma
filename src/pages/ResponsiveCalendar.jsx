import Calendar from "./Calendar";
import DesktopCalendar from "./DesktopCalendar";
import useScreenSize from "../hooks/useScreenSize";

function ResponsiveCalendar() {
  const isDesktop = useScreenSize();

  return isDesktop ? <DesktopCalendar /> : <Calendar />;
}

export default ResponsiveCalendar;