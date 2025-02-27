import analytics from "./analytics";

interface FraudScore {
  score: number;
  reasons: string[];
  timestamp: number;
  sessionId: string;
}

export class FraudDetection {
  private static instance: FraudDetection;
  private fraudScores: FraudScore[] = [];
  private apiEndpoint: string;
  private isInitialized = false;
  private checkInterval: number = 30000; // 30 giây
  private intervalId: number | null = null;

  private constructor() {
    this.apiEndpoint =
      import.meta.env.VITE_FRAUD_DETECTION_API || "/api/fraud-detection";
  }

  public static getInstance(): FraudDetection {
    if (!FraudDetection.instance) {
      FraudDetection.instance = new FraudDetection();
    }
    return FraudDetection.instance;
  }

  public init(): void {
    if (this.isInitialized) return;

    // Khởi tạo analytics nếu chưa được khởi tạo
    analytics.init();

    // Bắt đầu kiểm tra gian lận định kỳ
    this.intervalId = window.setInterval(
      () => this.checkForFraud(),
      this.checkInterval,
    );

    // Kiểm tra ngay lập tức
    this.checkForFraud();

    this.isInitialized = true;
  }

  public stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private checkForFraud(): void {
    const sessionData = analytics.getSessionData();
    const events = analytics.getEvents();
    const fraudScore = this.calculateFraudScore(sessionData, events);

    this.fraudScores.push(fraudScore);

    // Giới hạn số lượng fraud scores lưu trữ
    if (this.fraudScores.length > 100) {
      this.fraudScores = this.fraudScores.slice(-100);
    }

    // Gửi dữ liệu nếu phát hiện gian lận
    if (fraudScore.score >= 70) {
      this.reportFraud(fraudScore);
    }
  }

  private calculateFraudScore(sessionData: any, events: any[]): FraudScore {
    let score = 0;
    const reasons: string[] = [];

    // 1. Kiểm tra bot detection score từ analytics
    if (sessionData.botDetection.score >= 50) {
      score += 30;
      reasons.push(
        `Bot detection score cao: ${sessionData.botDetection.score}`,
      );
      reasons.push(...sessionData.botDetection.reasons);
    }

    // 2. Kiểm tra hành vi bất thường
    const behaviorScore = this.checkBehaviorPatterns(sessionData, events);
    score += behaviorScore.score;
    reasons.push(...behaviorScore.reasons);

    // 3. Kiểm tra form submissions
    const formScore = this.checkFormSubmissions(events);
    score += formScore.score;
    reasons.push(...formScore.reasons);

    // 4. Kiểm tra contact clicks
    const contactScore = this.checkContactClicks(events);
    score += contactScore.score;
    reasons.push(...contactScore.reasons);

    // 5. Kiểm tra thông tin thiết bị và mạng
    const deviceScore = this.checkDeviceAndNetwork(sessionData);
    score += deviceScore.score;
    reasons.push(...deviceScore.reasons);

    return {
      score: Math.min(score, 100), // Giới hạn điểm tối đa là 100
      reasons,
      timestamp: Date.now(),
      sessionId: sessionData.sessionInfo.sessionId,
    };
  }

  private checkBehaviorPatterns(
    sessionData: any,
    events: any[],
  ): { score: number; reasons: string[] } {
    let score = 0;
    const reasons: string[] = [];

    // Kiểm tra thời gian trên trang
    if (sessionData.behaviorInfo.timeOnPage < 5) {
      // Dưới 5 giây
      score += 15;
      reasons.push(
        `Thời gian trên trang quá ngắn: ${sessionData.behaviorInfo.timeOnPage}s`,
      );
    }

    // Kiểm tra di chuyển chuột
    if (sessionData.behaviorInfo.mouseMovements.length === 0) {
      score += 20;
      reasons.push("Không có di chuyển chuột");
    } else {
      // Kiểm tra mẫu di chuyển chuột bất thường (quá thẳng hoặc quá đều)
      const mouseMovements = sessionData.behaviorInfo.mouseMovements;
      if (mouseMovements.length > 10) {
        let straightLineCount = 0;
        for (let i = 2; i < mouseMovements.length; i++) {
          const p1 = mouseMovements[i - 2];
          const p2 = mouseMovements[i - 1];
          const p3 = mouseMovements[i];

          // Kiểm tra 3 điểm có thẳng hàng không
          const slope1 =
            p1.y !== p2.y ? (p2.x - p1.x) / (p2.y - p1.y) : Infinity;
          const slope2 =
            p2.y !== p3.y ? (p3.x - p2.x) / (p3.y - p2.y) : Infinity;

          if (Math.abs(slope1 - slope2) < 0.1) {
            straightLineCount++;
          }
        }

        const straightLinePercentage =
          straightLineCount / (mouseMovements.length - 2);
        if (straightLinePercentage > 0.8) {
          score += 15;
          reasons.push(
            `Di chuyển chuột quá thẳng: ${(straightLinePercentage * 100).toFixed(2)}%`,
          );
        }
      }
    }

    // Kiểm tra clicks
    if (sessionData.behaviorInfo.clickCount === 0) {
      score += 10;
      reasons.push("Không có clicks");
    } else {
      // Kiểm tra tốc độ click
      const clicks = sessionData.behaviorInfo.clickPositions;
      if (clicks.length >= 2) {
        let fastClickCount = 0;
        for (let i = 1; i < clicks.length; i++) {
          const timeBetweenClicks = clicks[i].time - clicks[i - 1].time;
          if (timeBetweenClicks < 300) {
            // Dưới 300ms
            fastClickCount++;
          }
        }

        if (fastClickCount > clicks.length / 3) {
          score += 15;
          reasons.push(
            `Tốc độ click quá nhanh: ${fastClickCount} clicks nhanh`,
          );
        }
      }
    }

    // Kiểm tra scroll
    if (sessionData.behaviorInfo.scrollDepth === 0) {
      score += 10;
      reasons.push("Không có scroll");
    }

    // Kiểm tra keyboard
    if (
      sessionData.behaviorInfo.keyPresses === 0 &&
      events.some((e) => e.formData)
    ) {
      score += 10;
      reasons.push("Có form submission nhưng không có keypress");
    }

    return { score, reasons };
  }

