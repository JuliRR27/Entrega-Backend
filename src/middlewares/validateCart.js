const validateCart = async (req, res, next) => {
  const requestedCart = req.params.cid;

  if (req.user.role.toUpperCase() !== "ADMIN") {
    const userCart = req.user?.cid?.toString();
    if (requestedCart !== userCart) {
      return res.status(400).json({
        message: "Carts do not match",
      });
    }
  }
  return next();
};

export default validateCart;
