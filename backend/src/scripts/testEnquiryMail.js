const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env.production.local")
});
require("dotenv").config({
  path: path.join(__dirname, "..", ".env"),
  override: false
});

const { sendEnquiryNotification, getRecipients, isSmtpConfigured } = require("../utils/mailer");

async function main() {
  const recipients = getRecipients();
  console.log("SMTP configured:", isSmtpConfigured());
  console.log("Recipients:", recipients.length ? recipients.join(", ") : "(none)");

  if (!isSmtpConfigured()) {
    throw new Error("SMTP credentials are missing in the loaded env file");
  }
  if (recipients.length === 0) {
    throw new Error("No recipients configured. Set ADMIN_EMAIL or NOTIFY_EMAIL");
  }

  await sendEnquiryNotification({
    name: "SMTP Test",
    phone: "+91 99999 99999",
    email: process.env.SMTP_FROM || process.env.SMTP_USER || "test@example.com",
    message: "This is a local SMTP smoke test from jewellery-shop.",
    productId: ""
  });

  console.log("Test email sent successfully");
}

main().catch((error) => {
  console.error("SMTP test failed:", {
    message: error.message,
    code: error.code,
    response: error.response,
    command: error.command
  });
  process.exit(1);
});
