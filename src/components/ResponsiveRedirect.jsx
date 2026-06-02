import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ResponsiveRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    function checkScreen() {
      if (window.innerWidth >= 900) {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    }

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, [navigate]);

  return null;
}

export default ResponsiveRedirect;