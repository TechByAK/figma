import Home from "./Home";
import Dashboard from "./Dashboard";
import useScreenSize from "../hooks/useScreenSize";

function ResponsiveDashboard() {
  const isDesktop = useScreenSize();

  return isDesktop ? <Dashboard /> : <Home />;
}

export default ResponsiveDashboard;