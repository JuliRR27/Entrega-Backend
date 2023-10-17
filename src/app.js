// import { logger } from "./utils/logger.js";
import { httpServer } from "./server.js";
// import cluster from "node:cluster";
import { cpus } from "node:os";

const processors = cpus().length;

// if (cluster.isPrimary) {
//   for (let i = 0; i < processors; i++) {
//     cluster.fork()
//   }
//   cluster.on('message', worker => {
//     logger.info(`Message received from worker ${worker.process.pid}`)
//   })
// } else {
// }
httpServer();
