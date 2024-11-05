import metricRepositories from "../repositories/metric.repositories.js";
import weekRepositories from "../repositories/week.repositories.js";
import metricService from "./metric.service.js";
import monthService from "./month.service.js";

async function getAllWeekService() {
  const weeks = await weekRepositories.getAllWeekRepository();
  if (weeks.length === 0) throw new Error("No weeks found");
  return {
    results: weeks.map((week) => ({
      id: week._id,
      dateStart: week.dateStart,
      dateEnd: week.dateEnd,
      actions: week.actions,
      weekVariation: week.weekVariation,
    })),
  };
}

async function findWeekByIdService(id) {
  const week = await weekRepositories.findWeekById(id);
  if (!week) throw new Error("Week not found");
  return week;
}

async function createWeekService(dateStart, dateEnd, metricId) {
  if (!dateStart || !dateEnd) throw new Error("No dates provided");
  const dateMonth = dateStart.slice(5, 7);
  const year = dateStart.slice(0, 4);

  const week = await weekRepositories.createWeekRepository(dateStart, dateEnd);
  if (!week) throw new Error("Error creating week");

  const metricMonth = await metricRepositories.getMonthInMetricRepository(
    dateMonth,
    year,
    metricId
  );
  if (metricMonth) {
    await monthService.addWeekService(
      metricMonth.months[metricMonth.months.length - 1].monthId,
      week._id,
      dateStart
    );
  } else {
    const month = await monthService.createMonthService(
      dateMonth,
      year,
      metricId
    );
    await monthService.addWeekService(month._id, week._id, dateStart);
  }
  return week;
}

async function weekChangeActionService(id, action) {
  const week = await weekRepositories.findWeekById(id);
  if (!week) throw new Error("Week not found");
  if (!action) throw new Error("Action not available");
  await weekRepositories.weekChangeAction(action);
}

async function addActionWeekService(id) {
  const week = await weekRepositories.findWeekById(id);
  if (!week) throw new Error("Week not found");
  await weekRepositories.addActionWeekRepository(id);
  return true;
}

export default {
  createWeekService,
  getAllWeekService,
  weekChangeActionService,
  addActionWeekService,
  findWeekByIdService,
};
