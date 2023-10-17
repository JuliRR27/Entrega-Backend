import MainRouter from "./Router.js";
import passportCall from "../middlewares/passportCall.js";
import authJwt from "../passport-jwt/authJwt.js";
import password_validator from "../middlewares/passwordValidator.js";
import registerValidator from "../middlewares/registerValidator.js";
import createHash from "../middlewares/createHash.js";
import UserController from "../controllers/UserController.js";
import passport from "passport";
import isLoggedIn from "../middlewares/isLoggedIn.js";
import isPasswordValid from "../middlewares/isPasswordValid.js";

const {
  register,
  login,
  logout,
  current,
  forgotPassword,
  resetPassword,
  confirmPassword,
} = UserController;

class SessionRouter extends MainRouter {
  init() {
    this.post("/login", ["PUBLIC"], isLoggedIn, login);

    this.post(
      "/register",
      ["PUBLIC"],
      isLoggedIn,
      registerValidator,
      password_validator,
      createHash,
      passportCall("register"),
      register
    );

    this.post("/logout", ["USER", "ADMIN"], passportCall("jwt"), logout);

    this.post(
      "/current",
      ["USER", "ADMIN"],
      passportCall("jwt"),
      authJwt("user"),
      current
    );

    this.get(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.get(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        failureRedirect: "/google/failure",
      }),
      (req, res) => {
        console.log(req.user);
        return res.redirect("/google/success");
      }
    );

    // this.get('/google/logout', ['PUBLIC'], (req, res) => {
    //   req.session.destroy()
    //   res.send('success')
    // })

    this.post("/forgot-password", ["PUBLIC"], isLoggedIn, forgotPassword);

    this.get("/reset-password", ["PUBLIC"], isLoggedIn, resetPassword);

    this.post(
      "/confirm-password",
      ["PUBLIC"],
      isLoggedIn,
      password_validator,
      confirmPassword
    );
  }
}

export default new SessionRouter();
