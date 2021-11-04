const isAuth = (req, res, next) => {
  const session = req.session.user;
  if (session) {
    next(true);
  }
  next(false);
};