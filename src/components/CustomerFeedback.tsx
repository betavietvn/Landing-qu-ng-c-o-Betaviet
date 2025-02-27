import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VideoProps {
  url: string;
  thumbnail: string;
}

function VideoThumbnail({ url, thumbnail }: VideoProps) {
  const videoId = url.split("v=")[1];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full aspect-video object-cover rounded-lg"
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
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CustomerFeedback() {
  const videos = [
    {
      url: "https://www.youtube.com/watch?v=kYOKlA3wFmI",
      thumbnail: "https://img.youtube.com/vi/kYOKlA3wFmI/maxresdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=q6mFDn0ECBM",
      thumbnail: "https://img.youtube.com/vi/q6mFDn0ECBM/maxresdefault.jpg",
    },
    {
      url: "https://www.youtube.com/watch?v=CIOecJZRbVI",
      thumbnail: "https://img.youtube.com/vi/CIOecJZRbVI/maxresdefault.jpg",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          CẢM NHẬN KHÁCH HÀNG
        </h2>

        <p className="text-center mb-12 max-w-3xl mx-auto">
          Những dự án thi công thực tế được quay và ghi hình trực tiếp khi hoàn
          thành và đưa vào sử dụng.
          <br />
          Đây sẽ là những minh chứng rõ nét để quý khách hàng cảm nhận về công
          trình do Betaviet Group thiết kế và thi công.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoThumbnail key={index} {...video} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://betaviet.vn/thiet-ke-thi-cong-kien-truc/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
            >
              Xem thêm Các Video
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
