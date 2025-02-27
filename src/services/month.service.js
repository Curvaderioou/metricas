import monthRepositories from "../repositories/month.repositories.js";
import metricService from "./metric.service.js";
import weekService from "./week.service.js";

async function getAllMonthService() {
  const months = await monthRepositories.getAllMonthRepository();
  if (months.length === 0) throw new Error("No months found");
  return {
    results: months.map((month) => ({
      id: month._id,
    })),
  };
}
async function getMonthByDateService(dateMonth, year) {
  if (!dateMonth || !year) throw new Error("Missing date");
  const month = await monthRepositories.getMonthByDateRepository(
    dateMonth,
    year
  );
  return month;
}

async function findMonthByIdAndDateService(id, dateStart, dateEnd, metricId) {
  if (!id || !dateStart || !dateEnd || !metricId)
    throw new Error("Missing Parameters");
  const month = await monthRepositories.getWeekInMonthRepository(id, dateStart);
  if (!month) {
    await weekService.createWeekService(dateStart, dateEnd, metricId);
  }
  const date = new Date(dateStart).toISOString().split("T")[0];
  const week = month.weeks.find(
    (week) => week.dateStart.toISOString().split("T")[0] == date
  );
  const weekFound = await weekService.findWeekByIdService(week.weekId);
  return { monthFound: month, week: weekFound };
}

// async function findMonthByIdAndDateService(id, dateStart, dateEnd, metricId) {
//   if (!id || !dateStart || !dateEnd || !metricId)
//     throw new Error("Missing Parameters");
//   const month = await monthRepositories.getWeekInMonthRepository(id, dateStart);
//   if (!month) {
//     await weekService.createWeekService(dateStart, dateEnd, metricId);
//   }
// }

async function createMonthService(dateMonth, year, metricId) {
  if (!dateMonth || !year || !metricId) throw new Error("No dates provided");
  const month = await monthRepositories.createMonthRepository(dateMonth, year);
  if (!month) throw new Error("Error creating month");
  await metricService.addMonthService(metricId, month._id, dateMonth, year);
  return month;
}

async function addWeekService(id, week, dateStart) {
  if (!week) throw new Error("No week provided");
  const monthExists = await monthRepositories.findMonthById(id);
  if (!monthExists) throw new Error("Month not found");
  const monthAtt = await monthRepositories.addWeekRepository(
    id,
    week,
    dateStart
  );
  if (!monthAtt) throw new Error("Error adding week");

  return monthAtt;
}

async function addActionMonthService(id, data) {
  const monthExists = await monthRepositories.findMonthById(id);
  if (!monthExists) throw new Error("Month not found");
  const date = new Date(data).toISOString().split("T")[0];
  const week = monthExists.weeks.find(
    (week) => week.dateStart.toISOString().split("T")[0] == date
  );
  const response = await weekService.addActionWeekService(week.weekId);
  if (response) {
    monthRepositories.addActionMonthRepository(id);
  }
}

export default {
  createMonthService,
  getAllMonthService,
  getMonthByDateService,
  addWeekService,
  findMonthByIdAndDateService,
  addActionMonthService,
};
