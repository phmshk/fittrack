import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768; // Breakpoint for mobile devices from tailwindcss 768px and below

const getIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

/**
 * A custom hook that detects the current viewport width and whether it is less than the mobile breakpoint.
 * @returns A boolean indicating if the current viewport width is less than the mobile breakpoint.
 */
export const useBreakpoint = (): boolean => {
  const [isMobile, setIsMobile] = useState(getIsMobile());
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};
