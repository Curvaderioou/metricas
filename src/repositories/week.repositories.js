import Week from "../models/Week.js";

async function findWeekById(id) {
  return Week.findById(id);
}

async function createWeekRepository(dateStart, dateEnd) {
  return Week.create({
    dateStart: dateStart,
    dateEnd: dateEnd,
    actions: 0,
    weekVariation: 0,
  });
}

async function addActionWeekRepository(id) {
  return Week.findByIdAndUpdate(id, { $inc: { actions: 1 } }, { new: true });
}

export default {
  findWeekById,
  createWeekRepository,
  addActionWeekRepository,
};
