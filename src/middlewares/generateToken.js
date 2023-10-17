import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (user, expiration) => {
  if (expiration) {
    return jwt.sign({ user }, config.SECRET_JWT, { expiresIn: expiration });
  } else {
    return jwt.sign({ user }, config.SECRET_JWT);
  }
};

export default generateToken;
