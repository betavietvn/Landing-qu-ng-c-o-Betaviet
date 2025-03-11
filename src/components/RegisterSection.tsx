export default function RegisterSection() {
  return (
    <div
      id="register-section"
      className="min-h-[900px] md:min-h-[600px] bg-cover bg-center relative py-12 md:py-0"
      style={{
        backgroundImage:
          "url(https://betaviet.vn/wp-content/uploads/2025/01/thiet-ke-phong-khach-can-ho-hien-dai-penthouse-nt24721-4.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black/50 flex items-start md:items-center overflow-y-auto md:overflow-visible">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 md:py-0">
          {/* Left Column */}
          <div className="text-white space-y-4 lg:space-y-6">
            <h2 className="text-xl md:text-3xl font-bold">
              🏡 BETAVIET – BIẾN MỌI Ý TƯỞNG THÀNH HIỆN THỰC!
            </h2>
            <p className="text-base lg:text-lg">
              Betaviet – Đơn vị hàng đầu trong thiết kế & thi công trọn gói biệt
              thự, nội thất, sân vườn. Với hơn 15 năm kinh nghiệm, chúng tôi cam
              kết mang đến không gian sống đẳng cấp, bền vững và khác biệt.
            </p>
            <ul className="space-y-2 lg:space-y-4 text-base lg:text-lg">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <span>Đội ngũ kiến trúc sư hàng đầu Việt Nam</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <span>
                  Quy tụ nhà thầu thi công chất lượng, chuyên nghiệp và uy tin
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✅</span>
                <span>
                  Hệ thống nhà cung cấp đồ nội thất, vật liệu và thiết bị chính
                  hãng
                </span>
              </li>
            </ul>
            <p className="text-base lg:text-lg">
              <span className="text-blue-400 font-bold">🔹</span> Bạn đã sẵn
              sàng để sở hữu một không gian sống xứng tầm?
            </p>
            <p className="text-base lg:text-lg">
              <span className="text-red-500 font-bold">📞</span> Liên hệ ngay:
              0915010800 để được tư vấn miễn phí!
            </p>
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
              <button className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors font-bold">
                BẤM GỬI ĐI
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
