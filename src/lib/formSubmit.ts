/**
 * Handles form submission to Google Sheets with enhanced security
 */

export interface FormData {
  name: string;
  phone: string;
  address?: string;
  area?: string;
  message?: string;
}

// Google Sheet submission endpoint - secured with access control
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyEZj07KpHi9rBcbbz7LRoLTmQ4uEQZ6JOMfrZEcRJVxMr69kJpDq2K3MhpvvTiWZrJRg/exec";

// Security token for form submission - must match the token in Google Apps Script
const SECURITY_TOKEN = "betaviet_form_2024";

/**
 * Submits form data to Google Sheets with security measures
 * @param data Form data to submit
 * @returns Promise with submission result
 */
export async function submitToGoogleSheet(
  data: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    // Create form data for submission
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    // Add timestamp
    formData.append("timestamp", new Date().toISOString());

    // Add security token
    formData.append("securityToken", SECURITY_TOKEN);

    // Add source information
    formData.append("source", window.location.hostname);
    formData.append("formType", "website_contact");

    // Submit data
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: formData,
      mode: "cors", // Changed from no-cors to cors to get proper error responses
      headers: {
        Accept: "application/json",
      },
    });

    // Check if response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Form submission server error:", errorText);
      return {
        success: false,
        message: "Lỗi máy chủ: " + (response.status || "unknown"),
      };
    }

    // Try to parse response
    try {
      const result = await response.json();
      return result;
    } catch (parseError) {
      console.log("Response received but could not parse JSON");
      return { success: true, message: "Đã gửi thông tin thành công!" };
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.",
    };
  }
}
