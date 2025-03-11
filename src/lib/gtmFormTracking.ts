/**
 * Google Tag Manager form tracking integration
 * Tracks form submissions and extracts phone numbers for Google Ads
 */

export function initGTMFormTracking() {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return;

  // Listen for form submissions across all forms
  document.addEventListener("submit", function (event) {
    const form = event.target as HTMLFormElement;
    if (!form || !form.tagName || form.tagName.toLowerCase() !== "form") return;

    // Extract phone number from the form
    const phoneInputs = form.querySelectorAll(
      'input[name="phone"], input[type="tel"], input[name*="dien-thoai"]',
    );
    let phoneValue = "";

    phoneInputs.forEach(function (input) {
      const inputEl = input as HTMLInputElement;
      if (inputEl.value) {
        // Format phone number for Google Ads (add +84 prefix and remove leading 0)
        phoneValue = "+84" + inputEl.value.replace(/^(?!00[^0])0/, "");
      }
    });

    // Store the phone number in a global variable
    if (phoneValue && window) {
      (window as any).phoneCF7EC = phoneValue;
    }

    // Push the event to dataLayer
    if (window && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "ContactFormSubmit",
        formPhone: phoneValue || undefined,
      });
    }
  });

  // Also listen for the CF7 specific event if it exists (for backward compatibility)
  document.addEventListener("wpcf7mailsent", function (event: any) {
    if (!event || !event.detail || !event.detail.inputs) return;

    const data = event.detail.inputs;
    let phoneValue = "";

    data.forEach(function (i: any) {
      if (i.name && i.name.includes("dien-thoai") && i.value) {
        phoneValue = "+84" + i.value.replace(/^(?!00[^0])0/, "");
      }
    });

    // Store the phone number in a global variable
    if (phoneValue && window) {
      (window as any).phoneCF7EC = phoneValue;
    }

    // Push the event to dataLayer
    if (window && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "ContactFormSubmit",
        formPhone: phoneValue || undefined,
      });
    }
  });
}
