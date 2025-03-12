// Đây là mã Google Apps Script cần được cập nhật trong Google Apps Script Editor

function doPost(e) {
  try {
    // Lấy dữ liệu từ form
    const data = e.parameter;

    // Kiểm tra token bảo mật
    const securityToken = data.securityToken;
    if (securityToken !== "betaviet_secure_form_2024") {
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
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Đã gửi thông tin thành công!",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Xử lý lỗi
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Lỗi: " + error.message,
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput("Form submission API is running");
}
