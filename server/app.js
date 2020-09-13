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
// import loginRoutes from "./routes/api/login";
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

const isLoggedIn = (req, rs, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

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
app.get("/");
app.use("/api/post", postRoutes);
// app.use("/api/login", loginRoutes);
// app.use("/api/user", userRoutes);

// Google login
app.get("/failed", (req, res) => res.send("you fail to log in"));
app.get("/success", isLoggedIn, (req, res) =>
  res.send(`login success ${req.user.displayName}`)
);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/success");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default app;
