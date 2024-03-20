const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const notifRoute = require("./routes/notifRoute");
const postRoute = require("./routes/postRoute");
const verifyToken = require("./middlewares/verifyToken");
const dotenv = require("dotenv").config();
const app = express();

const connectDB = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", verifyToken, postRoute);
app.use("/notifications", notifRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
