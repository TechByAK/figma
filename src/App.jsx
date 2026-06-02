import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import DesktopCalendar from "./pages/DesktopCalendar";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/desktop-calendar" element={<DesktopCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;