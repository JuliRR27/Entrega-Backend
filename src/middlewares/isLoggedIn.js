export default (req, res, next) => {
  req.cookies.token
    ? // ? res.status(401).json({ error: "You are already logged in" })
      res.sendUserError(401, "You are already logged in")
    : next();
};
