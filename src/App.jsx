import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import DesktopCalendar from "./pages/DesktopCalendar";
import Studies from "./pages/Studies";
import Help from "./pages/Help";
import News from "./pages/News";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/desktop-calendar" element={<DesktopCalendar />} />
        <Route path="/studies" element={<Studies />} />
        <Route path="/help" element={<Help />} />
        <Route path="/news" element={<News />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;