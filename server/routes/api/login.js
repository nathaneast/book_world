import express from "express";

const app = express();

const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();

const session = require("express-session");

app.use(
  session({
    secret: SECRET_CODE,
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false,
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SCRET,
      callbackURL: "http://localhost:7000/login/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect("/");
  }
};

// Router
router.get("/", authenticateUser, async (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/login", async (req, res, next) => {
  res.render("login", { title: "Login" });
});

router.get("/google", async (req, res, next) => {
  passport.authenticate("google", { scope: ["profile"] });
});

router.get("/google/callback", async (req, res, next) => {
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  });
});

export default router;
