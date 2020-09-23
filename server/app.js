import express from "express";
import mongoose from "mongoose";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import cookieSession from "cookie-session";
require("./config/passport-setup");

// Routes
import postRoutes from "./routes/api/post";
import googleRoutes from "./routes/api/google";
// import userRoutes from "./routes/api/user";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(cors({ rigin: true, credentials: true }));
app.use(morgan("dev"));

app.use(express.json());

app.use(
  cookieSession({
    name: "bookWorld-session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connecting Success ! ! !"))
  .catch((e) => console.log(e));

// Use routes
app.get("/", (req, res) => res.send("not login, home"));
app.use("/api/post", postRoutes);
app.use("/api/google", googleRoutes);
// app.use("/api/user", userRoutes);

export default app;
