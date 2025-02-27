// Định nghĩa các loại sự kiện theo dõi
export enum TrackingEventType {
  PAGE_VIEW = "page_view",
  FORM_SUBMIT = "form_submit",
  FORM_FIELD_CHANGE = "form_field_change",
  BUTTON_CLICK = "button_click",
  LINK_CLICK = "link_click",
  VIDEO_PLAY = "video_play",
  VIDEO_PAUSE = "video_pause",
  VIDEO_COMPLETE = "video_complete",
  SOCIAL_SHARE = "social_share",
  CONTACT_CLICK = "contact_click",
  SCROLL_DEPTH = "scroll_depth",
  TIME_ON_PAGE = "time_on_page",
  MOUSE_MOVEMENT = "mouse_movement",
  ERROR = "error",
}

// Thông tin thiết bị và trình duyệt
interface DeviceInfo {
  deviceType: string; // desktop, mobile, tablet
  os: string; // Windows, macOS, iOS, Android
  osVersion: string;
  screenResolution: string;
  deviceFingerprint: string;
  userAgent: string;
  browserName: string;
  browserVersion: string;
  browserLanguage: string;
  cookiesEnabled: boolean;
  localStorageAvailable: boolean;
}

// Thông tin mạng
interface NetworkInfo {
  ip: string;
  location: {
    country: string;
    city: string;
    region: string;
    timezone: string;
  };
  isp: string;
  connectionType: string; // wifi, cellular, etc.
  connectionSpeed: string;
  isProxy: boolean;
  isVpn: boolean;
  isTor: boolean;
}

// Thông tin phiên
interface SessionInfo {
  sessionId: string;
  startTime: number;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  landingPage: string;
  previousVisits: number;
  previousSessions: number;
}

// Thông tin hành vi người dùng
interface BehaviorInfo {
  timeOnPage: number;
  scrollDepth: number;
  clickCount: number;
  clickPositions: Array<{ x: number; y: number; time: number }>;
  mouseMovements: Array<{ x: number; y: number; time: number }>;
  keyPresses: number;
  formInteractions: Array<{
    fieldId: string;
    focusTime: number;
    blurTime: number;
    changeCount: number;
  }>;
  inactiveTime: number;
  tabSwitches: number;
}

// Thông tin form
interface FormData {
  formId: string;
  formName: string;
  formFields: Array<{
    name: string;
    value: string;
    type: string;
    validationStatus: boolean;
  }>;
  completionTime: number;
  startTime: number;
  submissionTime: number;
  fieldInteractions: Array<{
    fieldId: string;
    focusTime: number;
    blurTime: number;
    changeCount: number;
  }>;
  validationErrors: Array<{ fieldId: string; errorMessage: string }>;
}

// Thông tin sự kiện
interface TrackingEvent {
  eventType: TrackingEventType;
  timestamp: number;
  deviceInfo: DeviceInfo;
  networkInfo: NetworkInfo;
  sessionInfo: SessionInfo;
  behaviorInfo: BehaviorInfo;
  formData?: FormData;
  elementInfo?: {
    elementType: string;
    elementId: string;
    elementText: string;
    elementPath: string;
    elementPosition: { x: number; y: number };
  };
  customData?: Record<string, any>;
}

// Lớp phân tích dữ liệu chính
export class Analytics {
  private static instance: Analytics;
  private events: TrackingEvent[] = [];
  private sessionInfo: SessionInfo;
  private deviceInfo: DeviceInfo;
  private networkInfo: NetworkInfo;
  private behaviorInfo: BehaviorInfo;
  private isInitialized = false;
  private sessionStartTime: number;
  private mousePositions: Array<{ x: number; y: number; time: number }> = [];
  private clickPositions: Array<{ x: number; y: number; time: number }> = [];
  private scrollDepths: number[] = [];
  private formInteractions: Record<string, any> = {};
  private apiEndpoint: string;
  private botDetectionScore = 0;
  private isBot = false;