  private checkFormSubmissions(events: any[]): {
    score: number;
    reasons: string[];
  } {
    let score = 0;
    const reasons: string[] = [];

    const formSubmits = events.filter((e) => e.eventType === "form_submit");
    if (formSubmits.length === 0) return { score, reasons };

    // Kiểm tra thời gian hoàn thành form
    for (const submit of formSubmits) {
      if (submit.formData) {
        if (submit.formData.completionTime < 1000) {
          // Dưới 1 giây
          score += 25;
          reasons.push(
            `Form hoàn thành quá nhanh: ${submit.formData.completionTime}ms`,
          );
        } else if (submit.formData.completionTime < 3000) {
          // Dưới 3 giây
          score += 15;
          reasons.push(
            `Form hoàn thành khá nhanh: ${submit.formData.completionTime}ms`,
          );
        }

        // Kiểm tra số lần thay đổi trường
        const totalChanges = submit.formData.fieldInteractions.reduce(
          (sum: number, interaction: any) =>
            sum + (interaction.changeCount || 0),
          0,
        );
        if (totalChanges === 0) {
          score += 20;
          reasons.push("Không có thay đổi trường form");
        } else if (totalChanges < submit.formData.formFields.length) {
          score += 10;
          reasons.push(
            `Số lần thay đổi trường (${totalChanges}) ít hơn số trường (${submit.formData.formFields.length})`,
          );
        }

        // Kiểm tra thời gian giữa các lần focus
        if (submit.formData.fieldInteractions.length > 1) {
          let suspiciousInteractions = 0;
          for (let i = 1; i < submit.formData.fieldInteractions.length; i++) {
            const timeBetweenFields =
              submit.formData.fieldInteractions[i].focusTime -
              submit.formData.fieldInteractions[i - 1].blurTime;
            if (timeBetweenFields < 100) {
              // Dưới 100ms
              suspiciousInteractions++;
            }
          }

          if (
            suspiciousInteractions >
            submit.formData.fieldInteractions.length / 2
          ) {
            score += 20;
            reasons.push(
              `Thời gian chuyển giữa các trường quá nhanh: ${suspiciousInteractions} lần`,
            );
          }
        }

        // Kiểm tra dữ liệu form
        const phoneFields = submit.formData.formFields.filter(
          (field: any) =>
            field.name.toLowerCase().includes("phone") ||
            field.name.toLowerCase().includes("tel") ||
            field.name.toLowerCase().includes("sdt") ||
            field.name.toLowerCase().includes("điện thoại"),
        );

        for (const phoneField of phoneFields) {
          if (phoneField.value) {
            // Kiểm tra số điện thoại Việt Nam
            const vnPhoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
            if (!vnPhoneRegex.test(phoneField.value.replace(/\s/g, ""))) {
              score += 15;
              reasons.push(`Số điện thoại không hợp lệ: ${phoneField.value}`);
            }
          }
        }

        // Kiểm tra email
        const emailFields = submit.formData.formFields.filter(
          (field: any) =>
            field.name.toLowerCase().includes("email") ||
            field.type === "email",
        );

        for (const emailField of emailFields) {
          if (emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
              score += 15;
              reasons.push(`Email không hợp lệ: ${emailField.value}`);
            } else {
              // Kiểm tra tên miền email đáng ngờ
              const suspiciousDomains = [
                "tempmail",
                "temp-mail",
                "fakeinbox",
                "mailinator",
                "guerrillamail",
                "yopmail",
              ];
              const domain = emailField.value.split("@")[1];
              if (suspiciousDomains.some((d) => domain.includes(d))) {
                score += 20;
                reasons.push(`Email sử dụng tên miền đáng ngờ: ${domain}`);
              }
            }
          }
        }
      }
    }

