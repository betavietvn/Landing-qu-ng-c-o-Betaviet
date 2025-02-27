import { Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#B87B44] text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img
              src="https://betaviet.vn/wp-content/uploads/2023/12/logo-betaviet.svg"
              alt="BetaViet"
              className="h-12 brightness-0 invert"
            />
            <div className="space-y-2">
              <p>Toà nhà Betaviet, KĐT Thanh Hà Cienco5,</p>
              <p>Q. Hà Đông, TP. Hà Nội</p>
              <p>Hotline: 0915010800</p>
              <p>Khiếu nại: 0968905551</p>
              <p>Văn phòng: 0241224526</p>
              <p>Email: lienhe@betaviet.vn</p>
              <p>Website: https://betaviet.vn</p>
            </div>
            <div>
              <p>Giấy chứng nhận đăng ký doanh nghiệp:</p>
              <p>0104224526 do Sở kế hoạch và đầu tư</p>
              <p>thành phố Hà Nội Cấp lần đầu ngày</p>
              <p>26/10/2009</p>
            </div>
          </div>

          {/* Northern Region */}
          <div>
            <h3 className="text-xl font-bold mb-4">KHU VỰC MIỀN BẮC</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">HÀ NỘI</h4>
                <p>Toà nhà Betaviet, KĐT Thanh Hà Cienco5,</p>
                <p>Q. Hà Đông, TP. Hà Nội</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">HẢI DƯƠNG</h4>
                <p>Số 118, đường Thanh Bình, thành phố</p>
                <p>Hải Dương</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">BẮC NINH</h4>
                <p>99 Đường Lê Thánh Tông, Phường Võ</p>
                <p>Cường, TP.Bắc Ninh</p>
              </div>
            </div>
          </div>

          {/* Southern Region */}
          <div>
            <h3 className="text-xl font-bold mb-4">KHU VỰC MIỀN NAM</h3>
            <div>
              <h4 className="font-bold mb-2">TP HỒ CHÍ MINH</h4>
              <p>03.22, Lầu 3 toà nhà Asiana Capella, 184</p>
              <p>Trần Văn Kiểu, Quận 6, TP.HCM</p>
            </div>
          </div>

          {/* Central Region */}
          <div>
            <h3 className="text-xl font-bold mb-4">KHU VỰC MIỀN TRUNG</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold mb-2">THANH HÓA</h4>
                <p>125 Bùi Đạt, Phường An Hoạch Thành</p>
                <p>phố Thanh Hoá</p>
              </div>
              <div>
                <h4 className="font-bold mb-2">NGHỆ AN</h4>
                <p>LK5-05, Khu liên kế Trường Thịnh Phát,</p>
                <p>Đ. Trường Văn Linh, TP. Vinh, Nghệ An</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="text-sm">
              Copyright © Betaviet since 2009, Alright reserverd. Thương hiệu
              đã được đăng ký. © Ghi rõ nguồn "https://betaviet.vn" khi phát
              hành lại thông tin từ website này.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/nhadepbetaviet"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://zalo.me/0963646398"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <img
                  src="/zalo-icon.png"
                  alt="Zalo"
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=84968905551"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <img
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>
              <a
                href="https://www.tiktok.com/@betaviet.vn_0915010800"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <img
                  src="/tiktok-icon.png"
                  alt="TikTok"
                  className="w-6 h-6 brightness-0 invert"
                />
              </a>
              <a
                href="https://www.youtube.com/@BetavietTV"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/80"
              >
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
