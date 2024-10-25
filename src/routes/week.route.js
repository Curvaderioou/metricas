import { Router } from "express";
import weekController from "../controllers/week.controller.js";

const weekRouter = Router();

weekRouter.get("/", weekController.getAllWeekController);
weekRouter.post("/create", weekController.createWeekController);
weekRouter.post("/:id/changeAction", weekController.weekChangeActionController);

export default weekRouter;
