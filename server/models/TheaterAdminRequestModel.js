import mongoose from "mongoose";

const theaterAdminRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    applicantEmail: {
      type: String,
      required: true,
    },
    theaterName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      required: true,
      default: "pending",
    },
    reviewedAt: Date,
    reviewedBy: String,
  },
  { timestamps: true },
);

const TheaterAdminRequest = mongoose.model(
  "TheaterAdminRequest",
  theaterAdminRequestSchema,
);

export default TheaterAdminRequest;
