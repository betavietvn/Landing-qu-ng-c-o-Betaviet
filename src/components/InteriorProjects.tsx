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
        className="w-full aspect-[1.4/1] object-contain transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
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
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full aspect-[1.4/1] object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </a>
      <div className="flex items-center gap-3">
        <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-sm" />
        <div className="flex-1">
          <p className="text-xs line-clamp-2">{title}</p>
          <p className="text-xs text-gray-600">{code}</p>
          <div className="flex justify-end mt-2">
            <ConsultationForm
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white text-xs rounded-full px-4"
                >
                  Đặt lịch tư vấn
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Project, fetchProjects } from "@/lib/wordpress";

export default function InteriorProjects() {
  const categories = [
    {
      title: "KĐT VINHOMES OCEAN PARK",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/vinhome.jpg",
      link: "https://betaviet.vn/khu-do-thi/vinhomes-ocean-park/",
    },
    {
      title: "KĐT VINHOMES RIVERSIDE",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/riverside.jpg",
      link: "https://betaviet.vn/khu-do-thi/vinhomes-riverside/",
    },
    {
      title: "KĐT THEHARMONY CENTER PARK",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/hamoney.jpg",
      link: "https://betaviet.vn/khu-do-thi/vinhomes-the-harmony/",
    },
    {
      title: "KĐT THE MANOR CENTRAL PARK",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/MANOR-CENTER.jpg",
      link: "https://betaviet.vn/khu-do-thi/the-manor-central-park/",
    },
    {
      title: "KĐT STARLAKE TÂY HỒ",
      image: "https://betaviet.vn/wp-content/uploads/2024/11/TAYHO.jpg",
      link: "https://betaviet.vn/khu-do-thi/starlake-tay-ho/",
    },
  ];

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects("interior");
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
        "https://betaviet.vn/wp-content/uploads/2024/11/thiet-ke-noi-that-phong-khach-tan-co-dien-nt24531-2-600x404xc.jpg",
      title:
        "Thiết kế nội thất tân cổ điển dinh thự mặt phố tại Quảng Ninh NT24531",
      code: "NT24531",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/kts-le-quang-huy-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-tan-co-dien-biet-thu-mat-pho-tai-quang-ninh-nt24531/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/anh-dai-dien-NT19109-600x404xc.jpg",
      title: "Thiết kế nội thất biệt thự hiện đại châu Âu tại Hà Nội NT23329",
      code: "NT23329",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/01/kts-tran-tuan-anh-2-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-ban-co-dien-biet-thu-tai-hai-phong-nt19109/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/10/mau-thiet-ke-noi-that-phong-khach-co-dien-nt24530-1-600x404xc.jpg",
      title: "Thiết kế nội thất phong cách tân cổ điển tại Thanh Hóa NT21042",
      code: "NT21042",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/kts-le-quang-huy-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-phong-cach-co-dien-tai-quang-ninh-nt24530/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/dai-dien-thiet-ke-noi-that-biet-thu-mat-pho-tan-co-dien-tai-ha-nam-nt24545-600x404xc.jpg",
      title: "Mẫu thiết kế nội thất biệt thự cổ điển tại Hà Nội NT21161",
      code: "NT21161",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/kts-le-quang-huy-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-mat-pho-tan-co-dien-tai-ha-nam-nt24545/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/dai-dien-3-600x404xc.jpg",
      title: "Thiết kế nội thất biệt thự đầu tư cổ tại Bình Thuận NT23128",
      code: "NT23128",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/10/kts-tran-khac-binh-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/mau-thiet-ke-noi-that-biet-thu-indochine-tai-dac-lac-nt5003755/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/thiet-ke-noi-that-phong-khach-art-deco-kdt-binh-minh-nt24544-ava-600x404xc.jpg",
      title: "Thiết kế nội thất biệt thự hiện đại luxury tại Hà Nội NT2006858",
      code: "NT2006858",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/kts-le-quang-huy-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-phong-cach-art-deco-kdt-binh-minh-nt24544/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/thiet-ke-noi-that-sanh-tan-co-dien-nt21059-dai-dien-600x404xc.jpg",
      title: "Mẫu nội thất căn hộ 4 phòng ngủ hiện đại tại Hà Nội NT20045",
      code: "NT20045",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/01/kts-tran-tuan-anh-2-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-nha-biet-thu-tan-co-dien-tai-thanh-hoa-nt21059/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/anh-dai-dien-NT24048B-600x404xc.jpg",
      title: "Mẫu nội thất biệt thự phong cách cổ điển tại Bình Dương NT24532",
      code: "NT24532",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/07/pham-hai-yen-200x200xc.jpg",
      link: "https://betaviet.vn/thiet-ke-thi-cong-noi-that/mau-noi-that-can-ho-4-phong-ngu-hien-dai-tai-ha-noi-nt24048b/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/09/thiet-ke-phong-khach-biet-thu-tan-co-dien-nt24401-ava-600x404xc.jpg",
      title:
        "Mẫu thiết kế nội thất biệt thự hiện đại gỗ KĐT Vinhomes Green Bay NT24406",
      code: "NT24406",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/09/kts-pham-van-nam-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-phong-cach-tan-co-dien-tai-ha-noi-nt24401/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/anh-dai-dien-NT23329-600x404xc.jpg",
      title:
        "Thiết kế nội thất biệt thự phong cách cổ điển tại Quảng Ninh NT24530",
      code: "NT24530",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/01/kts-le-duy-anh-2-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-hien-dai-chau-au-tai-ha-noi-nt23329/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/11/thiet-ke-noi-that-phong-khach-biet-thu-hien-dai-nt2008498-600x404xc.jpg",
      title:
        "Thiết kế nội thất biệt thự tân cổ điển KĐT Starlake Tây Hồ NT24545",
      code: "NT24545",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2024/03/kts-nguyen-manh-cuong-2-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-hien-dai-luxury-tai-ha-noi-nt2008498/",
    },
    {
      image:
        "https://betaviet.vn/wp-content/uploads/2024/08/mau-phong-khach-biet-thu-indochine-tai-binh-duong-nt22085-1-600x404xc.jpg",
      title:
        "Mẫu nội thất nhà biệt thự phong cách Art Deco tại Thanh Hóa NT21194A",
      code: "NT21194A",
      avatar:
        "https://betaviet.vn/wp-content/uploads/2023/12/kts-truong-duc-hieu-2-200x200xc.jpg",
      link: "https://betaviet.vn/du-an-trang-tri-noi-that/thiet-ke-noi-that-biet-thu-phong-cach-indochine-tai-binh-duong-nt22085/",
    },
  ];

  return (
    <div id="interior-projects" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          DỰ ÁN THIẾT KẾ NỘI THẤT
        </h2>

        <p className="text-center mb-8 max-w-3xl mx-auto">
          10 phong cách thiết kế thịnh hành. Hàng chục nghìn công trình chất
          lượng cao. Đánh giá sâu sắc từ kiến trúc sư. Giúp bạn có được nguồn
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
              <div key={index} className="w-[339px] flex-shrink-0">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://betaviet.vn/du-an-trang-tri-noi-that/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
            >
              Xem thêm Các dự án nội thất
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
