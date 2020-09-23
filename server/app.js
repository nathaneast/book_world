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

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = config;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "978776759513-dgui263895hd7f4o2vqgkaf1ianforve.apps.googleusercontent.com",
      clientSecret: "OLAXCWz9uA45wkVtuhC0PlQH",
      callbackURL: "http://localhost:7000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // User.findById(id, function (err, user) {
  //   done(err, user);
  // });
  return done(null, user);
});

//

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
app.get("/", (req, res) => res.send("home"));
app.use("/api/post", postRoutes);
// app.use("/api/google", googleRoutes);
// app.use("/api/user", userRoutes);

//
//midleware
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => res.send("not login"));
app.get("/failed", (req, res) => res.send("fail ! ! "));
app.get("/good", isLoggedIn, (req, res) =>
  res.send(`welcome ${req.user.email}`)
);

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/good");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default app;

//login3
