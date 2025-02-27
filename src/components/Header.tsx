import { Link } from "react-router-dom";

export default function Header() {
  const menuItems = [
    { label: "TRANG CHỦ", href: "https://betaviet.vn/" },
    { label: "KHUYẾN MÃI", href: "https://betaviet.vn/vlanding-mau-1/" },
    { label: "DỰ ÁN KIẾN TRÚC", href: "#" },
    { label: "DỰ ÁN NỘI THẤT", href: "#" },
    { label: "THẨM CÔNG TRÌNH", href: "#" },
    { label: "VIDEO REVIEW", href: "#" },
    { label: "QUY TRÌNH", href: "#" },
    { label: "LIÊN HỆ", href: "#" },
  ];

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
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
