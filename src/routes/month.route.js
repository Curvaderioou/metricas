import { Router } from "express";
import monthController from "../controllers/month.controller.js";

const monthRouter = Router();

monthRouter.get("/", monthController.getAllMonthController);
monthRouter.get("/date/:month/:year", monthController.getMonthByDateController);
monthRouter.post("/create", monthController.createMonthController);
monthRouter.patch("/:id/addWeek", monthController.addWeekController);

export default monthRouter;
