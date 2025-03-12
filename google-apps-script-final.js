// Đây là mã Google Apps Script cần được cập nhật trong Google Apps Script Editor

// Add CORS headers to all responses
function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

function doPost(e) {
  try {
    // Lấy dữ liệu từ form
    const data = e.parameter;

    // Kiểm tra token bảo mật
    const securityToken = data.securityToken;
    if (securityToken !== "betaviet_form_2024") {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: "Unauthorized access",
        }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ID của Google Sheet mới
    const spreadsheetId = "1ikjlNw61BVD_Ump4CaTpt7opeYT9hwbmQD7p8pbNbnc";
    const sheet =
      SpreadsheetApp.openById(spreadsheetId).getSheetByName("Form Responses") ||
      SpreadsheetApp.openById(spreadsheetId).getSheets()[0];

    // Chuẩn bị dữ liệu để ghi vào sheet
    const timestamp = data.timestamp || new Date().toISOString();
    const name = data.name || "";
    const phone = data.phone || "";
    const address = data.address || "";
    const area = data.area || "";
    const message = data.message || "";
    const source = data.source || "";
    const formType = data.formType || "";

    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      timestamp,
      name,
      phone,
      address,
      area,
      message,
      source,
      formType,
    ]);

    // Trả về kết quả thành công
    const response = ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Đã gửi thông tin thành công!",
      }),
    ).setMimeType(ContentService.MimeType.JSON);

    return setCorsHeaders(response);
  } catch (error) {
    // Xử lý lỗi
    const response = ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Lỗi: " + error.message,
      }),
    ).setMimeType(ContentService.MimeType.JSON);

    return setCorsHeaders(response);
  }
}

function doGet() {
  const response = ContentService.createTextOutput(
    "Form submission API is running",
  );
  return setCorsHeaders(response);
}

// Handle OPTIONS requests for CORS preflight
function doOptions() {
  const response = ContentService.createTextOutput("");
  return setCorsHeaders(response);
}
