const nodemailer = require("nodemailer");

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransporter() {
  if (!isSmtpConfigured()) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendEnquiryNotification(enquiry) {
  const transporter = createTransporter();
  if (!transporter) return;

  const to = process.env.NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
  if (!to) return;

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `New jewellery enquiry from ${enquiry.name}`,
    text: [
      `Name: ${enquiry.name}`,
      `Phone: ${enquiry.phone}`,
      `Email: ${enquiry.email}`,
      enquiry.productId ? `Product: ${enquiry.productId}` : "",
      "",
      enquiry.message
    ]
      .filter(Boolean)
      .join("\n")
  });
}

module.exports = { sendEnquiryNotification };
