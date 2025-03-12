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
// Sử dụng URL triển khai mới
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbw64cTHiv0rMzfbe8VSdtGeHOsvQnJSNFRrNvEIJP9lZgOIO7Huv_eHrXNFrWMLTta-WA/exec";

// Security token for form submission
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

    // Add timestamp with GMT+7 adjustment
    const now = new Date();
    const gmtPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000);
    formData.append("timestamp", gmtPlus7.toISOString());

    // Add security token
    formData.append("securityToken", SECURITY_TOKEN);

    // Add source information
    formData.append("source", window.location.hostname);
    formData.append("formType", "website_contact");

    // Log data being sent
    console.log("Sending form data:", Object.fromEntries(formData.entries()));

    // Submit data
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: formData,
      mode: "no-cors", // This is required for Google Apps Script
    });

    return { success: true, message: "Đã gửi thông tin thành công!" };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau.",
    };
  }
}
