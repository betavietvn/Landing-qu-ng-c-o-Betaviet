import { useState, useEffect } from "react";

export default function SocialSidebar() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    // Initial checks
    checkMobile();
    handleScroll();

    // Add event listeners
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isMobile) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Only keeping the back to top button */}
      <button
        onClick={scrollToTop}
        className={`block w-12 h-12 rounded-full overflow-hidden hover:opacity-90 transition-all transform ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
      >
        <img
          src="https://betaviet.vn/wp-content/uploads/2023/12/icon_top3.png"
          alt="Back to Top"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}
