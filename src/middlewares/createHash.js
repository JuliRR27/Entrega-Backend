import { hashSync, genSaltSync } from "bcrypt";

export default (req, res, next) => {
  req.body.password = hashSync(req.body.password, genSaltSync());
  return next();
};
