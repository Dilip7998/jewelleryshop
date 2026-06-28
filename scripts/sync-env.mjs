import fs from "node:fs";

function parse(file) {
  const values = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const value = line.trim();
    if (!value || value.startsWith("#")) continue;
    const separator = value.indexOf("=");
    if (separator > 0) {
      values[value.slice(0, separator)] = value.slice(separator + 1);
    }
  }
  return values;
}

function write(file, values, order) {
  const content = order
    .filter((key) => Object.hasOwn(values, key))
    .map((key) => `${key}=${values[key]}`)
    .join("\n");
  fs.writeFileSync(file, `${content}\n`, { mode: 0o600 });
  fs.chmodSync(file, 0o600);
}

const backendOrder = [
  "PORT",
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  "FRONTEND_URL",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "NOTIFY_EMAIL"
];
const frontendOrder = [
  "NEXT_PUBLIC_API_URL",
  "NEXT_PUBLIC_SITE_URL"
];

const backend = {
  ...parse("backend/.env.production.local")
};
const frontend = {
  ...parse("frontend/.env.production.local")
};

write("backend/.env", backend, backendOrder);
write("frontend/.env.local", frontend, frontendOrder);
console.log("Local env files synced from production; local MongoDB and URLs preserved.");
