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

  const reasons = [
    {
      text: "Miễn phí 100% thiết kế khi thi công trọn gói",
      subtext: "",
    },
    {
      text: "Giảm đến 30% lên tới 300 triệu đồ nội thất nhập khẩu",
      subtext: "Sở hữu ngay sản phẩm chính hãng cao cấp",
    },
    {
      text: "Miễn phí nhận mẫu thiết kế phù hợp và video thực tế",
      subtext: "Hàng nghìn mẫu nhà và video phù hợp yêu cầu",
    },
    {
      text: "Miễn phí nhận dự toán chi phí thi công",
      subtext: "Đầy đủ hạng mục, vật liệu và trang thiết bị",
    },
    {
      text: "Miễn phí lập hồ sơ cấp phép xây dựng",
      subtext: "Giảm thiểu gánh nặng pháp lý cho gia chủ",
    },
  ];

  const benefits = [
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2023/12/Uu-dai-cong-trinh.jpg",
      title: "Miễn phí",
      description: "Miễn phí 100% thiết kế\nKhi thi công trọn gói",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2023/12/Tu-van-cong-trinh.jpg",
      title: "Ưu đãi",
      description: "Giảm tới 30% 300tr\nĐồ nội thất nhập khẩu",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2023/12/Khao-sat-cong-trinh.jpg",
      title: "Pháp lý",
      description: "Hỗ trợ thủ tục pháp lý\ncấp phép xây dựng",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          LÝ DO LỰA CHỌN XÂY NHÀ CHỌN GÓI BETAVIET
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
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 bg-[#B87B44] text-white flex items-center justify-center rounded-sm">
                  {index + 1}
                </div>
                <div>
                  <div className="text-lg">{reason.text}</div>
                  {reason.subtext && (
                    <div className="text-sm text-gray-600">
                      {reason.subtext}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Video */}
          <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
            <DialogTrigger asChild>
              <div className="relative group cursor-pointer">
                <img
                  src="https://img.youtube.com/vi/LIivC_O1iYo/maxresdefault.jpg"
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
                  src="https://www.youtube.com/embed/LIivC_O1iYo?autoplay=1"
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

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h3 className="font-bold text-lg mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {benefit.description}
                      </p>
                    </div>
                  ))}
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
