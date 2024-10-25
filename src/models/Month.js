import mongoose from "mongoose";

const MonthSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  weeks: [
    {
      dateStart: {
        type: Date,
        required: true,
      },
      weekId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Week",
      },
    },
  ],
  totalActions: {
    type: Number,
  },
  monthVariation: {
    type: Number,
  },
});

const Month = mongoose.model("Month", MonthSchema);

export default Month;
