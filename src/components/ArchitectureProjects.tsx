import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  image: string;
  title: string;
  code: string;
  avatar: string;
}

function ProjectCard({ image, title, code, avatar }: ProjectCardProps) {
  return (
    <div className="space-y-2">
      <div className="relative group">
        <img src={image} alt={title} className="w-full rounded-lg" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl font-bold">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <p className="text-sm">{title}</p>
          <p className="text-sm text-gray-600">{code}</p>
        </div>
        <Button
          variant="outline"
          className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
        >
          Đặt lịch tư vấn
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Project, fetchProjects } from "@/lib/wordpress";

export default function ArchitectureProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects("architecture");
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) {
    return <div className="py-16 bg-white text-center">Loading...</div>;
  }

  // Fallback data if no projects are loaded
  const displayProjects = projects.length
    ? projects
    : [
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/mau-biet-thu-hien-dai-3-tang-phong-ngu-tai-ha-noi-kt23012.jpg",
          title:
            "Mẫu thiết kế biệt thự hiện đại 3 tầng 4 phòng ngủ tại Hà Nội KT23012",
          code: "KT23012",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/biet-thu-tan-co-dien-4-tang-7-phong-ngu-tai-thai-binh-kt20148.jpg",
          title:
            "Biệt thự tân cổ điển 4 tầng 7 phòng ngủ tại Thái Bình KT20148",
          code: "KT20148",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/thiet-ke-biet-thu-lau-dai-kieu-phap-3-tang-tai-thanh-hoa-kt18099.jpg",
          title:
            "Thiết kế biệt thự lâu đài kiểu pháp 3 tầng tại Thanh Hóa KT18099",
          code: "KT18099",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/thiet-ke-biet-thu-tan-co-dien-mai-mansard-tai-hung-yen-kt2001994.jpg",
          title:
            "Thiết kế biệt thự tân cổ điển mái Mansard tại Hưng Yên KT2001994",
          code: "KT2001994",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        },
      ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          DỰ ÁN THIẾT KẾ KIẾN TRÚC
        </h2>

        <p className="text-center mb-12 max-w-3xl mx-auto">
          10 phong cách thiết kế thịnh hành, Hàng chục nghìn công trình chất
          lượng cao,
          <br />
          Đánh giá sâu sắc từ kiến trúc sư, Giúp bạn có được nguồn cảm hứng
          thiết kế ngôi nhà một cách nhanh chóng!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
          >
            Xem thêm Các dự án kiến trúc
          </Button>
        </div>
      </div>
    </div>
  );
}
