import express from "express";
import passport from "passport";

const router = express.Router();

//midleware
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// api/google

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("good");
  }
);

router.get("/failed", (req, res) => res.send("fail ! ! "));

router.get("/good", isLoggedIn, (req, res) => {
  console.log(req);
  res.send(`welcome ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default router;
