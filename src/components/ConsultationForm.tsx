import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { submitToGoogleSheet } from "@/lib/formSubmit";

interface ConsultationFormProps {
  trigger: React.ReactNode;
}

export default function ConsultationForm({ trigger }: ConsultationFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({
    show: false,
    success: false,
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      area: formData.get("area") as string,
    };

    if (!data.name || !data.phone) {
      setSubmitMessage({
        show: true,
        success: false,
        text: "Vui lòng điền đầy đủ họ tên và số điện thoại",
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
        area: data.area,
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
      <DialogContent className="sm:max-w-[450px] p-0">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-[#B87B44]">
              Đặt lịch tư vấn
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <input
                name="name"
                type="text"
                placeholder="Nhập họ và tên"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Số điện thoại"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Diện tích
              </label>
              <input
                name="area"
                type="text"
                placeholder="Diện tích"
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

            <div className="text-center text-sm text-gray-600 mt-2">
              Hotline:{" "}
              <span className="text-[#B87B44] font-medium">0915 010 800</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#B87B44] hover:bg-[#A66933] text-white rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "ĐANG GỬI..." : "Đặt lịch"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
