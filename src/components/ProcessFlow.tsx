import {
  Headphones,
  User2,
  FileEdit,
  Hammer,
  ClipboardCheck,
  Building2,
  Wrench,
} from "lucide-react";

export default function ProcessFlow() {
  const steps = [
    { icon: Headphones, text: "Tiếp nhận yêu cầu", number: "1" },
    { icon: User2, text: "Chọn nhà thiết kế", number: "2" },
    { icon: FileEdit, text: "Triển khai thiết kế", number: "3" },
    { icon: Hammer, text: "Chọn nhà thầu thi công", number: "4" },
    { icon: ClipboardCheck, text: "Triển khai thi công", number: "5" },
    { icon: Building2, text: "Chọn nhà cung cấp sản phẩm", number: "6" },
    { icon: Wrench, text: "Hỗ trợ bảo hành bảo trì", number: "7" },
  ];

  return (
    <div className="py-16 bg-[#B87B44] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          QUY TRÌNH HỢP TÁC
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-2">
                <step.icon className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold">{step.number}</div>
              <div className="text-sm">{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
