import monthService from "../services/month.service.js";

async function getAllMonthController(req, res) {
  try {
    const month = await monthService.getAllMonthService();
    return res.status(200).send(month);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}
async function getMonthByDateController(req, res) {
  const dateMonth = req.params.month;
  const year = req.params.year;
  try {
    const month = await monthService.getMonthByDateService(dateMonth, year);
    return res.status(200).send(month);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function createMonthController(req, res) {
  const { dateMonth, year } = req.body;
  try {
    const month = await monthService.createMonthService(dateMonth, year);
    return res.status(201).send(month);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

async function addWeekController(req, res) {
  const id = req.params.id;
  const { week } = req.body;
  try {
    const month = await monthService.addWeekService(id, week);
    return res.status(201).send(month);
  } catch (e) {
    return res.status(400).send(e.message);
  }
}

export default {
  getAllMonthController,
  createMonthController,
  getMonthByDateController,
  addWeekController,
};
