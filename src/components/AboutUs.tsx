export default function AboutUs() {
  return (
    <div className="py-12 md:py-16 bg-white mb-8 md:mb-0">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-12">
          CHÚNG TÔI LÀ AI
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start mb-8">
          {/* Left side - Company info */}
          <div className="space-y-6 lg:col-span-1 col-span-full">
            <h3 className="text-xl font-bold text-[#B87B44]">
              BETAVIET - TỔNG THẦU THIẾT KẾ THI CÔNG CHUYÊN NGHIỆP HÀNG ĐẦU VIỆT
              NAM
            </h3>

            <p className="text-gray-700">
              Được thành lập từ 2009, Chúng tôi mong muốn cung cấp các giải pháp
              tối ưu nhất trong lĩnh vực tư vấn thiết kế và thi công xây dựng,
              đáp ứng đồng bộ nhu cầu của các Chủ đầu tư về các hạng mục Kiến
              trúc – Nội thất – Cảnh quan.
            </p>

            <p className="text-gray-700">
              Với 3 dịch vụ chính là tư vấn thiết kế, thi công xây dựng và cung
              cấp đồ nội thất – vật liệu xây dựng, Betaviet Group mang tới quý
              vị sự tiện lợi dễ dàng nhất trong việc hoàn thiện các công trình
              xây dựng.
            </p>
          </div>

          {/* Center - Map - Hidden on mobile */}
          <div className="hidden lg:flex justify-center">
            <img
              src="https://betaviet.vn/wp-content/uploads/2024/11/ban-dotrang-chu.jpg"
              alt="Vietnam Map"
              className="w-full max-w-[400px]"
            />
          </div>

          {/* Right side - Stats - Hidden on mobile */}
          <div className="hidden lg:block space-y-10">
            <div className="flex items-start gap-8">
              <span className="text-5xl font-bold text-[#B87B44] leading-none">
                15+
              </span>
              <span className="text-gray-700 text-lg leading-tight">
                THIẾT KẾ-THI CÔNG CAO CẤP
              </span>
            </div>

            <div className="flex items-start gap-8">
              <span className="text-5xl font-bold text-[#B87B44] leading-none">
                10000+
              </span>
              <span className="text-gray-700 text-lg leading-tight">
                CÔNG TRÌNH TRÊN KHẮP CẢ NƯỚC
              </span>
            </div>

            <div className="flex items-start gap-8">
              <span className="text-5xl font-bold text-[#B87B44] leading-none">
                550+
              </span>
              <span className="text-gray-700 text-lg leading-tight">
                NHÂN VIÊN VĂN PHÒNG, THỢ THI CÔNG VÀ SẢN XUẤT
              </span>
            </div>

            <div className="flex items-start gap-8">
              <span className="text-5xl font-bold text-[#B87B44] leading-none">
                10000+
              </span>
              <span className="text-gray-700 text-lg leading-tight">
                M2 SHOWROOM CUNG CẤP ĐỒ NỘI THẤT VÀ VẬT LIỆU XÂY DỰNG
              </span>
            </div>

            <div className="flex items-start gap-8">
              <span className="text-5xl font-bold text-[#B87B44] leading-none">
                3000+
              </span>
              <span className="text-gray-700 text-lg leading-tight">
                M2 NHÀ MÁY SẢN XUẤT ĐỒ GỖ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
