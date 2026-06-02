import { useEffect, useState } from "react";

function useScreenSize() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 900);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
}

export default useScreenSize;