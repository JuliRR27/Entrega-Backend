import EErrors from "./enum.js";
import { logger } from "../../utils/logger.js";

const errorHandler = (error, req, res, next) => {
  logger.error(error.cause);
  switch (error.code) {
    case EErrors.INVALID_TYPE_ERROR:
      return res.send({ status: "error", error: error.name });

    case EErrors.ROUTING_ERROR:
      return res.send({ status: "error", error: error.name });

    case EErrors.DATABASE_ERROR:
      return res.send({ status: "error", error: error.name });

    default:
      return res.send({ status: "error", error: error.message });
  }
};

export default errorHandler;
