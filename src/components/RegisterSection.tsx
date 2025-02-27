import { useState, useEffect } from "react";
import trackingManager from "@/lib/trackingManager";

export default function RegisterSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
      console.log("Gửi dữ liệu form:", formDataToSend);

      // Giả lập API call thành công
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Đặt lại form và hiển thị thông báo thành công
      setFormData({
        name: "",
        phone: "",
        address: "",
        message: "",
      });
      setSubmitSuccess(true);

      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Họ & Tên*"
                  className={`w-full p-3 border rounded-md ${formErrors.name ? "border-red-500" : ""}`}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại*"
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
                placeholder="Địa chỉ"
                className="w-full p-3 border rounded-md"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />

              <textarea
                placeholder="Nội dung cần tư vấn"
                className="w-full p-3 border rounded-md min-h-[120px]"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? "ĐANG GỬI..." : "BẤM GỬI ĐI"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
