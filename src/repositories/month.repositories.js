import Month from "../models/Month.js";

async function getMonthByDateRepository(month, year) {
  return Month.findOne({ month: month, year: year });
}

async function findMonthById(id) {
  return Month.findById(id);
}

async function getWeekInMonthRepository(id, dateStart) {
  return Month.findOne({
    _id: id,
    weeks: {
      $elemMatch: { dateStart: dateStart },
    },
  });
}

async function createMonthRepository(month, year) {
  return Month.create({
    month: month,
    year: year,
    totalActions: 0,
    monthVariation: 0,
  });
}

async function addWeekRepository(id, weekId, dateStart) {
  return Month.findOneAndUpdate(
    { _id: id },
    { $push: { weeks: { dateStart, weekId } } },
    { new: true }
  );
}

export default {
  getMonthByDateRepository,
  findMonthById,
  createMonthRepository,
  addWeekRepository,
  getWeekInMonthRepository,
};
