const nodemailer = require("nodemailer");
const dns = require("dns");

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getRecipients() {
  return [process.env.ADMIN_EMAIL, process.env.NOTIFY_EMAIL]
    .flatMap((value) => (value || "").split(","))
    .map((value) => value.trim())
    .filter((value, index, values) => value && values.indexOf(value) === index);
}

function createTransporter() {
  if (!isSmtpConfigured()) return null;

  const port = Number(process.env.SMTP_PORT || 587);
  const secure =
    process.env.SMTP_SECURE === "true" ? true : process.env.SMTP_SECURE === "false" ? false : port === 465;
  const debug = process.env.SMTP_DEBUG === "true";

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    family: 4,
    logger: debug,
    debug,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

function describeSmtpError(error) {
  const parts = ["SMTP send failed"];
  if (error?.code) parts.push(`code=${error.code}`);
  if (error?.command) parts.push(`command=${error.command}`);
  if (error?.response) parts.push(`response=${error.response}`);
  if (error?.address) parts.push(`address=${error.address}`);
  if (error?.port) parts.push(`port=${error.port}`);
  if (error?.hostname) parts.push(`hostname=${error.hostname}`);
  if (error?.syscall) parts.push(`syscall=${error.syscall}`);
  if (error?.errno) parts.push(`errno=${error.errno}`);
  if (error?.message) parts.push(`message=${error.message}`);
  return parts.join(" | ");
}

async function sendEnquiryNotification(enquiry) {
  const transporter = createTransporter();
  if (!transporter) return false;

  const recipients = getRecipients();
  if (recipients.length === 0) return false;

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipients,
      replyTo: enquiry.email,
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

    return true;
  } catch (error) {
    const detail = describeSmtpError(error);
    const enriched = new Error(detail);
    enriched.cause = error;
    throw enriched;
  }
}

module.exports = {
  sendEnquiryNotification,
  getRecipients,
  isSmtpConfigured,
  describeSmtpError
};
