import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import trackingManager from "@/lib/trackingManager";

export default function ContactForm() {
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
    <div className="bg-white p-6 rounded-lg shadow-lg">
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
          <Input
            placeholder="Họ & Tên*"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={formErrors.name ? "border-red-500" : ""}
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>

        <div>
          <Input
            placeholder="Số điện thoại*"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={formErrors.phone ? "border-red-500" : ""}
          />
          {formErrors.phone && (
            <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
          )}
        </div>

        <Input
          placeholder="Địa chỉ"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <Textarea
          placeholder="Nội dung cần tư vấn"
          className="min-h-[120px]"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "ĐANG GỬI..." : "BẤM GỬI ĐI"}
        </Button>
      </form>
    </div>
  );
}
