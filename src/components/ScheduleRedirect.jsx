import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ScheduleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth >= 900) {
      navigate("/desktop-calendar");
    } else {
      navigate("/calendar");
    }
  }, [navigate]);

  return null;
}

export default ScheduleRedirect;
