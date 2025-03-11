import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative h-[600px] md:h-[600px] bg-[url('https://betaviet.vn/wp-content/uploads/2025/01/backgroup3.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 py-20 text-white">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="text-lg">
              <p className="mb-3">
                Bạn muốn sở hữu biệt thự đẳng cấp, sang trọng, chuẩn phong thủy
                nhưng lại gặp quá nhiều vấn đề:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span>Chưa tìm được thiết kế ưng ý, đúng gu thẩm mỹ?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span>
                    Nhà thầu thiếu kinh nghiệm, thi công chậm trễ, phát sinh chi
                    phí?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span>
                    Không biết lựa chọn vật liệu nào để đảm bảo chất lượng và độ
                    bền lâu dài?
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">❌</span>
                  <span>
                    Lo lắng về cảnh quan sân vườn không hài hòa với tổng thể
                    biệt thự?
                  </span>
                </li>
              </ul>

              <p className="mb-3">
                Nếu không có một đơn vị chuyên nghiệp đồng hành, bạn có thể phải
                đối mặt với:
              </p>

              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span>
                    Bản vẽ thiết kế không thực tế, gây khó khăn trong quá trình
                    thi công.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span>
                    Thi công kém chất lượng, chắp vá, không đồng bộ, khiến biệt
                    thự mất đi giá trị vốn có.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span>
                    Chi phí phát sinh liên tục, đội vốn gấp nhiều lần so với dự
                    tính ban đầu.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">⚠</span>
                  <span>
                    Công trình kéo dài, ảnh hưởng đến kế hoạch tài chính và cuộc
                    sống của gia đình.
                  </span>
                </li>
              </ul>

              <p className="font-semibold">
                Bạn xứng đáng có được biệt thự hoàn hảo mà không phải lo lắng về
                những vấn đề trên!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
