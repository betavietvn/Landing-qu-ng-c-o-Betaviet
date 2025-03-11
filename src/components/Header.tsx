import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "KHUYẾN MÃI", href: "https://betaviet.vn/vlanding-mau-1/" },
    { label: "DỰ ÁN KIẾN TRÚC", href: "#architecture-projects" },
    { label: "DỰ ÁN NỘI THẤT", href: "#interior-projects" },
    { label: "THĂM CÔNG TRÌNH", href: "#construction-visit" },
    { label: "VIDEO REVIEW", href: "#video-review" },
    { label: "QUY TRÌNH", href: "#process-flow" },
    { label: "LIÊN HỆ", href: "#register-section" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="https://betaviet.vn/" className="flex-shrink-0">
            <img
              src="https://betaviet.vn/wp-content/uploads/2023/12/logo-betaviet.svg"
              alt="BetaViet"
              className="h-12"
            />
          </a>

          <nav className="hidden lg:flex space-x-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-[#B87B44] font-medium text-sm"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    const element = document.getElementById(
                      item.href.substring(1),
                    );
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="tel:0915010800"
              className="text-[#B87B44] font-medium flex items-center gap-1 text-sm"
            >
              <Phone size={16} /> Hotline: 0915.010.800
            </a>
            <button
              className="lg:hidden text-gray-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <a
                href="tel:0915010800"
                className="text-[#B87B44] font-medium flex items-center gap-2 py-2 border-b border-gray-100"
              >
                <Phone size={16} /> Hotline: 0915.010.800
              </a>
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-[#B87B44] font-medium text-sm py-2 border-b border-gray-100"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item.href.startsWith("#")) {
                      const element = document.getElementById(
                        item.href.substring(1),
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
