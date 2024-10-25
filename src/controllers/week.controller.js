import weekService from "../services/week.service.js";

async function getAllWeekController(req, res) {
  try {
    const week = await weekService.getAllWeekService();
    return res.status(200).send(week);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function createWeekController(req, res) {
  const { dateStart, dateEnd, metricId } = req.body;
  try {
    const week = await weekService.createWeekService(
      dateStart,
      dateEnd,
      metricId
    );
    return res.status(201).send(week);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function weekChangeActionController(req, res) {
  const id = req.params.id;
  const { action } = req.body;
  try {
    await weekService.weekChangeActionService(id, action);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

export default {
  getAllWeekController,
  createWeekController,
  weekChangeActionController,
};
