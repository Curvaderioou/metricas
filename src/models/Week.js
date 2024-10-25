import mongoose from "mongoose";

const WeekSchema = new mongoose.Schema({
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  actions: {
    type: Number,
  },
  weekVariation: {
    type: Number,
  },
});

const Week = mongoose.model("Week", WeekSchema);

export default Week;
