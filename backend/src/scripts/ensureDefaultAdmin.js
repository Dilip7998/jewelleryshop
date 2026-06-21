const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD missing; admin seed skipped");
    return;
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) return;

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({
    name: "Shop Owner",
    email,
    passwordHash
  });

  console.log(`Default admin created for ${email}`);
}

module.exports = { ensureDefaultAdmin };
