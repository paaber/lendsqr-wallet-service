import "./pre-start"; // Must be the first import
import logger from "jet-logger";

import EnvVars from "@src/constants/EnvVars";
import server from "./server";


// **** Run **** //
const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

const expressServer = server.listen(EnvVars.Port, async () => {
  logger.info(SERVER_START_MSG);
  console.log("started app on port ", EnvVars.Port);
});




