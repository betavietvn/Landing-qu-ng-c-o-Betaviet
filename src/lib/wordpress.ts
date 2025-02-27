export interface Project {
  id?: number;
  image: string;
  title: string;
  code: string;
  avatar: string;
}

export async function fetchProjects(type: string): Promise<Project[]> {
  // This is a mock function that would normally fetch from WordPress API
  // In a real implementation, you would fetch from your WordPress API endpoint

  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data based on project type
    if (type === "architecture") {
      return [
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
    } else if (type === "interior") {
      return [
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
    } else if (type === "construction") {
      return [
        {
          id: 1,
          title:
            "Thi công xây dựng biệt thự tân cổ điển 3 tầng 360m2 tại Hà Nội TC2009134",
          code: "TC2009134",
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/mau-biet-thu-hien-dai-3-tang-phong-ngu-tai-ha-noi-kt23012.jpg",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        },
        {
          id: 2,
          title:
            "Thi công xây dựng biệt thự hiện đại 3 tầng tại Hải Phòng TC2103145",
          code: "TC2103145",
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/biet-thu-tan-co-dien-4-tang-7-phong-ngu-tai-thai-binh-kt20148.jpg",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        },
        {
          id: 3,
          title:
            "Thi công xây dựng biệt thự tân cổ điển 2 tầng tại Bắc Ninh TC1908123",
          code: "TC1908123",
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/thiet-ke-biet-thu-lau-dai-kieu-phap-3-tang-tai-thanh-hoa-kt18099.jpg",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        },
        {
          id: 4,
          title:
            "Thi công xây dựng biệt thự hiện đại 4 tầng tại Hà Nội TC2205167",
          code: "TC2205167",
          image:
            "https://betaviet.vn/wp-content/uploads/2024/01/thiet-ke-biet-thu-tan-co-dien-mai-mansard-tai-hung-yen-kt2001994.jpg",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        },
      ];
    }

    // Default empty array if type doesn't match
    return [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
