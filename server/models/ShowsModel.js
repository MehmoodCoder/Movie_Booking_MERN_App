import mongoose from "mongoose";

const showsSchema = new mongoose.Schema(
  {
    movie: {
      type: String,
      required: true,
      ref: "Movie",
    },
    showDateTime: {
      type: Date,
      required: true,
    },
    showPrice: {
      type: Number,
      required: true,
    },
    occupiedSeats: {
      type: Object,
      required: true,
    },
    createdBy: {
      type: String,
    },
  },
  { minimize: false },
);

const Shows = mongoose.model("Shows", showsSchema);
export default Shows;
