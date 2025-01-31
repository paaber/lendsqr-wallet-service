import Paths from "@src/constants/Paths";
import { RequestHandler, Router } from "express";
import { validateBody } from "@src/middlewares/validator";

const authRouter = Router();

export default authRouter;
