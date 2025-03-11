import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ConstructionProject {
  id: number;
  title: string;
  code: string;
  image: string;
  link: string;
  progress: {
    khoi_cong: boolean;
    phan_tho: boolean;
    thi_cong_noi_that: boolean;
    lap_dat_hoan_thien: boolean;
    hoan_thanh: boolean;
  };
}

export default function ConstructionVisit() {
  const [loading, setLoading] = useState(false);

  // Construction projects data
  const constructionProjects: ConstructionProject[] = [
    {
      id: 1,
      title:
        "Hoàn thiện nội thất luxury biệt thự phố 1000m2 tại Thanh Hóa – HT21194",
      code: "HT21194",
      image:
        "https://betaviet.vn/wp-content/uploads/2025/02/hoan-thien-noi-that-hien-dai-luxury-HT21194-40-600x400.jpg",
      link: "https://betaviet.vn/cong-trinh/hoan-thien-noi-that-luxury-biet-thu-pho-1000m2-tai-thanh-hoa-ht21194/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: true,
        hoan_thanh: true,
      },
    },
    {
      id: 2,
      title:
        "Thi công xây dựng biệt thự tân cổ điển 3 tầng 360m2 tại Hà Nội TC2009134",
      code: "TC2009134",
      image:
        "https://betaviet.vn/wp-content/uploads/2025/01/dai-dien-thi-cong-xay-dung-biet-thu-tan-co-dien-3-tang-360m2-tai-ha-noi-tc2009134-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/thi-cong-xay-dung-biet-thu-tan-co-dien-3-tang-360m2-tai-ha-noi-tc2009134/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: false,
        hoan_thanh: false,
      },
    },
    {
      id: 3,
      title: "Xây dựng biệt thự 3 tầng tân cổ điển tại Thanh Hóa TC24985",
      code: "TC24985",
      image:
        "https://betaviet.vn/wp-content/uploads/2025/01/dai-dien-xay-dung-biet-thu-3-tang-tan-co-dien-tai-thanh-hoa-tc24985-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/xay-dung-biet-thu-3-tang-tan-co-dien-tai-thanh-hoa-tc24985/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: false,
        lap_dat_hoan_thien: false,
        hoan_thanh: false,
      },
    },
    {
      id: 4,
      title: "Thi công nhà phố 3 tầng tân cổ điển tại Thanh Hóa TC24984",
      code: "TC24984",
      image:
        "https://betaviet.vn/wp-content/uploads/2025/01/dai-dien-thi-cong-nha-pho-3-tang-tan-co-dien-tai-thanh-hoa-tc24984-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/thi-cong-nha-pho-3-tang-tan-co-dien-tai-thanh-hoa-tc24984/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: false,
        hoan_thanh: false,
      },
    },
    {
      id: 5,
      title: "Thi công xây dựng công ty 4 tầng tại Hải Phòng TC24935",
      code: "TC24935",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/12/dai-dien-tien-trinh-thi-cong-xay-dung-cong-ty-tai-hai-duong-tc24935-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/thi-cong-xay-dung-cong-ty-4-tang-tai-hai-phong-tc24935/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: false,
        lap_dat_hoan_thien: false,
        hoan_thanh: false,
      },
    },
    {
      id: 6,
      title: "Thi công trọn gói nhà phố 4 tầng tại Hải Dương TC24942",
      code: "TC24942",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/12/dai-dien-thi-cong-nha-pho-tron-goi-tai-hai-duong-tc24942-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/thi-cong-tron-goi-nha-pho-4-tang-tai-hai-duong-tc24942/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: true,
        hoan_thanh: false,
      },
    },
    {
      id: 7,
      title: "Xây dựng biệt thự 2 tầng tại Hải Dương TC24647",
      code: "TC24647",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/12/dai-dien-xay-dung-biet-thu-tai-hai-duong-tc24647-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/xay-dung-biet-thu-2-tang-tai-hai-duong-tc24647/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: true,
        hoan_thanh: true,
      },
    },
    {
      id: 8,
      title: "Thi công xây dựng biệt thự 4 tầng tại Bắc Giang TC24621",
      code: "TC24621",
      image:
        "https://betaviet.vn/wp-content/uploads/2024/12/dai-dien-thi-cong-xay-dung-biet-thu-tai-bac-giang-tc24621-600x404.jpg",
      link: "https://betaviet.vn/cong-trinh/thi-cong-xay-dung-biet-thu-4-tang-tai-bac-giang-tc24621/",
      progress: {
        khoi_cong: true,
        phan_tho: true,
        thi_cong_noi_that: true,
        lap_dat_hoan_thien: false,
        hoan_thanh: false,
      },
    },
  ];

  if (loading) {
    return <div className="py-16 bg-white text-center">Loading...</div>;
  }

  return (
    <div id="construction-visit" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#B87B44] mb-4">
          THĂM CÔNG TRÌNH
        </h2>

        <p className="text-center mb-8 max-w-3xl mx-auto">
          10 phong cách thiết kế thịnh hành, Hàng chục nghìn công trình chất
          lượng cao,
          <br />
          Đánh giá sâu sắc từ kiến trúc sư, Giúp bạn có được nguồn cảm hứng
          thiết kế ngôi nhà một cách nhanh chóng!
        </p>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {constructionProjects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              className="bg-white rounded-lg overflow-hidden shadow-lg block"
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
            </a>
          ))}
        </div>

        {/* Mobile slider */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 mb-4">
          <div className="flex space-x-4 w-max">
            {constructionProjects.map((project) => (
              <a
                key={project.id}
                href={project.link}
                className="bg-white rounded-lg overflow-hidden shadow-lg block w-[280px] flex-shrink-0"
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
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="https://betaviet.vn/tham-cong-trinh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-[#B87B44] text-[#B87B44] hover:bg-[#B87B44] hover:text-white"
            >
              Xem thêm Các công trình
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
