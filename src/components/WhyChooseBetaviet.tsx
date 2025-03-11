import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function WhyChooseBetaviet() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          LÝ DO LỰA CHỌN BETAVIET
        </h2>
        <div className="flex justify-center gap-1 mb-12">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-6 h-6 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - List */}
          <div className="space-y-6">
            <div className="font-bold text-lg mb-4">
              🏆 BETAVIET – ĐƠN VỊ THIẾT KẾ & THI CÔNG BIỆT THỰ TRỌN GÓI HÀNG
              ĐẦU VIỆT NAM
            </div>
            <div className="mb-4">
              Chúng tôi giúp bạn hiện thực hóa biệt thự mong muốn với dịch vụ
              trọn gói từ A-Z, đảm bảo:
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="text-green-500 font-bold">✅</div>
                <div>
                  Thiết kế ĐỘC QUYỀN – Chuẩn phong thủy – Cá nhân hóa theo gu
                  của gia chủ.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 font-bold">✅</div>
                <div>
                  Thi công CHUẨN CHẤT LƯỢNG – Vật liệu cao cấp – Đảm bảo đúng
                  tiến độ.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 font-bold">✅</div>
                <div>
                  Tối ưu chi phí, không phát sinh, bảo hành bảo trì tận tâm.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-green-500 font-bold">✅</div>
                <div>
                  Cảnh quan sân vườn, tiểu cảnh hài hòa, nâng tầm giá trị biệt
                  thự.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-red-500 font-bold">🚀</div>
                <div>
                  Hơn 10000+ biệt thự đã được Betaviet kiến tạo trên toàn quốc
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="text-red-500 font-bold">📞</div>
                <div>Liên hệ ngay: 0915010800 để được tư vấn miễn phí!</div>
              </div>
            </div>
          </div>

          {/* Right Column - Video */}
          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <div className="relative group cursor-pointer">
                <img
                  src="https://img.youtube.com/vi/g8eeWRfVeRA/maxresdefault.jpg"
                  alt="Video thumbnail"
                  className="w-full rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/g8eeWRfVeRA?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex justify-center mt-8">
          <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
            <DialogTrigger asChild>
              <button className="px-6 py-3 border-2 border-[#B87B44] text-[#B87B44] rounded-md hover:bg-[#B87B44] hover:text-white transition-colors">
                Đăng ký tư vấn miễn phí
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#B87B44]">
                    Đặt lịch tư vấn
                  </h2>
                  <DialogClose className="rounded-full p-1 hover:bg-gray-100">
                    <X className="h-4 w-4" />
                  </DialogClose>
                </div>

                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Diện tích"
                    className="w-full p-3 border rounded-md"
                  />
                  <p className="text-center text-gray-600 text-sm">
                    Hotline:{" "}
                    <span className="text-[#B87B44]">0915 010 800</span>
                  </p>
                  <button
                    type="submit"
                    className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors"
                  >
                    Đặt lịch
                  </button>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
