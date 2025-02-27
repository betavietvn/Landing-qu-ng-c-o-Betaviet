import analytics from "./analytics";
import contactTracker from "./contactTracker";
import fraudDetection from "./fraudDetection";

// Lớp quản lý tất cả các hệ thống theo dõi
export class TrackingManager {
  private static instance: TrackingManager;
  private isInitialized = false;
  private apiEndpoint: string;

  private constructor() {
    this.apiEndpoint = import.meta.env.VITE_TRACKING_API || "/api/tracking";
  }

  public static getInstance(): TrackingManager {
    if (!TrackingManager.instance) {
      TrackingManager.instance = new TrackingManager();
    }
    return TrackingManager.instance;
  }

  public init(): void {
    if (this.isInitialized) return;

    try {
      // Khởi tạo analytics trước
      analytics.init();

      // Đảm bảo rằng các hệ thống khác được khởi tạo sau analytics
      setTimeout(() => {
        try {
          contactTracker.init();
          fraudDetection.init();
        } catch (error) {
          console.error("Error initializing tracking systems:", error);
        }
      }, 100);

      // Thiết lập event listener cho sự kiện beforeunload
      window.addEventListener("beforeunload", () => this.sendFinalData());

      this.isInitialized = true;

      // Gửi dữ liệu tổng hợp định kỳ
      setInterval(() => this.sendAggregatedData(), 120000); // 2 phút
    } catch (error) {
      console.error("Error in TrackingManager.init():", error);
    }
  }

  private sendFinalData(): void {
    // Gửi dữ liệu cuối cùng trước khi người dùng rời trang
    const finalData = {
      sessionData: analytics.getSessionData(),
      contactClicks: contactTracker.getContactClicks(),
      formSubmissions: contactTracker.getFormSubmissions(),
      fraudScore: fraudDetection.getLatestFraudScore(),
      url: window.location.href,
      timestamp: Date.now(),
      finalEvent: true,
    };

    // Sử dụng sendBeacon để đảm bảo dữ liệu được gửi ngay cả khi trang đóng
    if (navigator.sendBeacon) {
      navigator.sendBeacon(this.apiEndpoint, JSON.stringify(finalData));
    } else {
      // Fallback nếu sendBeacon không được hỗ trợ
      fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
        keepalive: true,
      }).catch((error) => console.error("Error sending final data:", error));
    }
  }

  private sendAggregatedData(): void {
    const aggregatedData = {
      sessionData: analytics.getSessionData(),
      contactClicks: contactTracker.getContactClicks(),
      formSubmissions: contactTracker.getFormSubmissions(),
      fraudScore: fraudDetection.getLatestFraudScore(),
      url: window.location.href,
      timestamp: Date.now(),
    };

    fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aggregatedData),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Xóa dữ liệu đã gửi
        contactTracker.clearData();
      })
      .catch((error) => {
        console.error("Error sending aggregated data:", error);
      });
  }

  // Public API
  public getTrackingData(): any {
    return {
      analytics: analytics.getSessionData(),
      contactClicks: contactTracker.getContactClicks(),
      formSubmissions: contactTracker.getFormSubmissions(),
      fraudDetection: {
        score: fraudDetection.getLatestFraudScore(),
        isFraudulent: fraudDetection.isFraudulent(),
      },
    };
  }

  public isFraudulent(): boolean {
    return fraudDetection.isFraudulent();
  }
}

// Khởi tạo và xuất instance
const trackingManager = TrackingManager.getInstance();
export default trackingManager;
