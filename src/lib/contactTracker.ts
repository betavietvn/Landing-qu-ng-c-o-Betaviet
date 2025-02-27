import analytics, { TrackingEventType } from "./analytics";

interface ContactClickData {
  contactType: string;
  timestamp: number;
  elementInfo: {
    type: string;
    id: string;
    text: string;
    path: string;
    position: { x: number; y: number };
  };
  userInfo: {
    sessionId: string;
    deviceType: string;
    browser: string;
    os: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
  };
  behaviorInfo: {
    timeOnPage: number;
    scrollDepth: number;
    previousClicks: number;
    previousPageViews: number;
  };
  botProbability: number;
}

interface FormSubmissionData {
  formId: string;
  formName: string;
  timestamp: number;
  completionTime: number;
  fields: Array<{
    name: string;
    type: string;
    value: string;
    isValid: boolean;
    interactionTime: number;
    changeCount: number;
  }>;
  userInfo: {
    sessionId: string;
    deviceType: string;
    browser: string;
    os: string;
    referrer: string;
    utmSource: string;
    utmMedium: string;
    utmCampaign: string;
  };
  behaviorInfo: {
    timeOnPage: number;
    scrollDepth: number;
    previousClicks: number;
    previousPageViews: number;
  };
  botProbability: number;
}

export class ContactTracker {
  private static instance: ContactTracker;
  private contactClicks: ContactClickData[] = [];
  private formSubmissions: FormSubmissionData[] = [];
  private apiEndpoint: string;
  private isInitialized = false;

  private constructor() {
    this.apiEndpoint =
      import.meta.env.VITE_CONTACT_TRACKING_API || "/api/contact-tracking";
  }

  public static getInstance(): ContactTracker {
    if (!ContactTracker.instance) {
      ContactTracker.instance = new ContactTracker();
    }
    return ContactTracker.instance;
  }

  public init(): void {
    if (this.isInitialized) return;

    // Khởi tạo analytics nếu chưa được khởi tạo
    analytics.init();

    // Thiết lập các event listener
    this.setupContactClickListeners();
    this.setupFormSubmissionListeners();

    this.isInitialized = true;

    // Gửi dữ liệu định kỳ
    setInterval(() => this.sendTrackingData(), 60000); // Gửi dữ liệu mỗi 60 giây
  }

  private setupContactClickListeners(): void {
    // Theo dõi các liên kết liên hệ như số điện thoại, email, chat
    // Only use valid CSS selectors (removing jQuery-style :contains() selectors)
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
      ".contact-button",
      "[data-contact]",
    ];

    // We'll add button detection based on text content separately since :contains() is not valid CSS
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      // Check if element matches any of our valid CSS selectors
      let contactElement = null;
      for (const selector of contactSelectors) {
        contactElement = target.closest(selector);
        if (contactElement) break;
      }

      // If no match found by selectors, check buttons with specific text content
      if (!contactElement) {
        const button = target.closest("button");
        if (button) {
          const buttonText = button.textContent?.toLowerCase() || "";
          if (
            buttonText.includes("đặt lịch") ||
            buttonText.includes("liên hệ") ||
            buttonText.includes("tư vấn") ||
            buttonText.includes("gọi ngay") ||
            buttonText.includes("gửi") ||
            buttonText.includes("đăng ký") ||
            buttonText.includes("nhận tư vấn")
          ) {
            contactElement = button;
          }
        }
      }

