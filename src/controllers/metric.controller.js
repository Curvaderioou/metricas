import metricService from "../services/metric.service.js";

async function getAllMetricController(req, res) {
  try {
    const metric = await metricService.getAllMetricService();
    return res.status(200).send(metric);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function getMetricByDateController(req, res) {
  const data = req.params.date;
  try {
    const metric = await metricService.getMetricByDateService(data);
    return res.status(200).send(metric);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function createMetricController(req, res) {
  const { name } = req.body;
  try {
    const metric = await metricService.createMetricService(name);
    return res.status(201).send(metric);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function updateMetricController(req, res) {
  const id = req.params.id;
  const { name } = req.body;
  try {
    const metric = await metricService.updateMetricService(id, name);
    return res.status(200).send(metric);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

export default {
  getAllMetricController,
  createMetricController,
  updateMetricController,
  getMetricByDateController,
};
