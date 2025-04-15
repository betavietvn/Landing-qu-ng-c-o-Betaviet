import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { submitToGoogleSheet } from "@/lib/formSubmit";

interface ContactFormDialogProps {
  trigger: React.ReactNode;
}

export default function ContactFormDialog({ trigger }: ContactFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    show: false,
    success: false,
    text: "",
  });

  // Validate Vietnamese phone number
  const isValidVietnamesePhone = (phone: string) => {
    // Check if starts with +84 followed by 9 digits, or 0 followed by 9 digits
    const regex = /^(\+84\d{9}|0\d{9})$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Honeypot check - if this field is filled, it's likely a bot
    const honeypot = formData.get("contact_preference") as string;
    if (honeypot) {
      console.log("Honeypot triggered - likely bot submission");
      setSubmitMessage({
        show: true,
        success: true, // Show success to the bot but don't actually submit
        text: "Đã gửi thông tin thành công!",
      });
      return;
    }

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      message: formData.get("message") as string,
    };

    if (!data.name || !data.phone) {
      setSubmitMessage({
        show: true,
        success: false,
        text: "Vui lòng điền đầy đủ họ tên và số điện thoại",
      });
      return;
    }

    if (!isValidVietnamesePhone(data.phone)) {
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
      const phoneFormatted = "+84" + data.phone.replace(/^(?!00[^0])0/, "");
      (window as any).phoneCF7EC = phoneFormatted;
      (window as any).dataLayer.push({
        event: "ContactFormSubmit",
        formPhone: phoneFormatted,
      });
    }

    try {
      const result = await submitToGoogleSheet({
        name: data.name,
        phone: data.phone,
        address: data.address,
        message: data.message,
      });

      setSubmitMessage({
        show: true,
        success: result.success,
        text: result.message,
      });

      if (result.success) {
        form.reset();
        setTimeout(() => {
          setOpen(false);
          setSubmitMessage({ show: false, success: false, text: "" });
        }, 2000);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="p-6">
          <h2 className="text-xl font-medium text-[#B87B44] mb-6">
            Đăng ký tư vấn
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Họ & Tên*"
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Số điện thoại*"
              className="w-full p-3 border rounded-md"
              required
            />
            <input
              name="address"
              type="text"
              placeholder="Địa chỉ"
              className="w-full p-3 border rounded-md"
            />
            <textarea
              name="message"
              placeholder="Nội dung cần tư vấn"
              className="w-full p-3 border rounded-md min-h-[120px]"
            ></textarea>

            {/* Honeypot field - hidden from humans but visible to bots */}
            <div
              className="absolute opacity-0 -left-[9999px] -top-[9999px] pointer-events-none"
              aria-hidden="true"
            >
              <input
                name="contact_preference"
                type="text"
                placeholder="Preferred contact method"
                tabIndex={-1}
                autoComplete="off"
                className="w-full p-3 border rounded-md"
              />
            </div>

            {submitMessage.show && (
              <div
                className={`p-3 rounded-md ${submitMessage.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {submitMessage.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#B87B44] text-white py-3 rounded-md hover:bg-[#A66933] transition-colors font-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ĐANG GỬI..." : "BẤM GỬI ĐI"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
