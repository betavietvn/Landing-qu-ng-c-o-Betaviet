import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface VideoProps {
  url: string;
  thumbnail: string;
  title?: string;
}

function VideoThumbnail({ url, thumbnail, title }: VideoProps) {
  const videoId = url.split("v=")[1];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative group cursor-pointer">
          <img
            src={thumbnail}
            alt={title || "Video thumbnail"}
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

export default function VideoReview() {
  const mainVideo = {
    url: "https://www.youtube.com/watch?v=v-wEcCakMLE",
    thumbnail: "https://img.youtube.com/vi/v-wEcCakMLE/maxresdefault.jpg",
    title: "600M2 BIỆT THỰ LÔ GÓC GỖ QUÝ",
  };

  const videos = [
    {
      url: "https://www.youtube.com/watch?v=WBU4pUgqmYA",
      thumbnail: "https://img.youtube.com/vi/WBU4pUgqmYA/0.jpg",
      title: "NỘI THẤT GỖ ÓC CHÓ",
    },
    {
      url: "https://www.youtube.com/watch?v=sGZXezQYHwI",
      thumbnail: "https://img.youtube.com/vi/sGZXezQYHwI/0.jpg",
      title: "BIỆT THỰ VIP NHẤT VINHOMES OCEAN PARK",
    },
    {
      url: "https://www.youtube.com/watch?v=DTnKEsZMYE0",
      thumbnail: "https://img.youtube.com/vi/DTnKEsZMYE0/0.jpg",
      title: "THI CÔNG NHÀ PHỐ 7 TẦNG TÂN CỔ ĐIỂN",
    },
    {
      url: "https://www.youtube.com/watch?v=LIivC_O1iYo",
      thumbnail: "https://img.youtube.com/vi/LIivC_O1iYo/0.jpg",
      title: "TRỌN GÓI SIÊU DINH THỰ 1400M2",
    },
  ];

  return (
    <div id="video-review" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          VIDEO Review Công trình
        </h2>

        <div className="text-center mb-8 max-w-3xl mx-auto">
          <p>
            Những <strong>dự án thi công thực tế</strong> được{" "}
            <strong>quay và ghi hình trực tiếp</strong> khi hoàn thành và đưa
            vào sử dụng.
          </p>
          <p>
            Đây sẽ là những <strong>minh chứng rõ nét</strong> để quý khách hàng
            cảm nhận về công trình do <strong>Betaviet Group</strong> thiết kế
            và thi công.
          </p>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:flex flex-wrap mb-8">
          {/* Left large video */}
          <div className="w-1/2 pr-3">
            <VideoThumbnail {...mainVideo} />
          </div>

          {/* Right grid with smaller videos */}
          <div className="w-1/2 grid grid-cols-2 gap-3">
            {videos.map((video, index) => (
              <div key={index}>
                <VideoThumbnail {...video} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden mb-6">
          {/* Horizontal scrollable videos including main video */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex space-x-4 w-max">
              <div className="w-[280px] flex-shrink-0">
                <VideoThumbnail {...mainVideo} />
              </div>
              {videos.map((video, index) => (
                <div key={index} className="w-[280px] flex-shrink-0">
                  <VideoThumbnail {...video} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="https://betaviet.vn/du-an-trang-tri-noi-that/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
            >
              Xem thêm các Video
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
