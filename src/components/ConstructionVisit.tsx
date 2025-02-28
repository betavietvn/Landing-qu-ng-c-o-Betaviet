import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Project, fetchProjects } from "@/lib/wordpress";

interface ConstructionProject extends Project {
  progress: {
    khoi_cong: boolean;
    phan_tho: boolean;
    thi_cong_noi_that: boolean;
    lap_dat_hoan_thien: boolean;
    hoan_thanh: boolean;
  };
}

export default function ConstructionVisit() {
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects("construction");
      const constructionProjects = data.map((project) => ({
        ...project,
        progress: {
          khoi_cong: true,
          phan_tho: true,
          thi_cong_noi_that: Math.random() > 0.5,
          lap_dat_hoan_thien: Math.random() > 0.7,
          hoan_thanh: false,
        },
      }));
      setProjects(constructionProjects);
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
          id: 1,
          title:
            "Thi công xây dựng biệt thự tân cổ điển 3 tầng 360m2 tại Hà Nội TC2009134",
          code: "TC2009134",
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/mau-biet-thu-hien-dai-3-tang-phong-ngu-tai-ha-noi-kt23012.jpg",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
          progress: {
            khoi_cong: true,
            phan_tho: true,
            thi_cong_noi_that: true,
            lap_dat_hoan_thien: false,
            hoan_thanh: false,
          },
        },
        // Add more fallback projects here
      ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          Thăm công trình
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
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute top-0 left-0 bg-[#F15A24] text-white px-3 py-1 text-sm font-medium">
                  Thực tế
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-4 text-sm line-clamp-2">
                  {project.title}
                </h3>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${project.progress.khoi_cong ? "bg-[#B87B44]" : "bg-gray-300"}`}
                    />
                    <div className="h-0.5 w-full bg-gray-200 mt-1" />
                    <span className="text-[10px] mt-1 text-center">
                      Khởi công
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${project.progress.phan_tho ? "bg-[#B87B44]" : "bg-gray-300"}`}
                    />
                    <div className="h-0.5 w-full bg-gray-200 mt-1" />
                    <span className="text-[10px] mt-1 text-center">
                      Phần thô
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${project.progress.thi_cong_noi_that ? "bg-[#B87B44]" : "bg-gray-300"}`}
                    />
                    <div className="h-0.5 w-full bg-gray-200 mt-1" />
                    <span className="text-[10px] mt-1 text-center">
                      Thi công nội thất
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${project.progress.lap_dat_hoan_thien ? "bg-[#B87B44]" : "bg-gray-300"}`}
                    />
                    <div className="h-0.5 w-full bg-gray-200 mt-1" />
                    <span className="text-[10px] mt-1 text-center">
                      Lắp đặt hoàn thiện
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${project.progress.hoan_thanh ? "bg-[#B87B44]" : "bg-gray-300"}`}
                    />
                    <div className="h-0.5 w-full bg-gray-200 mt-1" />
                    <span className="text-[10px] mt-1 text-center">
                      Hoàn thành
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
          >
            Xem thêm Các công trình
          </Button>
        </div>
      </div>
    </div>
  );
}
