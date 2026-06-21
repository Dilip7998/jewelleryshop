require("dotenv").config();

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { connectDb } = require("./config/db");
const { configureCloudinary } = require("./config/cloudinary");
const { ensureDefaultAdmin } = require("./scripts/ensureDefaultAdmin");

const app = express();
const port = process.env.PORT || 5000;

configureCloudinary();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
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

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
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
  const status = error.name === "ValidationError" ? 400 : 500;
  res.status(status).json({
    message: error.message || "Server error"
  });
});

connectDb()
  .then(ensureDefaultAdmin)
  .then(() => {
    app.listen(port, () => {
      console.log(`Jewellery API running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Startup failed:", error);
    process.exit(1);
  });
