import express from "express";
import passport from "passport";

import isLoggedIn from "../../middleware/auth";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/failed", (req, res) => res.send("you fail to log in"));

router.get("/success", isLoggedIn, (req, res) =>
  res.send(`login success ${req.user.displayName}`)
);

router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "/api/google/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/google/success");
  }
);

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

export default router;
