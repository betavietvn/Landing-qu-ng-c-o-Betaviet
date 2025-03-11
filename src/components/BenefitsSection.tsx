export default function BenefitsSection() {
  const benefits = [
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet1.jpg",
      title: "Thiết kế ĐỘC QUYỀN, cá nhân hóa theo gu của gia chủ",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet2.jpg",
      title: "Thi công TRỌN GÓI từ A-Z, không lo phát sinh",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet3.jpg",
      title: "Chất lượng CAO CẤP, chuẩn từng chi tiết",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet4.jpg",
      title: "Đội ngũ KTS & kỹ sư HÀNG ĐẦU Việt Nam",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet51.jpg",
      title: "Hơn 10000+ khách hàng đã lựa chọn Betaviet",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet6.jpg",
      title: "Hợp đồng minh bạch, chi tiết từng hạng mục",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet7.jpg",
      title: "Tiết kiệm thời gian, công sức, tối ưu chi phí",
    },
    {
      image: "https://betaviet.vn/wp-content/uploads/2025/03/khacbiet8.jpg",
      title: "Chăm sóc khách hàng tận tâm, đồng hành lâu dài",
    },
  ];

  return (
    <div
      className="py-16 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://betaviet.vn/wp-content/uploads/2025/01/back-box-4-20240627125157-mtx8u.jpg')",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          SỰ KHÁC BIỆT LÀM NÊN THƯƠNG HIỆU BETAVIET
        </h2>
        <div className="flex justify-center gap-1 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-6 h-6 text-[#B87B44]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Desktop grid - 4 columns */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg flex flex-col"
            >
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full aspect-[4/3] object-cover rounded-t-lg"
              />
              <div className="bg-[#bc7025] p-4">
                <p className="text-white text-center font-medium">
                  {benefit.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile grid - 2 columns */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg flex flex-col"
            >
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-full aspect-square object-cover rounded-t-lg"
              />
              <div className="bg-[#bc7025] p-2">
                <p className="text-white text-center text-xs font-medium">
                  {benefit.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
