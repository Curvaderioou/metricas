import Metric from "../models/Metric.js";

async function getAllMetricRepository() {
  return Metric.find().sort({ _id: 1 });
}

async function getMetricByDateRepository(ano, mes) {
  const filteredMetrics = Metric.find({
    months: {
      $elemMatch: { month: mes, year: ano },
    },
  });

  const allMetrics = Metric.find();

  const [filtered, all] = await Promise.all([filteredMetrics, allMetrics]);

  return {
    filteredMetrics: filtered,
    allMetrics: all,
  };
}

async function getMonthInMetricRepository(mes, ano, id) {
  const metric = Metric.findOne({
    _id: id,
    months: {
      $elemMatch: { month: mes, year: ano },
    },
  });
  return metric;
}

async function createMetricRepository(name) {
  return Metric.create({ name: name });
}

async function findMetricById(id) {
  return Metric.findById(id);
}

async function updateMetricRepository(id, name) {
  return Metric.findOneAndUpdate({ _id: id }, { name: name }, { new: true });
}

async function addMonthRepository(id, monthId, month, year) {
  return Metric.findOneAndUpdate(
    { _id: id },
    {
      $push: {
        months: { month, year, monthId },
      },
    },
    { new: true }
  );
}

export default {
  createMetricRepository,
  getAllMetricRepository,
  findMetricById,
  updateMetricRepository,
  addMonthRepository,
  getMetricByDateRepository,
  getMonthInMetricRepository,
};
