const authenticateAdmin = (req, res, next) => {
  if (req.session.email !== "admin@admin.com" && req.session.role !== 1) {
    return res.status(400).json({
      success: false,
      response: "Buh! You can`t access this endpoint",
    });
  }
  return next();
};

export default authenticateAdmin;