  private constructor() {
    this.sessionStartTime = Date.now();
    this.apiEndpoint =
      import.meta.env.VITE_ANALYTICS_API_ENDPOINT || "/api/analytics";
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init(): void {
    if (this.isInitialized) return;

    // Khởi tạo thông tin phiên
    this.initSessionInfo();

    // Khởi tạo thông tin thiết bị
    this.initDeviceInfo();

    // Khởi tạo thông tin mạng
    this.initNetworkInfo();

    // Khởi tạo thông tin hành vi
    this.initBehaviorInfo();

    // Thiết lập các event listener
    this.setupEventListeners();

    // Phát hiện bot
    this.detectBot();

    // Ghi nhận sự kiện page view
    this.trackEvent(TrackingEventType.PAGE_VIEW);

    this.isInitialized = true;

    // Gửi dữ liệu phân tích định kỳ
    setInterval(() => this.sendAnalyticsData(), 30000); // Gửi dữ liệu mỗi 30 giây
  }

  private initSessionInfo(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = this.generateUUID();
    const previousVisits = parseInt(
      localStorage.getItem("analyticsVisitCount") || "0",
    );
    localStorage.setItem(
      "analyticsVisitCount",
      (previousVisits + 1).toString(),
    );

    this.sessionInfo = {
      sessionId,
      startTime: this.sessionStartTime,
      referrer: document.referrer,
      utmSource: urlParams.get("utm_source") || "",
      utmMedium: urlParams.get("utm_medium") || "",
      utmCampaign: urlParams.get("utm_campaign") || "",
      utmTerm: urlParams.get("utm_term") || "",
      utmContent: urlParams.get("utm_content") || "",
      landingPage: window.location.pathname,
      previousVisits,
      previousSessions: parseInt(
        localStorage.getItem("analyticsSessionCount") || "0",
      ),
    };

    localStorage.setItem(
      "analyticsSessionCount",
      (this.sessionInfo.previousSessions + 1).toString(),
    );
  }

  private initDeviceInfo(): void {
    const userAgent = navigator.userAgent;
    const browserInfo = this.getBrowserInfo(userAgent);
    const osInfo = this.getOSInfo(userAgent);
    const deviceType = this.getDeviceType(userAgent);
    const fingerprint = this.generateDeviceFingerprint();

    this.deviceInfo = {
      deviceType,
      os: osInfo.name,
      osVersion: osInfo.version,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      deviceFingerprint: fingerprint,
      userAgent,
      browserName: browserInfo.name,
      browserVersion: browserInfo.version,
      browserLanguage: navigator.language,
      cookiesEnabled: navigator.cookieEnabled,
      localStorageAvailable: this.isLocalStorageAvailable(),
    };
  }

  private initNetworkInfo(): void {
    // Trong môi trường thực tế, thông tin này thường được lấy từ API bên thứ ba
    // hoặc từ server-side. Ở đây chúng ta sẽ sử dụng giá trị mẫu.
    this.networkInfo = {
      ip: "0.0.0.0", // Sẽ được cập nhật từ server
      location: {
        country: "Unknown",
        city: "Unknown",
        region: "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      isp: "Unknown",
      connectionType: this.getConnectionType(),
      connectionSpeed: "Unknown",
      isProxy: false,
      isVpn: false,
      isTor: false,
    };

    // Trong ứng dụng thực tế, bạn có thể sử dụng API để lấy thông tin IP
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        this.networkInfo.ip = data.ip;
        // Sau đó có thể gọi API khác để lấy thông tin về vị trí địa lý từ IP
      })
      .catch((error) => console.error("Error fetching IP:", error));
  }

  private initBehaviorInfo(): void {
    this.behaviorInfo = {
      timeOnPage: 0,
      scrollDepth: 0,
      clickCount: 0,
      clickPositions: [],
      mouseMovements: [],
      keyPresses: 0,
      formInteractions: [],
      inactiveTime: 0,
      tabSwitches: 0,
    };
  }

