import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        ĐĂNG KÝ
        <br />
        NHẬN ƯU ĐÃI
      </h2>

      <form className="space-y-4">
        <Input placeholder="Họ & Tên*" />
        <Input placeholder="Số điện thoại*" />
        <Input placeholder="Địa chỉ" />
        <Textarea placeholder="Nội dung cần tư vấn" className="min-h-[120px]" />

        <Button className="w-full bg-orange-600 hover:bg-orange-700">
          BẤM GỬI ĐI
        </Button>
      </form>
    </div>
  );
}
