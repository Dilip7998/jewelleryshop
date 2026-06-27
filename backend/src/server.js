const path = require("path");

require("dotenv").config({
  path: path.join(
    __dirname,
    "..",
    process.env.NODE_ENV === "production" ? ".env.production.local" : ".env"
  )
});

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { connectDb } = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const { ensureDefaultAdmin } = require("./scripts/ensureDefaultAdmin");

const app = express();
const port = process.env.PORT || 5000;

function validateEnvironment() {
  const production = process.env.NODE_ENV === "production";
  const required = production
    ? [
        "MONGODB_URI",
        "JWT_SECRET",
        "ADMIN_EMAIL",
        "ADMIN_PASSWORD",
        "FRONTEND_URL"
      ]
    : ["MONGODB_URI", "JWT_SECRET"];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  if (production && process.env.JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters in production");
  }
  if (production && process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters in production");
  }
  if (
    production &&
    ["replace-with-a-long-random-secret", "ChangeMe123!", "owner@example.com"].some(
      (value) =>
        value === process.env.JWT_SECRET ||
        value === process.env.ADMIN_PASSWORD ||
        value === process.env.ADMIN_EMAIL
    )
  ) {
    throw new Error("Template credentials must be replaced before production deployment");
  }
  if (
    production &&
    /(?:localhost|127\.0\.0\.1)/i.test(process.env.MONGODB_URI)
  ) {
    throw new Error("Production MONGODB_URI must point to a hosted database");
  }
  if (production && !process.env.FRONTEND_URL.startsWith("https://")) {
    throw new Error("Production FRONTEND_URL must use HTTPS");
  }
}

validateEnvironment();

configureCloudinary();

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
        .split(",")
        .map((value) => value.trim().replace(/\/$/, ""));
      if (!origin || allowedOrigins.includes(origin.replace(/\/$/, ""))) {
        return callback(null, true);
      }
      return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 400,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(
  "/api/auth/login",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login attempts. Please try again later." }
  })
);

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "degraded",
    database: databaseConnected ? "connected" : "disconnected"
  });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/offers", require("./routes/offers"));
app.use("/api/enquiries", require("./routes/enquiries"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/uploads", require("./routes/uploads"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error(error);
  const status =
    error.name === "ValidationError"
      ? 400
      : error.code === 11000
        ? 409
        : error.name === "MulterError"
          ? 400
          : error.message === "Origin is not allowed by CORS"
            ? 403
            : 500;
  res.status(status).json({
    message:
      status < 500 || process.env.NODE_ENV !== "production"
        ? error.message || "Request failed"
        : "Server error"
  });
});

let server;
connectDb()
  .then(ensureDefaultAdmin)
  .then(() => {
    server = app.listen(port, () => {
      console.log(`Jewellery API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
  });

async function shutdown(signal) {
  console.log(`${signal} received; shutting down`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.connection.close();
  process.exit(0);
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
