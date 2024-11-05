import { Router } from "express";
import metricController from "../controllers/metric.controller.js";

const metricRouter = Router();

metricRouter.get("/", metricController.getAllMetricController);
metricRouter.get("/date/:date", metricController.getMetricByDateController);
metricRouter.post("/create", metricController.createMetricController);
metricRouter.patch("/update/:id", metricController.updateMetricController);
metricRouter.patch(
  "/addAction/:id",
  metricController.addActionMetricController
);

export default metricRouter;
