import metricRepositories from "../repositories/metric.repositories.js";
import monthService from "./month.service.js";
import weekService from "./week.service.js";

async function getAllMetricService() {
  const metrics = await metricRepositories.getAllMetricRepository();
  if (metrics.length === 0) throw new Error("No metrics found");
  return {
    results: metrics.map((metric) => ({
      id: metric._id,
      name: metric.name,
      months: metric.months,
    })),
  };
}

async function getMetricByDateService(data) {
  const ano = Number(data.slice(0, 4));
  const mes = Number(data.slice(5, 7));
  const dia = Number(data.slice(8, 10));

  var dateEnd = new Date(ano, mes - 1, dia + 4);

  dateEnd =
    dateEnd.getFullYear() +
    "-" +
    (dateEnd.getMonth() + 1) +
    "-" +
    dateEnd.getDate();

  const metricsDate = await metricRepositories.getMetricByDateRepository(
    ano,
    mes
  );

  if (
    !metricsDate.filteredMetrics ||
    metricsDate.filteredMetrics.length === 0
  ) {
    for (const metric of metricsDate.allMetrics) {
      await weekService.createWeekService(data, dateEnd, metric._id);
    }
  }

  await Promise.all(
    metricsDate.filteredMetrics.map(async (metric) => {
      const response = await monthService.findMonthByIdAndDateService(
        metric.months[metric.months.length - 1].monthId,
        data,
        dateEnd,
        metric._id
      );

      if (!metric.responses) {
        metric.responses = [];
      }

      metric.responses.push(response);
    })
  );

  metricsDate.filteredMetrics.forEach((metric) => {
    metric.responses.forEach((response) => {
      console.log("Mês encontrado:", response.monthFound);
      console.log("Semana encontrada:", response.week);
    });
  });

  return {
    results: metricsDate.filteredMetrics.map((metric) => ({
      id: metric._id,
      name: metric.name,
      months: metric.months,
      monthWeek: metric.responses,
    })),
  };
}

async function createMetricService(name) {
  if (!name) throw new Error("No name provided");
  const metric = await metricRepositories.createMetricRepository(name);
  return metric;
}

async function updateMetricService(id, name) {
  const metric = await metricRepositories.findMetricById(id);
  if (!metric) throw new Error("Metric not found");
  if (!name) throw new Error("Nothing to update");
  const newMetric = await metricRepositories.updateMetricRepository(id, name);
  return newMetric;
}

async function addActionMetricService(id, data) {
  if (!data) throw new Error("Data not sent");
  const ano = Number(data.slice(0, 4));
  const mes = Number(data.slice(5, 7));
  const metric = await metricRepositories.findMetricById(id);
  if (!metric) throw new Error("Metric not found");
  const mesAchado = metric.months.find(
    (month) => month.month === mes && month.year === ano
  );
  await monthService.addActionMonthService(mesAchado.monthId, data);
}

async function addMonthService(id, monthId, dateMonth, year) {
  const metric = await metricRepositories.addMonthRepository(
    id,
    monthId,
    dateMonth,
    year
  );
}

export default {
  createMetricService,
  getAllMetricService,
  updateMetricService,
  addMonthService,
  getMetricByDateService,
  addActionMetricService,
};