  private setupEventListeners(): void {
    // Theo dõi click
    document.addEventListener("click", (event) => this.handleClick(event));

    // Theo dõi di chuyển chuột
    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event),
    );

    // Theo dõi cuộn trang
    window.addEventListener("scroll", () => this.handleScroll());

    // Theo dõi nhấn phím
    document.addEventListener("keydown", () => this.handleKeyPress());

    // Theo dõi tương tác form
    this.setupFormListeners();

    // Theo dõi thời gian không hoạt động
    let inactivityTimer: number;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        this.behaviorInfo.inactiveTime += 30;
      }, 30000); // 30 giây không hoạt động
    };

    ["mousemove", "keydown", "click", "scroll"].forEach((eventType) => {
      document.addEventListener(eventType, resetInactivityTimer);
    });

    resetInactivityTimer();

    // Theo dõi chuyển tab
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.behaviorInfo.tabSwitches += 1;
      }
    });

    // Theo dõi thời gian trên trang
    setInterval(() => {
      this.behaviorInfo.timeOnPage = Math.floor(
        (Date.now() - this.sessionStartTime) / 1000,
      );
    }, 1000);

    // Theo dõi các liên kết liên hệ
    this.setupContactLinkListeners();

    // Theo dõi video
    this.setupVideoListeners();
  }

  private setupFormListeners(): void {
    // Tìm tất cả các form trên trang
    const forms = document.querySelectorAll("form");

    forms.forEach((form, formIndex) => {
      const formId = form.id || `form-${formIndex}`;

      // Theo dõi sự kiện submit form
      form.addEventListener("submit", (event) => {
        this.handleFormSubmit(event, formId);
      });

      // Theo dõi tương tác với các trường trong form
      const formFields = form.querySelectorAll("input, textarea, select");

      formFields.forEach((field: HTMLElement) => {
        const fieldId =
          field.id ||
          field.getAttribute("name") ||
          `field-${formIndex}-${Math.random().toString(36).substr(2, 9)}`;

        // Theo dõi khi focus vào trường
        field.addEventListener("focus", () => {
          if (!this.formInteractions[fieldId]) {
            this.formInteractions[fieldId] = {};
          }
          this.formInteractions[fieldId].focusTime = Date.now();
        });

        // Theo dõi khi blur khỏi trường
        field.addEventListener("blur", () => {
          if (
            this.formInteractions[fieldId] &&
            this.formInteractions[fieldId].focusTime
          ) {
            const focusTime = this.formInteractions[fieldId].focusTime;
            const blurTime = Date.now();
            const timeSpent = blurTime - focusTime;

            if (!this.formInteractions[fieldId].interactions) {
              this.formInteractions[fieldId].interactions = [];
            }

            this.formInteractions[fieldId].interactions.push({
              focusTime,
              blurTime,
              timeSpent,
            });

            // Thêm vào behaviorInfo
            this.behaviorInfo.formInteractions.push({
              fieldId,
              focusTime,
              blurTime,
              changeCount: this.formInteractions[fieldId].changeCount || 0,
            });
          }
        });

        // Theo dõi khi thay đổi giá trị
        field.addEventListener("input", () => {
          if (!this.formInteractions[fieldId]) {
            this.formInteractions[fieldId] = { changeCount: 0 };
          }
          this.formInteractions[fieldId].changeCount =
            (this.formInteractions[fieldId].changeCount || 0) + 1;

          this.trackEvent(TrackingEventType.FORM_FIELD_CHANGE, {
            fieldId,
            formId,
            changeCount: this.formInteractions[fieldId].changeCount,
          });
        });
      });
    });
  }

  private setupContactLinkListeners(): void {
    // Theo dõi các liên kết liên hệ như số điện thoại, email, chat
    const contactSelectors = [
      'a[href^="tel:"]',
      'a[href^="mailto:"]',
      'a[href*="zalo.me"]',
      'a[href*="m.me"]',
      'a[href*="messenger"]',
      'a[href*="whatsapp"]',
      'a[href*="viber"]',
      'a[href*="telegram"]',
      'a[href*="skype"]',
      'a[href*="tiktok"]',
      'a[href*="facebook"]',
      'a[href*="instagram"]',
      'a[href*="twitter"]',
      'a[href*="linkedin"]',
      'a[href*="youtube"]',
      ".contact-button",
      "[data-contact]",
    ];

    const contactLinks = document.querySelectorAll(contactSelectors.join(","));

    contactLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        const element = event.currentTarget as HTMLElement;
        const contactType = this.getContactType(element);

        this.trackEvent(TrackingEventType.CONTACT_CLICK, {
          contactType,
          linkText: element.textContent?.trim() || "",
          linkHref: (element as HTMLAnchorElement).href || "",
          linkId: element.id || "",
          linkClasses: element.className || "",
        });
      });
    });
  }

  private setupVideoListeners(): void {
    // Theo dõi các video trên trang
    const videos = document.querySelectorAll(
      'video, iframe[src*="youtube"], iframe[src*="vimeo"]',
    );

    videos.forEach((video, index) => {
      const videoId = video.id || `video-${index}`;

      if (video instanceof HTMLVideoElement) {
        // HTML5 Video
        video.addEventListener("play", () => {
          this.trackEvent(TrackingEventType.VIDEO_PLAY, {
            videoId,
            currentTime: video.currentTime,
          });
        });

        video.addEventListener("pause", () => {
          this.trackEvent(TrackingEventType.VIDEO_PAUSE, {
            videoId,
            currentTime: video.currentTime,
          });
        });

        video.addEventListener("ended", () => {
          this.trackEvent(TrackingEventType.VIDEO_COMPLETE, {
            videoId,
            duration: video.duration,
          });
        });
      } else if (video instanceof HTMLIFrameElement) {
        // YouTube hoặc Vimeo iframe - cần sử dụng API của họ
        // Đây chỉ là ví dụ, trong thực tế cần tích hợp với YouTube API hoặc Vimeo API
        console.log(
          "Iframe video detected, would need YouTube/Vimeo API integration",
        );
      }
    });
  }

  private handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickPosition = {
      x: event.clientX,
      y: event.clientY,
      time: Date.now(),
    };

    this.behaviorInfo.clickCount += 1;
    this.behaviorInfo.clickPositions.push(clickPosition);
    this.clickPositions.push(clickPosition);

    // Kiểm tra nếu là button hoặc link
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a")
    ) {
      const element =
        target.tagName === "BUTTON" || target.tagName === "A"
          ? target
          : target.closest("button") || target.closest("a");

      if (element) {
        const elementType = element.tagName.toLowerCase();
        const elementId = element.id || "";
        const elementText = element.textContent?.trim() || "";
        const elementPath = this.getElementPath(element);

        if (elementType === "a") {
          this.trackEvent(TrackingEventType.LINK_CLICK, {
            elementType,
            elementId,
            elementText,
            elementPath,
            elementPosition: { x: event.clientX, y: event.clientY },
            href: (element as HTMLAnchorElement).href || "",
          });
        } else {
          this.trackEvent(TrackingEventType.BUTTON_CLICK, {
            elementType,
            elementId,
            elementText,
            elementPath,
            elementPosition: { x: event.clientX, y: event.clientY },
          });
        }
      }
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    // Lưu vị trí chuột mỗi 100ms để tránh quá nhiều dữ liệu
    if (
      this.mousePositions.length === 0 ||
      Date.now() - this.mousePositions[this.mousePositions.length - 1].time >
        100
    ) {
      this.mousePositions.push({
        x: event.clientX,
        y: event.clientY,
        time: Date.now(),
      });

      // Giới hạn số lượng vị trí lưu trữ
      if (this.mousePositions.length > 1000) {
        this.mousePositions = this.mousePositions.slice(-1000);
      }
    }
  }

  private handleScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

    this.behaviorInfo.scrollDepth = Math.max(
      this.behaviorInfo.scrollDepth,
      scrollPercentage,
    );

    // Lưu độ sâu cuộn mỗi 5%
    const roundedPercentage = Math.floor(scrollPercentage / 5) * 5;
    if (
      !this.scrollDepths.includes(roundedPercentage) &&
      roundedPercentage > 0
    ) {
      this.scrollDepths.push(roundedPercentage);
      this.trackEvent(TrackingEventType.SCROLL_DEPTH, {
        depth: roundedPercentage,
      });
    }
  }

  private handleKeyPress(): void {
    this.behaviorInfo.keyPresses += 1;
  }

  private handleFormSubmit(event: Event, formId: string): void {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const formFields: Array<{
      name: string;
      value: string;
      type: string;
      validationStatus: boolean;
    }> = [];

    // Lấy thông tin các trường trong form
    form
      .querySelectorAll("input, textarea, select")
      .forEach(
        (field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
          const fieldName = field.name || field.id || "";
          const fieldType = field.type || field.tagName.toLowerCase();
          let fieldValue = "";

          // Không lưu giá trị của trường password
          if (fieldType === "password") {
            fieldValue = "********";
          } else if (field instanceof HTMLSelectElement) {
            fieldValue = field.value;
          } else if (
            field instanceof HTMLInputElement &&
            (field.type === "checkbox" || field.type === "radio")
          ) {
            fieldValue = field.checked ? "checked" : "unchecked";
          } else {
            fieldValue = field.value;
          }

          // Kiểm tra tính hợp lệ của trường
          const isValid = field.validity ? field.validity.valid : true;

          formFields.push({
            name: fieldName,
            value: fieldValue,
            type: fieldType,
            validationStatus: isValid,
          });
        },
      );

    // Tạo đối tượng dữ liệu form
    const formDataObj: FormData = {
      formId,
      formName: form.getAttribute("name") || "",
      formFields,
      completionTime: 0, // Sẽ được tính toán dựa trên thời gian tương tác
      startTime: 0, // Sẽ được cập nhật từ dữ liệu tương tác
      submissionTime: Date.now(),
      fieldInteractions: [],
      validationErrors: [],
    };

    // Tính toán thời gian hoàn thành và thời gian bắt đầu
    if (this.formInteractions) {
      const fieldInteractions: Array<{
        fieldId: string;
        focusTime: number;
        blurTime: number;
        changeCount: number;
      }> = [];
      let earliestInteraction = Date.now();

      Object.keys(this.formInteractions).forEach((fieldId) => {
        const interaction = this.formInteractions[fieldId];
        if (interaction.interactions && interaction.interactions.length > 0) {
          // Tìm thời gian tương tác đầu tiên
          const firstInteraction = interaction.interactions[0];
          earliestInteraction = Math.min(
            earliestInteraction,
            firstInteraction.focusTime,
          );

          // Thêm vào danh sách tương tác
          fieldInteractions.push({
            fieldId,
            focusTime: firstInteraction.focusTime,
            blurTime:
              interaction.interactions[interaction.interactions.length - 1]
                .blurTime,
            changeCount: interaction.changeCount || 0,
          });
        }
      });

      formDataObj.startTime = earliestInteraction;
      formDataObj.completionTime =
        formDataObj.submissionTime - earliestInteraction;
      formDataObj.fieldInteractions = fieldInteractions;
    }

    // Kiểm tra lỗi validation
    form
      .querySelectorAll(":invalid")
      .forEach(
        (
          invalidField:
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement,
        ) => {
          formDataObj.validationErrors.push({
            fieldId: invalidField.id || invalidField.name || "",
            errorMessage: invalidField.validationMessage || "Invalid field",
          });
        },
      );

    // Ghi nhận sự kiện submit form
    this.trackEvent(TrackingEventType.FORM_SUBMIT, { formData: formDataObj });

    // Phân tích hành vi để phát hiện bot
    this.analyzeFormSubmissionForBotDetection(formDataObj);
  }

  public trackEvent(
    eventType: TrackingEventType,
    customData: Record<string, any> = {},
  ): void {
    if (!this.isInitialized) {
      console.warn("Analytics not initialized. Call init() first.");
      return;
    }

    const event: TrackingEvent = {
      eventType,
      timestamp: Date.now(),
      deviceInfo: this.deviceInfo,
      networkInfo: this.networkInfo,
      sessionInfo: this.sessionInfo,
      behaviorInfo: { ...this.behaviorInfo }, // Tạo bản sao để tránh tham chiếu
      customData,
    };

    // Thêm thông tin phần tử nếu có
    if (customData.elementType) {
      event.elementInfo = {
        elementType: customData.elementType,
        elementId: customData.elementId || "",
        elementText: customData.elementText || "",
        elementPath: customData.elementPath || "",
        elementPosition: customData.elementPosition || { x: 0, y: 0 },
      };
    }

    // Thêm thông tin form nếu có
    if (customData.formData) {
      event.formData = customData.formData;
    }

    this.events.push(event);

    // Nếu là sự kiện quan trọng, gửi ngay lập tức
    if (
      eventType === TrackingEventType.FORM_SUBMIT ||
      eventType === TrackingEventType.CONTACT_CLICK ||
      eventType === TrackingEventType.ERROR
    ) {
      this.sendAnalyticsData([event]);
    }

    // Giới hạn số lượng sự kiện lưu trữ
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
  }

  private sendAnalyticsData(eventsToSend: TrackingEvent[] = []): void {
    const dataToSend = eventsToSend.length > 0 ? eventsToSend : this.events;

    if (dataToSend.length === 0) return;

    // Thêm thông tin về bot detection
    const analyticsData = {
      events: dataToSend,
      botDetection: {
        score: this.botDetectionScore,
        isBot: this.isBot,
        reasons: this.getBotDetectionReasons(),
      },
    };

    // Gửi dữ liệu đến server
    fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(analyticsData),
      keepalive: true, // Đảm bảo request hoàn thành ngay cả khi trang đóng
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Xóa các sự kiện đã gửi khỏi danh sách
        if (eventsToSend.length === 0) {
          this.events = [];
        } else {
          // Lọc ra các sự kiện chưa gửi
          const eventIds = eventsToSend.map((e) => e.timestamp);
          this.events = this.events.filter(
            (e) => !eventIds.includes(e.timestamp),
          );
        }
      })
      .catch((error) => {
        console.error("Error sending analytics data:", error);
      });
  }

  private detectBot(): void {
    // Kiểm tra User-Agent
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
      "bot",
      "crawler",
      "spider",
      "scraper",
      "headless",
      "phantom",
      "selenium",
      "puppeteer",
      "chrome-lighthouse",
      "googlebot",
      "yandexbot",
      "bingbot",
      "baiduspider",
    ];

    for (const pattern of botPatterns) {
      if (userAgent.includes(pattern)) {
        this.botDetectionScore += 50;
        break;
      }
    }

    // Kiểm tra navigator và window properties
    if (
      !navigator.webdriver === undefined ||
      !navigator.languages ||
      navigator.languages.length === 0 ||
      !navigator.plugins ||
      navigator.plugins.length === 0
    ) {
      this.botDetectionScore += 20;
    }

    // Kiểm tra automation properties
    if (
      (window as any).callPhantom ||
      (window as any)._phantom ||
      (window as any).__nightmare ||
      (window as any).domAutomation ||
      (window as any).webdriver ||
      (document as any).__webdriver_script_fn
    ) {
      this.botDetectionScore += 50;
    }

    // Kiểm tra permissions API
    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "notifications" as PermissionName })
        .then((permission) => {
          if (permission.state === "denied") {
            this.botDetectionScore += 10;
          }
        })
        .catch(() => {
          this.botDetectionScore += 5;
        });
    }

    // Cập nhật trạng thái bot
    this.isBot = this.botDetectionScore >= 50;
  }

  private analyzeFormSubmissionForBotDetection(formData: FormData): void {
    // Kiểm tra thời gian hoàn thành form
    if (formData.completionTime < 1000) {
      // Dưới 1 giây
      this.botDetectionScore += 30;
    } else if (formData.completionTime < 3000) {
      // Dưới 3 giây
      this.botDetectionScore += 15;
    }

    // Kiểm tra số lần thay đổi trường
    const totalChanges = formData.fieldInteractions.reduce(
      (sum, interaction) => sum + interaction.changeCount,
      0,
    );
    if (totalChanges === 0) {
      this.botDetectionScore += 20;
    } else if (totalChanges < formData.formFields.length) {
      this.botDetectionScore += 10;
    }

    // Kiểm tra thời gian giữa các lần focus
    if (formData.fieldInteractions.length > 1) {
      let suspiciousInteractions = 0;
      for (let i = 1; i < formData.fieldInteractions.length; i++) {
        const timeBetweenFields =
          formData.fieldInteractions[i].focusTime -
          formData.fieldInteractions[i - 1].blurTime;
        if (timeBetweenFields < 100) {
          // Dưới 100ms
          suspiciousInteractions++;
        }
      }

      if (suspiciousInteractions > formData.fieldInteractions.length / 2) {
        this.botDetectionScore += 25;
      }
    }

    // Cập nhật trạng thái bot
    this.isBot = this.botDetectionScore >= 50;
  }

  private getBotDetectionReasons(): string[] {
    const reasons: string[] = [];

    if (this.botDetectionScore >= 50) {
      // Kiểm tra User-Agent
      const userAgent = navigator.userAgent.toLowerCase();
      const botPatterns = [
        "bot",
        "crawler",
        "spider",
        "scraper",
        "headless",
        "phantom",
        "selenium",
        "puppeteer",
        "chrome-lighthouse",
        "googlebot",
        "yandexbot",
        "bingbot",
        "baiduspider",
      ];

      for (const pattern of botPatterns) {
        if (userAgent.includes(pattern)) {
          reasons.push(`Bot pattern detected in User-Agent: ${pattern}`);
          break;
        }
      }

      // Kiểm tra navigator và window properties
      if (!navigator.webdriver === undefined) {
        reasons.push("Missing webdriver property");
      }

      if (!navigator.languages || navigator.languages.length === 0) {
        reasons.push("Missing or empty languages");
      }

      if (!navigator.plugins || navigator.plugins.length === 0) {
        reasons.push("Missing or empty plugins");
      }

      // Kiểm tra automation properties
      if ((window as any).callPhantom || (window as any)._phantom) {
        reasons.push("PhantomJS detected");
      }

      if ((window as any).__nightmare) {
        reasons.push("Nightmare.js detected");
      }

      if ((window as any).domAutomation || (window as any).webdriver) {
        reasons.push("Automation driver detected");
      }

      // Kiểm tra hành vi
      if (this.behaviorInfo.mouseMovements.length === 0) {
        reasons.push("No mouse movements detected");
      }

      if (this.behaviorInfo.clickCount === 0) {
        reasons.push("No clicks detected");
      }

      // Kiểm tra form submissions
      const formSubmits = this.events.filter(
        (e) => e.eventType === TrackingEventType.FORM_SUBMIT,
      );
      for (const submit of formSubmits) {
        if (submit.formData && submit.formData.completionTime < 1000) {
          reasons.push(
            `Suspiciously fast form completion: ${submit.formData.completionTime}ms`,
          );
        }
      }
    }

    return reasons;
  }

  // Utility methods
  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  private getBrowserInfo(userAgent: string): { name: string; version: string } {
    const browsers = [
      { name: "Edge", regex: /Edge\/(\d+)/i },
      { name: "Chrome", regex: /Chrome\/(\d+)/i },
      { name: "Firefox", regex: /Firefox\/(\d+)/i },
      { name: "Safari", regex: /Version\/(\d+).*Safari/i },
      { name: "IE", regex: /MSIE (\d+)/i },
      { name: "Opera", regex: /OPR\/(\d+)/i },
    ];

    for (const browser of browsers) {
      const match = userAgent.match(browser.regex);
      if (match) {
        return { name: browser.name, version: match[1] };
      }
    }

    return { name: "Unknown", version: "0" };
  }

  private getOSInfo(userAgent: string): { name: string; version: string } {
    const osPatterns = [
      { name: "Windows", regex: /Windows NT (\d+\.\d+)/i },
      { name: "macOS", regex: /Mac OS X (\d+[._]\d+)/i },
      { name: "iOS", regex: /iPhone OS (\d+[._]\d+)/i },
      { name: "Android", regex: /Android (\d+\.\d+)/i },
      { name: "Linux", regex: /Linux/i },
    ];

    for (const os of osPatterns) {
      const match = userAgent.match(os.regex);
      if (match) {
        let version = match[1] || "0";
        version = version.replace("_", ".");
        return { name: os.name, version };
      }
    }

    return { name: "Unknown", version: "0" };
  }

  private getDeviceType(userAgent: string): string {
    if (/iPad|tablet|Kindle|PlayBook/i.test(userAgent)) {
      return "tablet";
    } else if (
      /Mobile|Android|iPhone|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      )
    ) {
      return "mobile";
    }
    return "desktop";
  }

  private generateDeviceFingerprint(): string {
    // Tạo fingerprint dựa trên thông tin thiết bị
    const components = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset(),
      navigator.platform,
      navigator.hardwareConcurrency,
      screen.colorDepth,
      screen.width + "x" + screen.height,
      navigator.cookieEnabled,
    ];

    // Thêm thông tin về fonts và plugins nếu có thể
    if (navigator.plugins) {
      const pluginsString = Array.from(navigator.plugins)
        .map((p) => p.name)
        .join(",");
      components.push(pluginsString);
    }

    // Tạo hash từ các thành phần
    return this.hashString(components.join("###"));
  }

  private hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = "test";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  private getConnectionType(): string {
    if (navigator.connection) {
      return (navigator.connection as any).effectiveType || "unknown";
    }
    return "unknown";
  }

  private getElementPath(element: Element): string {
    const path: string[] = [];
    let currentElement: Element | null = element;

    while (currentElement) {
      let selector = currentElement.tagName.toLowerCase();

      if (currentElement.id) {
        selector += `#${currentElement.id}`;
        path.unshift(selector);
        break;
      } else {
        let sibling: Element | null = currentElement;
        let siblingIndex = 1;

        while ((sibling = sibling.previousElementSibling)) {
          if (sibling.tagName === currentElement.tagName) {
            siblingIndex++;
          }
        }

        if (siblingIndex > 1) {
          selector += `:nth-of-type(${siblingIndex})`;
        }
      }

      path.unshift(selector);
      currentElement = currentElement.parentElement;
    }

    return path.join(" > ");
  }

  private getContactType(element: HTMLElement): string {
    if (element instanceof HTMLAnchorElement) {
      const href = element.href.toLowerCase();

      if (href.startsWith("tel:")) return "phone";
      if (href.startsWith("mailto:")) return "email";
      if (href.includes("zalo.me")) return "zalo";
      if (href.includes("m.me") || href.includes("messenger"))
        return "messenger";
      if (href.includes("whatsapp")) return "whatsapp";
      if (href.includes("viber")) return "viber";
      if (href.includes("telegram")) return "telegram";
      if (href.includes("skype")) return "skype";
      if (href.includes("facebook")) return "facebook";
      if (href.includes("instagram")) return "instagram";
      if (href.includes("twitter")) return "twitter";
      if (href.includes("linkedin")) return "linkedin";
      if (href.includes("youtube")) return "youtube";
      if (href.includes("tiktok")) return "tiktok";
    }

    // Kiểm tra các thuộc tính data
    const dataContact = element.getAttribute("data-contact");
    if (dataContact) return dataContact;

    // Kiểm tra text content
    const text = element.textContent?.toLowerCase() || "";
    if (text.includes("gọi") || text.includes("call")) return "phone";
    if (text.includes("email") || text.includes("mail")) return "email";
    if (text.includes("zalo")) return "zalo";
    if (text.includes("messenger")) return "messenger";
    if (text.includes("whatsapp")) return "whatsapp";

    return "other";
  }

  // Public API
  public getBotScore(): number {
    return this.botDetectionScore;
  }

  public isDetectedAsBot(): boolean {
    return this.isBot;
  }

  public getSessionData(): any {
    return {
      sessionInfo: this.sessionInfo,
      deviceInfo: this.deviceInfo,
      behaviorInfo: this.behaviorInfo,
      botDetection: {
        score: this.botDetectionScore,
        isBot: this.isBot,
        reasons: this.getBotDetectionReasons(),
      },
    };
  }

  public getEvents(): TrackingEvent[] {
    return [...this.events]; // Return a copy
  }
}

// Khởi tạo và xuất instance
const analytics = Analytics.getInstance();
export default analytics;
