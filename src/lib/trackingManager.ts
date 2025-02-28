import analytics from "./analytics";

class TrackingManager {
  private static instance: TrackingManager;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): TrackingManager {
    if (!TrackingManager.instance) {
      TrackingManager.instance = new TrackingManager();
    }
    return TrackingManager.instance;
  }

  public init(): void {
    if (this.isInitialized) return;

    // Khởi tạo analytics
    analytics.init();

    // Theo dõi các sự kiện trang web
    this.trackPageViews();
    this.trackClicks();
    this.trackFormSubmissions();

    this.isInitialized = true;
  }

  private trackPageViews(): void {
    // Theo dõi lượt xem trang
    analytics.trackEvent("page_view", {
      url: window.location.href,
      referrer: document.referrer,
      title: document.title,
    });

    // Theo dõi thay đổi trang (cho SPA)
    window.addEventListener("popstate", () => {
      analytics.trackEvent("page_view", {
        url: window.location.href,
        referrer: document.referrer,
        title: document.title,
      });
    });
  }

  private trackClicks(): void {
    // Theo dõi các click vào liên kết và nút
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const clickTarget = this.findClickableParent(target);

      if (clickTarget) {
        const isLink = clickTarget.tagName === "A";
        const isButton =
          clickTarget.tagName === "BUTTON" ||
          (clickTarget.tagName === "INPUT" &&
            (clickTarget as HTMLInputElement).type === "button") ||
          (clickTarget as HTMLInputElement).type === "submit";

        if (isLink || isButton) {
          let eventData: any = {
            element_type: clickTarget.tagName.toLowerCase(),
            element_text: clickTarget.textContent?.trim() || "",
            element_classes: clickTarget.className,
          };

          if (isLink) {
            const link = clickTarget as HTMLAnchorElement;
            eventData.href = link.href;
            eventData.target = link.target;
          }

          analytics.trackEvent("click", eventData);
        }
      }
    });
  }

  private findClickableParent(element: HTMLElement | null): HTMLElement | null {
    if (!element) return null;

    // Kiểm tra nếu element hiện tại là clickable
    if (
      element.tagName === "A" ||
      element.tagName === "BUTTON" ||
      (element.tagName === "INPUT" &&
        ((element as HTMLInputElement).type === "button" ||
          (element as HTMLInputElement).type === "submit"))
    ) {
      return element;
    }

    // Kiểm tra các thuộc tính role
    if (element.getAttribute("role") === "button") {
      return element;
    }

    // Kiểm tra các sự kiện click
    const onclick = element.getAttribute("onclick");
    if (onclick) {
      return element;
    }

    // Đệ quy kiểm tra parent
    if (element.parentElement) {
      return this.findClickableParent(element.parentElement);
    }

    return null;
  }

  private trackFormSubmissions(): void {
    document.addEventListener("submit", (e) => {
      const form = e.target as HTMLFormElement;
      const formData: any = {
        form_id: form.id || "unknown",
        form_name: form.name || "unknown",
        form_action: form.action,
        form_method: form.method,
        form_fields: [],
      };

      // Collect form fields data
      const formElements = Array.from(form.elements) as HTMLElement[];
      formElements.forEach((element) => {
        if (
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.tagName === "SELECT"
        ) {
          const input = element as
            | HTMLInputElement
            | HTMLTextAreaElement
            | HTMLSelectElement;
          const fieldName = input.name || input.id || "unnamed";
          let fieldValue;

          if (input.type === "password") {
            fieldValue = "********"; // Don't track actual passwords
          } else if (input.type === "checkbox" || input.type === "radio") {
            fieldValue = (input as HTMLInputElement).checked;
          } else {
            fieldValue = input.value ? "filled" : "empty"; // Don't track actual values for privacy
          }

          formData.form_fields.push({
            name: fieldName,
            type: input.type || input.tagName.toLowerCase(),
            value: fieldValue,
          });
        }
      });

      analytics.trackEvent("form_submit", formData);
    });
  }
}

const trackingManager = TrackingManager.getInstance();
export default trackingManager;
