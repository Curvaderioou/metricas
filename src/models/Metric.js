import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  months: [
    {
      month: {
        type: Number,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      monthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Month",
      },
    },
  ],
});

const Metric = mongoose.model("Metric", MetricSchema);

export default Metric;
