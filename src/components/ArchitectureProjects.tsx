import { Button } from "@/components/ui/button";
import ConsultationForm from "./ConsultationForm";

interface CategoryProps {
  title: string;
  image: string;
  link: string;
}

function CategoryCard({ title, image, link }: CategoryProps) {
  return (
    <a href={link} className="block relative group overflow-hidden rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-[150px] object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-white text-lg font-bold text-center px-2">
          {title}
        </h3>
      </div>
    </a>
  );
}

interface ProjectCardProps {
  image: string;
  title: string;
  code: string;
  avatar: string;
  link?: string;
}

function ProjectCard({ image, title, code, avatar, link }: ProjectCardProps) {
  return (
    <div className="space-y-2">
      <a href={link || "#"} className="block">
        <div className="relative group">
          <img
            src={image}
            alt={title}
            className="w-full rounded-lg aspect-[4/3] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xl font-bold">
            {title}
          </div>
        </div>
      </a>
      <div className="flex items-center gap-3">
        <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <p className="text-sm line-clamp-2">{title}</p>
          <p className="text-sm text-gray-600">{code}</p>
        </div>
        <ConsultationForm
          trigger={
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white whitespace-nowrap"
            >
              Đặt lịch tư vấn
            </Button>
          }
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Project, fetchProjects } from "@/lib/wordpress";

export default function ArchitectureProjects() {
  const categories = [
    {
      title: "LÂU ĐÀI - DINH THỰ",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/laudai-dinhthu.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/?_sft_loai-hinh=lau-dai",
    },
    {
      title: "BIỆT THỰ 2 TẦNG",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/biethtu2tang.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/?_sft_loai-hinh=biet-thu&_sft_tang-cao=2-tang",
    },
    {
      title: "BIỆT THỰ 3 TẦNG",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/bietthu3tang.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/?_sft_loai-hinh=biet-thu&_sft_tang-cao=3-tang",
    },
    {
      title: "BIỆT THỰ 4 TẦNG TRỞ LÊN",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/4tangtrolen.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/?_sft_loai-hinh=biet-thu&_sft_tang-cao=4-tang",
    },
    {
      title: "KHÁCH SẠN - NHÀ HÀNG",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/thiet-ke-nha-hang-5-tang-tan-co-dien-1300m2-tai-ha-noi-kt19309-1.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/?_sft_loai-hinh=khach-san",
    },
  ];

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
  const displayProjects = [
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-thiet-ke-biet-thu-tan-co-dien-2-tang-mai-mansard-tai-bac-ninh-kt233712-600x404xc.jpg",
      title:
        "Thiết kế biệt thự tân cổ điển 2 tầng mái Mansard tại Bắc Ninh KT23371",
      code: "KT23371",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/kts-hoang-nghia-manh-2-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-tan-co-dien-2-tang-mai-mansard-tai-bac-ninh-kt23371/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/09/mau-thiet-ke-biet-thu-hien-dai-luxury-700m2-tai-bac-ninh-kt24604-600x404xc.jpg",
      title: "Mẫu thiết kế biệt thự Tropical 700m2 tại Bắc Ninh KT24604",
      code: "KT24604",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/09/kts-nguyen-hoang-trung-2-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/mau-thiet-ke-biet-thu-hien-dai-luxury-700m2-tai-bac-ninh-kt24604-9/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/thiet-ke-dinh-thu-tan-co-dien-mai-mansard-tai-dac-nong-kt2008117b-7-600x404xc.jpg",
      title: "Thiết kế biệt thự tân cổ điển mái Mansard tại Đắk Nông KT200817B",
      code: "KT200817B",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/nguyen-trong-thuy-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-dinh-thu-tan-co-dien-mai-mansard-tai-dac-nong-kt2008117b/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-thiet-ke-biet-thu-tan-co-dien-3-tang-800m2-tai-quang-ninh-kt18041-600x404xc.jpg",
      title:
        "Thiết kế dinh thự tân cổ điển 3 tầng 800m2 tại Quảng Ninh KT18041",
      code: "KT18041",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/01/kts-nguyen-huu-minh-1-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-tan-co-dien-3-tang-800m2-tai-quang-ninh-kt18041/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/mau-thiet-ke-biet-thu-tan-co-dien-3-tang-tai-ha-nam-kt24821-8-600x404xc.jpg",
      title: "Mẫu thiết kế biệt thự tân cổ điển 3 tầng tại Hà Nam KT24821",
      code: "KT24821",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/nguyen-trong-thuy-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/mau-thiet-ke-biet-thu-tan-co-dien-3-tang-tai-ha-nam-kt24821/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/mau-biet-thu-phong-cach-tan-co-dien-3-tang-tai-ha-noi-kt2009134-600x404xc.jpg",
      title: "Mẫu biệt thự phong cách tân cổ điển 3 tầng tại Hà Nội KT2009134",
      code: "KT2009134",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/04/kts-vu-hoang-hai-2-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/mau-biet-thu-phong-cach-tan-co-dien-3-tang-tai-ha-noi-kt2009134/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-thiet-ke-biet-thu-tan-co-dien-3-tang-mai-mansard-tai-bac-ninh-kt22059-600x404xc.jpg",
      title:
        "Thiết kế biệt thự tân cổ điển 3.8m mái mansard tại Bắc Ninh KT22059",
      code: "KT22059",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2023/12/kts-dao-anh-tu-ok-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-tan-co-dien-3-tang-mai-mansard-tai-bac-ninh-kt22059/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-thiet-ke-biet-thu-lau-dai-3-tang-1000m2-tai-nam-dinh-kt23124-600x404xc.jpg",
      title: "Thiết kế biệt thự lâu đài 3 tầng 1000m2 tại Nam Định KT23124",
      code: "KT23124",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2023/12/kts-dao-anh-tu-ok-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-lau-dai-3-tang-1000m2-tai-nam-dinh-kt23124/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/biet-thu-tan-co-dien-2-mat-tien-mai-mansard-tai-thanh-hoa-kt23082-ava-600x404xc.jpg",
      title:
        "Dinh thự tân cổ điển 2 mặt tiền mái Mansard tại Thanh Hóa KT23082",
      code: "KT23082",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2023/12/kts-dao-anh-tu-ok-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/biet-thu-tan-co-dien-2-mat-tien-mai-mansard-tai-thanh-hoa-kt23082/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-thiet-ke-biet-thu-ban-co-dien-6-tang-850m2-tai-nghe-an-kt22215-600x404xc.jpg",
      title: "Thiết kế biệt thự bán cổ điển 6 tầng 850m2 tại Nghệ An KT22215",
      code: "KT22215",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/01/kts-nguyen-huu-minh-1-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-ban-co-dien-6-tang-850m2-tai-nghe-an-kt22215-22/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/dai-dien-mau-kien-truc-biet-thu-500m2-tan-co-dien-2-tang-tai-ha-noi-kt21110-600x404xc.jpg",
      title:
        "Mẫu kiến trúc biệt thự 500m2 tân cổ điển 2 tầng tại Hà Nội KT21110",
      code: "KT21110",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2023/12/kts-dao-anh-tu-ok-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/mau-kien-truc-biet-thu-500m2-tan-co-dien-2-tang-tai-ha-noi-kt21110/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/09/dai-dien-thiet-ke-biet-thu-lau-dai-kieu-phap-3-tang-tai-thanh-hoa-kt19099-600x404xc.jpg",
      title: "Thiết kế biệt thự lâu đài kiểu pháp 3 tầng tại Thanh Hóa KT19099",
      code: "KT19099",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/04/kts-vu-hoang-hai-2-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-kien-truc/thiet-ke-biet-thu-lau-dai-kieu-phap-3-tang-tai-thanh-hoa-kt19099/",
    },
  ];

  return (
    <div id="architecture-projects" className="py-16 bg-[#f8f8f8]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          DỰ ÁN THIẾT KẾ KIẾN TRÚC
        </h2>

        <p className="text-center mb-8 max-w-3xl mx-auto">
          10 phong cách thiết kế thịnh hành, Hàng chục nghìn công trình chất
          lượng cao. Đánh giá sâu sắc từ kiến trúc sư, Giúp bạn có được nguồn
          cảm hứng thiết kế ngôi nhà một cách nhanh chóng!
        </p>

        {/* Categories - hidden on mobile */}
        <div className="hidden md:grid grid-cols-5 gap-4 mb-12">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>

        {/* Projects - grid on desktop, slider on mobile */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 mb-4">
          <div className="flex space-x-4 w-max">
            {displayProjects.map((project, index) => (
              <div key={index} className="w-[280px] flex-shrink-0">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
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
              Xem thêm Các dự án kiến trúc
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
