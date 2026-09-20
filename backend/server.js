const express = require("express");
const recipesRoutes = require("./routes/recipe");
const userRoutes = require("./routes/user");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const app = express();
app.use(express.static("public"));
const mongoose = require("mongoose");
const cron = require("node-cron");
// const mongoURL = 'mongodb+srv://heinzin121021_db_user:Io61STpbROwZRX6N@mern-cluster.39arczc.mongodb.net/?appName=MERN-Cluster'
const mongoURL = "mongodb://127.0.0.1:27017/mern-project";
const cors = require("cors");
const AuthMiddleware = require("./middlewares/authMiddleware");
const sendEmail = require("./helpers/sendEmail");
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("connected to db");
    app.listen(process.env.PORT, () => {
      console.log("app is running on localhost:4000");
      cron.schedule("* * * * *", () => {
        console.log("running a task every minute");
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use("/api/recipes", AuthMiddleware, recipesRoutes);
app.use("/api/users", userRoutes);
app.get("/api/send-email", async (req, res) => {
  try {
    await sendEmail({
      viewFileName: "email",
      data: { name: "Hein Htet" },
      from: "mgmg@gmail.com",
      to: "heinzin121021@gmail.com",
      subject: "Test Email",
    });

    return res.send("Email already sent");
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      status: 500,
    });
  }
});
