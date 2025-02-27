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

export default function InteriorProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects("interior");
        setProjects(data);
      } catch (error) {
        console.error("Failed to load interior projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (loading) {
    return <div className="py-16 bg-gray-50 text-center">Loading...</div>;
  }

  // Fallback data if no projects are loaded
  const displayProjects = projects.length
    ? projects
    : [
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/noi-that-biet-thu-lien-ke-tropical-morden-tai-tp-ho-chi-minh-nt24553.jpg",
          title:
            "Nội thất biệt thự liền kề Tropical Morden tại TP Hồ Chí Minh NT24553",
          code: "NT24553",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/mau-thiet-ke-noi-that-biet-thu-tan-co-dien-kdt-thong-nhat-nt19057.jpg",
          title:
            "Mẫu thiết kế nội thất biệt thự tân cổ điển KĐT Thống Nhất NT19057",
          code: "NT19057",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/mau-thiet-ke-noi-that-tan-co-dien-biet-thu-tai-bac-giang-nt22098.jpg",
          title:
            "Mẫu thiết kế nội thất tân cổ điển biệt thự tại Bắc Giang NT22098",
          code: "NT22098",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
        },
        {
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/thiet-ke-noi-that-nha-biet-thu-go-hien-dai-tai-hoa-binh-nt21156.jpg",
          title:
            "Thiết kế nội thất nhà biệt thự gỗ hiện đại tại Hòa Bình NT21156",
          code: "NT21156",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
        },
      ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          DỰ ÁN THIẾT KẾ NỘI THẤT
        </h2>

        <p className="text-center mb-12 max-w-3xl mx-auto">
          10 phong cách thiết kế thịnh hành, Hàng chục nghìn công trình chất
          lượng cao,
          <br />
          Đánh giá sâu sắc từ kiến trúc sư, Giúp bạn có được nguồn cảm hứng
          thiết kế ngôi nhà một cách nhanh chóng!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
          >
            Xem thêm Các dự án nội thất
          </Button>
        </div>
      </div>
    </div>
  );
}
