import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface ConsultationFormProps {
  trigger: React.ReactNode;
}

export default function ConsultationForm({ trigger }: ConsultationFormProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the form submission
    // For now, just close the dialog
    setOpen(false);
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Họ và tên
              </label>
              <input
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
                type="text"
                placeholder="Diện tích"
                className="w-full p-3 border rounded-md"
              />
            </div>

            <div className="text-center text-sm text-gray-600 mt-2">
              Hotline:{" "}
              <span className="text-[#B87B44] font-medium">0915 010 800</span>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#B87B44] hover:bg-[#A66933] text-white rounded-md"
            >
              Đặt lịch
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
