import mongoose from "mongoose";

const theaterAdminRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending_verification", "pending_approval", "approved", "rejected"],
      required: true,
      default: "pending_verification",
    },
    otpHash: String,
    otpSalt: String,
    otpExpiresAt: Date,
    otpAttempts: {
      type: Number,
      default: 0,
    },
    lastOtpSentAt: Date,
    verifiedAt: Date,
  },
  { timestamps: true },
);

const TheaterAdminRequest = mongoose.model(
  "TheaterAdminRequest",
  theaterAdminRequestSchema,
);

export default TheaterAdminRequest;