    // Kiểm tra số lượng form submissions
    if (formSubmits.length > 3) {
      score += 15;
      reasons.push(`Số lượng form submissions cao: ${formSubmits.length}`);
    }

    return { score, reasons };
  }

  private checkContactClicks(events: any[]): {
    score: number;
    reasons: string[];
  } {
    let score = 0;
    const reasons: string[] = [];

    const contactClicks = events.filter((e) => e.eventType === "contact_click");
    if (contactClicks.length === 0) return { score, reasons };

    // Kiểm tra số lượng contact clicks
    if (contactClicks.length > 5) {
      score += 15;
      reasons.push(`Số lượng contact clicks cao: ${contactClicks.length}`);
    }

    // Kiểm tra thời gian giữa các contact clicks
    if (contactClicks.length >= 2) {
      let fastClickCount = 0;
      for (let i = 1; i < contactClicks.length; i++) {
        const timeBetweenClicks =
          contactClicks[i].timestamp - contactClicks[i - 1].timestamp;
        if (timeBetweenClicks < 1000) {
          // Dưới 1 giây
          fastClickCount++;
        }
      }

      if (fastClickCount > 0) {
        score += 20;
        reasons.push(
          `Click liên hệ quá nhanh: ${fastClickCount} clicks dưới 1 giây`,
        );
      }
    }

    // Kiểm tra đa dạng loại contact
    const contactTypes = new Set(
      contactClicks.map((click) => click.customData?.contactType || "unknown"),
    );
    if (contactTypes.size > 3) {
      score += 10;
      reasons.push(
        `Click nhiều loại liên hệ khác nhau: ${Array.from(contactTypes).join(", ")}`,
      );
    }

    return { score, reasons };
  }

  private checkDeviceAndNetwork(sessionData: any): {
    score: number;
    reasons: string[];
  } {
    let score = 0;
    const reasons: string[] = [];

    // Kiểm tra User-Agent
    const userAgent = sessionData.deviceInfo?.userAgent?.toLowerCase() || "";
    const suspiciousUserAgentPatterns = [
      "headless",
      "phantomjs",
      "selenium",
      "webdriver",
      "puppeteer",
      "chrome-lighthouse",
      "googlebot",
      "bingbot",
      "baiduspider",
    ];

    for (const pattern of suspiciousUserAgentPatterns) {
      if (userAgent.includes(pattern)) {
        score += 25;
        reasons.push(`User-Agent đáng ngờ: ${pattern}`);
        break;
      }
    }

    // Kiểm tra thiết bị
    if (sessionData.deviceInfo && !sessionData.deviceInfo.cookiesEnabled) {
      score += 15;
      reasons.push("Cookies bị tắt");
    }

    if (
      sessionData.deviceInfo &&
      !sessionData.deviceInfo.localStorageAvailable
    ) {
      score += 15;
      reasons.push("LocalStorage không khả dụng");
    }

    // Kiểm tra mạng - Add null/undefined checks
    if (sessionData.networkInfo) {
      const networkType = [];
      if (sessionData.networkInfo.isProxy) networkType.push("Proxy");
      if (sessionData.networkInfo.isVpn) networkType.push("VPN");
      if (sessionData.networkInfo.isTor) networkType.push("Tor");

      if (networkType.length > 0) {
        score += 20;
        reasons.push(`Sử dụng ${networkType.join("/")}`);
      }
    }

    return { score, reasons };
  }

  private reportFraud(fraudScore: FraudScore): void {
    // Gửi dữ liệu đến server
    fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fraudScore,
        url: window.location.href,
        timestamp: Date.now(),
        sessionData: analytics.getSessionData(),
        events: analytics.getEvents().slice(-20), // Chỉ gửi 20 sự kiện gần nhất
      }),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý phản hồi từ server nếu cần
        if (data.action === "block") {
          this.blockUser();
        }
      })
      .catch((error) => {
        console.error("Error reporting fraud:", error);
      });
  }

  private blockUser(): void {
    // Thực hiện hành động chặn người dùng
    // Ví dụ: chuyển hướng đến trang thông báo hoặc hiển thị captcha
    console.log("User blocked due to suspicious activity");
  }

  // Public API
  public getFraudScores(): FraudScore[] {
    return [...this.fraudScores]; // Return a copy
  }

  public getLatestFraudScore(): FraudScore | null {
    return this.fraudScores.length > 0
      ? this.fraudScores[this.fraudScores.length - 1]
      : null;
  }

  public isFraudulent(): boolean {
    const latestScore = this.getLatestFraudScore();
    return latestScore ? latestScore.score >= 70 : false;
  }
}

// Khởi tạo và xuất instance
const fraudDetection = FraudDetection.getInstance();
export default fraudDetection;
