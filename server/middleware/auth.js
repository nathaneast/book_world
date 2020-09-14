//midleware
const isLoggedIn = (req, rs, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export default isLoggedIn;
