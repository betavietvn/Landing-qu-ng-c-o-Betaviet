interface SessionData {
  sessionInfo: {
    sessionId: string;
  };
  deviceInfo: {
    userAgent: string;
    cookiesEnabled: boolean;
    localStorageAvailable: boolean;
  };
  networkInfo: {
    isProxy?: boolean;
    isVpn?: boolean;
    isTor?: boolean;
  };
  behaviorInfo: {
    timeOnPage: number;
    mouseMovements: any[];
    clickCount: number;
    clickPositions: any[];
    scrollDepth: number;
    keyPresses: number;
  };
  botDetection: {
    score: number;
    reasons: string[];
  };
}

class Analytics {
  private static instance: Analytics;
  private sessionData: SessionData;
  private events: any[] = [];

  private constructor() {
    // Initialize session data with default values
    this.sessionData = {
      sessionInfo: {
        sessionId: this.generateSessionId(),
      },
      deviceInfo: {
        userAgent: navigator.userAgent,
        cookiesEnabled: navigator.cookieEnabled,
        localStorageAvailable: this.checkLocalStorage(),
      },
      networkInfo: {},
      behaviorInfo: {
        timeOnPage: 0,
        mouseMovements: [],
        clickCount: 0,
        clickPositions: [],
        scrollDepth: 0,
        keyPresses: 0,
      },
      botDetection: {
        score: 0,
        reasons: [],
      },
    };
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  public init(): void {
    // Start tracking user behavior
    this.trackUserBehavior();
  }

  public getSessionData(): SessionData {
    return this.sessionData;
  }

  public getEvents(): any[] {
    return this.events;
  }

  private generateSessionId(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  }

  private checkLocalStorage(): boolean {
    try {
      localStorage.setItem("test", "test");
      localStorage.removeItem("test");
      return true;
    } catch (e) {
      return false;
    }
  }

  private trackUserBehavior(): void {
    // Track time on page
    const startTime = Date.now();
    setInterval(() => {
      this.sessionData.behaviorInfo.timeOnPage =
        (Date.now() - startTime) / 1000;
    }, 1000);

    // Track mouse movements
    document.addEventListener("mousemove", (e) => {
      this.sessionData.behaviorInfo.mouseMovements.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
      });

      // Limit the array size to prevent memory issues
      if (this.sessionData.behaviorInfo.mouseMovements.length > 100) {
        this.sessionData.behaviorInfo.mouseMovements =
          this.sessionData.behaviorInfo.mouseMovements.slice(-100);
      }
    });

    // Track clicks
    document.addEventListener("click", (e) => {
      this.sessionData.behaviorInfo.clickCount++;
      this.sessionData.behaviorInfo.clickPositions.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        target: e.target ? (e.target as HTMLElement).tagName : "unknown",
      });

      // Limit the array size
      if (this.sessionData.behaviorInfo.clickPositions.length > 50) {
        this.sessionData.behaviorInfo.clickPositions =
          this.sessionData.behaviorInfo.clickPositions.slice(-50);
      }
    });

    // Track scroll depth
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      this.sessionData.behaviorInfo.scrollDepth = Math.max(
        this.sessionData.behaviorInfo.scrollDepth,
        Math.min(100, Math.round(scrollPercentage)),
      );
    });

    // Track key presses
    document.addEventListener("keydown", () => {
      this.sessionData.behaviorInfo.keyPresses++;
    });
  }

  public trackEvent(eventType: string, eventData: any): void {
    this.events.push({
      eventType,
      eventData,
      timestamp: Date.now(),
    });

    // Limit the array size
    if (this.events.length > 200) {
      this.events = this.events.slice(-200);
    }
  }
}

const analytics = Analytics.getInstance();
export default analytics;