      if (contactElement) {
        this.trackContactClick(contactElement, event);
      }
    });
  }

  private setupFormSubmissionListeners(): void {
    // Theo dõi tất cả các form trên trang
    document.addEventListener("submit", (event) => {
      const form = event.target as HTMLFormElement;
      this.trackFormSubmission(form);
    });
  }

  private trackContactClick(element: HTMLElement, event: MouseEvent): void {
    const contactType = this.getContactType(element);
    const sessionData = analytics.getSessionData();

    const contactClickData: ContactClickData = {
      contactType,
      timestamp: Date.now(),
      elementInfo: {
        type: element.tagName.toLowerCase(),
        id: element.id || "",
        text: element.textContent?.trim() || "",
        path: this.getElementPath(element),
        position: { x: event.clientX, y: event.clientY },
      },
      userInfo: {
        sessionId: sessionData.sessionInfo.sessionId,
        deviceType: sessionData.deviceInfo.deviceType,
        browser: `${sessionData.deviceInfo.browserName} ${sessionData.deviceInfo.browserVersion}`,
        os: `${sessionData.deviceInfo.os} ${sessionData.deviceInfo.osVersion}`,
        referrer: sessionData.sessionInfo.referrer,
        utmSource: sessionData.sessionInfo.utmSource,
        utmMedium: sessionData.sessionInfo.utmMedium,
        utmCampaign: sessionData.sessionInfo.utmCampaign,
      },
      behaviorInfo: {
        timeOnPage: sessionData.behaviorInfo.timeOnPage,
        scrollDepth: sessionData.behaviorInfo.scrollDepth,
        previousClicks: sessionData.behaviorInfo.clickCount,
        previousPageViews: sessionData.sessionInfo.previousVisits,
      },
      botProbability: sessionData.botDetection.score,
    };

    this.contactClicks.push(contactClickData);

    // Ghi nhận sự kiện trong analytics
    analytics.trackEvent(TrackingEventType.CONTACT_CLICK, {
      contactType,
      elementInfo: contactClickData.elementInfo,
      botProbability: contactClickData.botProbability,
    });

    // Gửi dữ liệu ngay lập tức nếu là click liên hệ
    this.sendTrackingData([contactClickData]);
  }

  private trackFormSubmission(form: HTMLFormElement): void {
    const formId = form.id || `form-${Math.random().toString(36).substr(2, 9)}`;
    const formName = form.getAttribute("name") || "";
    const formData = new FormData(form);
    const sessionData = analytics.getSessionData();
    const formInteractions = analytics
      .getEvents()
      .filter(
        (event) => event.eventType === TrackingEventType.FORM_FIELD_CHANGE,
      )
      .reduce(
        (acc, event) => {
          if (event.customData && event.customData.fieldId) {
            acc[event.customData.fieldId] = event.customData;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

    const fields: Array<{
      name: string;
      type: string;
      value: string;
      isValid: boolean;
      interactionTime: number;
      changeCount: number;
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

          // Lấy thông tin tương tác từ analytics
          const fieldId = field.id || field.name || "";
          const interaction = formInteractions[fieldId] || {};

          fields.push({
            name: fieldName,
            type: fieldType,
            value: fieldValue,
            isValid,
            interactionTime: interaction.timeSpent || 0,
            changeCount: interaction.changeCount || 0,
          });
        },
      );

    const formSubmissionData: FormSubmissionData = {
      formId,
      formName,
      timestamp: Date.now(),
      completionTime: 0, // Sẽ được tính toán từ analytics
      fields,
      userInfo: {
        sessionId: sessionData.sessionInfo.sessionId,
        deviceType: sessionData.deviceInfo.deviceType,
        browser: `${sessionData.deviceInfo.browserName} ${sessionData.deviceInfo.browserVersion}`,
        os: `${sessionData.deviceInfo.os} ${sessionData.deviceInfo.osVersion}`,
        referrer: sessionData.sessionInfo.referrer,
        utmSource: sessionData.sessionInfo.utmSource,
        utmMedium: sessionData.sessionInfo.utmMedium,
        utmCampaign: sessionData.sessionInfo.utmCampaign,
      },
      behaviorInfo: {
        timeOnPage: sessionData.behaviorInfo.timeOnPage,
        scrollDepth: sessionData.behaviorInfo.scrollDepth,
        previousClicks: sessionData.behaviorInfo.clickCount,
        previousPageViews: sessionData.sessionInfo.previousVisits,
      },
      botProbability: sessionData.botDetection.score,
    };

    // Tìm sự kiện form submit trong analytics để lấy thời gian hoàn thành
    const formSubmitEvents = analytics
      .getEvents()
      .filter(
        (event) =>
          event.eventType === TrackingEventType.FORM_SUBMIT &&
          event.formData?.formId === formId,
      );

    if (formSubmitEvents.length > 0 && formSubmitEvents[0].formData) {
      formSubmissionData.completionTime =
        formSubmitEvents[0].formData.completionTime;
    }

    this.formSubmissions.push(formSubmissionData);

    // Gửi dữ liệu ngay lập tức
    this.sendTrackingData([], [formSubmissionData]);
  }

  private sendTrackingData(
    contactClicksToSend: ContactClickData[] = [],
    formSubmissionsToSend: FormSubmissionData[] = [],
  ): void {
    const clicksToSend =
      contactClicksToSend.length > 0 ? contactClicksToSend : this.contactClicks;
    const formsToSend =
      formSubmissionsToSend.length > 0
        ? formSubmissionsToSend
        : this.formSubmissions;

    if (clicksToSend.length === 0 && formsToSend.length === 0) return;

    const trackingData = {
      contactClicks: clicksToSend,
      formSubmissions: formsToSend,
      timestamp: Date.now(),
      url: window.location.href,
      botDetection: analytics.getSessionData().botDetection,
    };

    // Gửi dữ liệu đến server
    fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingData),
      keepalive: true, // Đảm bảo request hoàn thành ngay cả khi trang đóng
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        // Xóa các dữ liệu đã gửi khỏi danh sách
        if (contactClicksToSend.length === 0) {
          this.contactClicks = [];
        } else {
          const clickTimestamps = contactClicksToSend.map(
            (click) => click.timestamp,
          );
          this.contactClicks = this.contactClicks.filter(
            (click) => !clickTimestamps.includes(click.timestamp),
          );
        }

        if (formSubmissionsToSend.length === 0) {
          this.formSubmissions = [];
        } else {
          const formTimestamps = formSubmissionsToSend.map(
            (form) => form.timestamp,
          );
          this.formSubmissions = this.formSubmissions.filter(
            (form) => !formTimestamps.includes(form.timestamp),
          );
        }
      })
      .catch((error) => {
        console.error("Error sending contact tracking data:", error);
      });
  }

  // Utility methods
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
    if (text.includes("đặt lịch") || text.includes("tư vấn"))
      return "consultation";
    if (text.includes("liên hệ")) return "contact";
    if (text.includes("gửi") || text.includes("đăng ký")) return "form_submit";

    return "other";
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

  // Public API
  public getContactClicks(): ContactClickData[] {
    return [...this.contactClicks]; // Return a copy
  }

  public getFormSubmissions(): FormSubmissionData[] {
    return [...this.formSubmissions]; // Return a copy
  }

  public clearData(): void {
    this.contactClicks = [];
    this.formSubmissions = [];
  }
}

// Khởi tạo và xuất instance
const contactTracker = ContactTracker.getInstance();
export default contactTracker;
