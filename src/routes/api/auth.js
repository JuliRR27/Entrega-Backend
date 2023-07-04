import { Router } from "express";
import validator from "../../middlewares/validator.js";
import password_validator from "../../middlewares/passwordValidator.js";
import User from "../../dao/models/User.js";
import Cart from "../../dao/models/Cart.js";

const router = Router();

// REGISTER
router.post(
  "/register",
  validator,
  password_validator,
  async (req, res, next) => {
    try {
      let cart =  await Cart.create({products: []})
      let newUser = await User.create({...req.body, cid: cart._id});

      if (newUser) {
        return res.status(201).json({
          success: true,
          response: `User ${newUser._id} created`,
        });
      }

      return res.status(500).json({
        success: true,
        response: "User not created",
      });
    } catch (error) {
      next(error);
    }
  }
);

// LOGIN
router.post("/login", password_validator, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!req.session.email) {
      if (user) {
        if (password === user.password) {
          req.session.email = email;
          req.session.role = user.role;
          return res.status(200).json({
            success: true,
            message: "User login",
            email: req.session.email,
            role: req.session.role,
          });
        }
      }
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "You already have an open session",
      });
    }
  } catch (error) {
    next(error);
  }
});

// LOGOUT
router.post("/logout", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.session.email });
    if (user) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error logging out",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "User logged out",
          });
        }
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "No session started",
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET SESSION
router.get("/session", (req, res) => {
  return res.json({
    email: req.session.email,
    role: req.session.role,
  });
});

export default router;
