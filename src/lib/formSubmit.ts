/**
 * Handles form submission to Google Sheets
 */

export interface FormData {
  name: string;
  phone: string;
  address?: string;
  area?: string;
  message?: string;
}

// Google Sheet submission endpoint
const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwZr3_CLIt8_mPQn-8uVpTWNquf5orxV76NimhOgyB8UBaTiEzhX8CmGLJsMtVUUA5E/exec";

/**
 * Submits form data to Google Sheets
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
