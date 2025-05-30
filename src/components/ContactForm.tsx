import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { submitToGoogleSheet } from "@/lib/formSubmit";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    show: false,
    success: false,
    text: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Vietnamese phone number
  const isValidVietnamesePhone = (phone: string) => {
    // Check if starts with +84 followed by 9 digits
    if (phone.startsWith("+84") && /^\+84\d{9}$/.test(phone)) {
      return true;
    }

    // Check if starts with 0 followed by 9 digits
    if (phone.startsWith("0") && /^0\d{9}$/.test(phone)) {
      // Check if the second digit is 0,1,2,3,4,5
      const secondDigit = phone.charAt(1);
      if (["0", "1", "2", "3", "4", "5"].includes(secondDigit)) {
        return false;
      }
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get honeypot field value
    const form = e.currentTarget as HTMLFormElement;
    const honeypotField = form.querySelector(
      '[name="email_confirm"]',
    ) as HTMLInputElement;

    // Honeypot check - if this field is filled, it's likely a bot
    if (honeypotField && honeypotField.value) {
      console.log("Honeypot triggered - likely bot submission");
      setSubmitMessage({
        show: true,
        success: true, // Show success to the bot but don't actually submit
        text: "Đã gửi thông tin thành công!",
      });
      return;
    }

    // Validate form
    if (!formData.name || !formData.phone) {
      setSubmitMessage({
        show: true,
        success: false,
        text: "Vui lòng điền đầy đủ họ tên và số điện thoại",
      });
      return;
    }

    if (!isValidVietnamesePhone(formData.phone)) {
      setSubmitMessage({
        show: true,
        success: false,
        text: "Số điện thoại không hợp lệ. Vui lòng nhập lại!",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage({ show: false, success: false, text: "" });

    // Push to dataLayer for GTM tracking
    if (window && (window as any).dataLayer) {
      const phoneFormatted = "+84" + formData.phone.replace(/^(?!00[^0])0/, "");
      (window as any).phoneCF7EC = phoneFormatted;
      (window as any).dataLayer.push({
        event: "ContactFormSubmit",
        formPhone: phoneFormatted,
      });
    }

    try {
      const result = await submitToGoogleSheet({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        message: formData.message,
      });

      setSubmitMessage({
        show: true,
        success: result.success,
        text: result.message,
      });

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          phone: "",
          address: "",
          message: "",
        });
      }
    } catch (error) {
      setSubmitMessage({
        show: true,
        success: false,
        text: "Có lỗi xảy ra khi gửi thông tin",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        Gặp trực tiếp kiến trúc sư thiết kế Nhà thầu thi công
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="Họ & Tên*"
          value={formData.name}
          onChange={handleChange}
          required
          className="text-base"
        />
        <Input
          name="phone"
          placeholder="Số điện thoại*"
          value={formData.phone}
          onChange={handleChange}
          required
          className="text-base"
        />
        <Input
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
          className="text-base"
        />
        <Textarea
          name="message"
          placeholder="Nội dung cần tư vấn"
          className="min-h-[120px] text-base"
          value={formData.message}
          onChange={handleChange}
        />

        {/* Honeypot field - hidden from humans but visible to bots */}
        <div
          className="absolute opacity-0 -left-[9999px] -top-[9999px] pointer-events-none"
          aria-hidden="true"
        >
          <Input
            name="email_confirm"
            placeholder="Confirm Email"
            tabIndex={-1}
            autoComplete="off"
            className="text-base"
          />
        </div>

        {submitMessage.show && (
          <div
            className={`p-3 rounded-md ${submitMessage.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {submitMessage.text}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-[#bc7025] hover:bg-[#a65e1f]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "ĐANG GỬI..." : "BẤM GỬI ĐI"}
        </Button>
      </form>
    </div>
  );
}
