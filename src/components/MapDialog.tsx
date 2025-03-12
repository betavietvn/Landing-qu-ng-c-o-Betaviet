import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

interface MapDialogProps {
  trigger: React.ReactNode;
}

export default function MapDialog({ trigger }: MapDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-medium text-[#B87B44] mb-4">
            Địa chỉ Betaviet Group
          </h2>
          <div className="w-full aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4522.578701850572!2d105.783812!3d20.921968!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac95549515b7%3A0xdd969f7db0100744!2sBetaviet%20Group!5e1!3m2!1svi!2sus!4v1741763400235!5m2!1svi!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Toà nhà Betaviet, KĐT Thanh Hà Cienco5, Q. Hà Đông, TP. Hà Nội
            </p>
            <p className="mt-1">Hotline: 0915010800</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
