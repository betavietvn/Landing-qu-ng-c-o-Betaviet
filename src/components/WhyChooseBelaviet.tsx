import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import trackingManager from "@/lib/trackingManager";

export default function WhyChooseBetaviet() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Khởi tạo tracking manager
  useEffect(() => {
    trackingManager.init();
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng bắt đầu nhập
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
      valid = false;
    } else {
      // Kiểm tra định dạng số điện thoại Việt Nam
      const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
        newErrors.phone = "Số điện thoại không hợp lệ";
        valid = false;
      }
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Kiểm tra xem có dấu hiệu gian lận không
      const isFraudulent = trackingManager.isFraudulent();

      // Nếu có dấu hiệu gian lận, vẫn cho phép gửi nhưng đánh dấu
      const formDataToSend = {
        ...formData,
        isFraudulent,
        trackingData: trackingManager.getTrackingData(),
        timestamp: new Date().toISOString(),
        source: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
      };

      // Gửi dữ liệu form đến API
      // Trong môi trường thực tế, bạn sẽ gửi đến API thực của mình
      console.log("Gửi dữ liệu form đặt lịch:", formDataToSend);

      // Giả lập API call thành công
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Đặt lại form và hiển thị thông báo thành công
      setFormData({
        name: "",
        phone: "",
        area: "",
      });
      setSubmitSuccess(true);

      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        setSubmitSuccess(false);
        setRegisterOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <button
                className="px-6 py-3 border-2 border-[#B87B44] text-[#B87B44] rounded-md hover:bg-[#B87B44] hover:text-white transition-colors"
                data-contact="consultation"
              >
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

                {submitSuccess && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                    Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className={`w-full p-3 border rounded-md ${formErrors.name ? "border-red-500" : ""}`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      className={`w-full p-3 border rounded-md ${formErrors.phone ? "border-red-500" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Diện tích"
                    className="w-full p-3 border rounded-md"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                  />

                  <p className="text-center text-gray-600 text-sm">
                    Hotline:{" "}
                    <span className="text-[#B87B44]">0915 010 800</span>
                  </p>

                  <button
                    type="submit"
                    className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "ĐANG XỬ LÝ..." : "Đặt lịch"}
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
