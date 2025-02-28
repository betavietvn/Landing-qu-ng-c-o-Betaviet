export default function RegisterSection() {
  return (
    <div
      className="min-h-[600px] bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url(https://betaviet.vn/wp-content/uploads/2025/01/background-slider-20240627100454-cbiq.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="col-span-2 text-white space-y-6">
            <div className="flex items-center gap-4">
              <img
                src="https://betaviet.vn/wp-content/uploads/2025/01/silder-box-1-20240627133734-hmnz9.png"
                alt="Xây nhà trọn gói"
                className="w-[500px]"
              />
            </div>
            <div className="text-xl font-bold">
              QUY TỤ CÁC KIẾN TRÚC SƯ, NHÀ THẦU,
              <br />
              NHÀ CUNG CẤP HÀNG ĐẦU VIỆT NAM
            </div>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
                Miễn phí 100% thiết kế khi thi công trọn gói
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
                Miễn phí 100% thiết kế khi thi công trọn gói
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
                Miễn phí 100% thiết kế khi thi công trọn gói
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
                Miễn phí 100% thiết kế khi thi công trọn gói
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rotate-45"></div>
                Miễn phí 100% thiết kế khi thi công trọn gói
              </li>
            </ul>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">
              ĐĂNG KÝ
              <br />
              NHẬN ƯU ĐÃI
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Họ & Tên*"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="tel"
                placeholder="Số điện thoại*"
                className="w-full p-3 border rounded-md"
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                className="w-full p-3 border rounded-md"
              />
              <textarea
                placeholder="Nội dung cần tư vấn"
                className="w-full p-3 border rounded-md min-h-[120px]"
              ></textarea>
              <button className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors">
                BẤM GỬI ĐI
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
