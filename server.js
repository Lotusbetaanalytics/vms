const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

// Routes Files
const visitors = require("./routes/visitor");
const returning = require("./routes/returningVisitor");

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Boy Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
//Sanitize data
app.use(mongoSanitize());

//set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 mins
  max: 300,
});
app.use(limiter);

//prevent http param pollution
app.use(hpp());

//enable CORS
app.use(cors());

//Mount Routers

//Mount Routers
app.use("/api/v1/visitors", visitors);
app.use("/api/v1/returning", returning);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // close Server & exit Process

  server.close(() => process.exit(1));
});
