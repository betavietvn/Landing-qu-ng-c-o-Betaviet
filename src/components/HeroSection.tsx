import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative h-[600px] bg-[url('https://betaviet.vn/wp-content/uploads/2025/01/backgroup3.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 py-20 text-white">
          <div className="flex flex-col gap-8 max-w-2xl">
            <img
              src="https://betaviet.vn/wp-content/uploads/2025/01/silder-box-1-20240627133734-hmnz9.png"
              alt="Xây nhà trọn gói"
              className="w-[500px]"
            />

            <div className="text-2xl font-semibold">
              QUY TỤ CÁC KIẾN TRÚC SƯ, NHÀ THẦU,
              <br />
              NHÀ CUNG CẤP HÀNG ĐẦU VIỆT NAM
            </div>

            <ul className="space-y-2">
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
        </div>
      </div>
    </div>
  );
}
