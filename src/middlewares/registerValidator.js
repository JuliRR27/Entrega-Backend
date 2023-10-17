import { userService } from "../service/index.js";

const validator = async (req, res, next) => {
  let { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({
      success: false,
      response: "All data required",
    });
  } else if (!email.match(/^[^\s@]+@[^\s@]+.[^\s@]+$/)) {
    return res.status(400).json({
      success: false,
      response: "Invalid email",
    });
  }

  let userExists = await userService.getUserByEmail(email);
  if (Boolean(userExists)) {
    return res.status(409).json({
      success: false,
      response: "User already registered",
    });
  }

  return next();
};

export default validator;
