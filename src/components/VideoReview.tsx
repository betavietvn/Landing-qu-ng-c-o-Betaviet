import { Button } from "@/components/ui/button";

export default function VideoReview() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          VIDEO Review Công trình
        </h2>

        <p className="text-center mb-12 max-w-3xl mx-auto">
          Những <span className="font-bold">dự án thi công thực tế</span> được{" "}
          <span className="font-bold">quay và ghi hình trực tiếp</span> khi hoàn
          thành và đưa vào sử dụng.
          <br />
          Đây sẽ là những <span className="font-bold">
            minh chứng rõ nét
          </span>{" "}
          để quý khách hàng cảm nhận về công trình do{" "}
          <span className="font-bold">Betaviet Group</span> thiết kế và thi
          công.
        </p>

        {/* Mobile layout - stacked with large video on top */}
        <div className="md:hidden space-y-4 mb-6">
          {/* Large video on top */}
          <div className="relative group cursor-pointer">
            <a
              href="https://www.youtube.com/watch?v=LIivC_O1iYo"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="https://betaviet.vn/wp-content/uploads/2024/11/z5441835544001_b38b6291a3d0bfbc54245462b7ce8aa4.jpg"
                alt="600M2 BIỆT THỰ LÔ GÓC GỖ QUÝ"
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Two smaller videos in a grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group cursor-pointer">
              <a
                href="https://www.youtube.com/watch?v=LIivC_O1iYo"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://betaviet.vn/wp-content/uploads/2024/11/geleximco-chi-van-anh-550x380-1.jpg"
                  alt="NỘI THẤT GỖ ÓC CHÓ"
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="relative group cursor-pointer">
              <a
                href="https://www.youtube.com/watch?v=LIivC_O1iYo"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src="https://betaviet.vn/wp-content/uploads/2024/11/dot-nhap-biet-thu-vip-nhat-vinhomes-ocean-park-voi-noi-that-sieu-dat-do.jpg"
                  alt="BIỆT THỰ VIP NHẤT VINHOMES OCEAN PARK"
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12 gap-6 mb-6">
          {/* Left large video */}
          <div className="col-span-7 relative group cursor-pointer h-full">
            <a
              href="https://www.youtube.com/watch?v=LIivC_O1iYo"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <img
                src="https://betaviet.vn/wp-content/uploads/2024/11/z5441835544001_b38b6291a3d0bfbc54245462b7ce8aa4.jpg"
                alt="600M2 BIỆT THỰ LÔ GÓC GỖ QUÝ"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
          </div>

          {/* Right column with two videos */}
          <div className="col-span-5 flex flex-col justify-between space-y-6">
            <div className="relative group cursor-pointer h-[calc(50%-12px)]">
              <a
                href="https://www.youtube.com/watch?v=LIivC_O1iYo"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src="https://betaviet.vn/wp-content/uploads/2024/11/geleximco-chi-van-anh-550x380-1.jpg"
                  alt="NỘI THẤT GỖ ÓC CHÓ"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="relative group cursor-pointer h-[calc(50%-12px)]">
              <a
                href="https://www.youtube.com/watch?v=LIivC_O1iYo"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src="https://betaviet.vn/wp-content/uploads/2024/11/dot-nhap-biet-thu-vip-nhat-vinhomes-ocean-park-voi-noi-that-sieu-dat-do.jpg"
                  alt="BIỆT THỰ VIP NHẤT VINHOMES OCEAN PARK"
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="https://betaviet.vn/du-an-trang-tri-noi-that/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
            >
              Xem thêm Video
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
