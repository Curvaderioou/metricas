import { Router } from "express";
import metricRouter from "./metric.route.js";
import weekRouter from "./week.route.js";
import monthRouter from "./month.route.js";

const router = Router();

router.use("/metric", metricRouter);
router.use("/week", weekRouter);
router.use("/month", monthRouter);

export default router;
