import { clerkClient } from "@clerk/express";
import {
  randomBytes,
  randomInt,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";
import TheaterAdminRequest from "../models/TheaterAdminRequestModel.js";
import { sendEmail } from "../config/nodemailer.js";

const scrypt = promisify(scryptCallback);
const otpLifetimeMs = 10 * 60 * 1000;
const otpResendDelayMs = 60 * 1000;
const maxOtpAttempts = 5;

const hashOtp = async (otp, salt) =>
  (await scrypt(otp, salt, 64)).toString("hex");

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

export const getTheaterAdminRequestStatus = async (req, res) => {
  try {
    const request = await TheaterAdminRequest.findOne({
      userId: req.userId,
    }).select("email status");

    res.status(200).json({
      success: true,
      status: request?.status || "none",
      email: request?.email || "",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const requestTheaterAdminOtp = async (req, res) => {
  try {
    const submittedEmail = req.body.email;
    const email =
      typeof submittedEmail === "string"
        ? submittedEmail.trim().toLowerCase()
        : "";
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email address." });
    }

    const user = await clerkClient.users.getUser(req.userId);
    if (user.privateMetadata.role === "admin") {
      return res.status(409).json({
        success: false,
        message: "This account already has admin access.",
      });
    }

    const existingRequest = await TheaterAdminRequest.findOne({
      userId: req.userId,
    });
    if (existingRequest?.status === "pending_approval") {
      return res.status(200).json({
        success: true,
        status: existingRequest.status,
        message: "Your request is awaiting admin approval.",
      });
    }
    if (existingRequest?.status === "approved") {
      return res.status(409).json({
        success: false,
        message: "This account already has admin access.",
      });
    }
    if (
      existingRequest?.status === "pending_verification" &&
      existingRequest.lastOtpSentAt &&
      Date.now() - existingRequest.lastOtpSentAt.getTime() <
        otpResendDelayMs
    ) {
      return res.status(429).json({
        success: false,
        status: "pending_verification",
        message: "A verification code was sent recently. Please check your email.",
      });
    }

    const otp = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const otpSalt = randomBytes(16).toString("hex");
    const otpHash = await hashOtp(otp, otpSalt);
    const now = new Date();
    const request =
      existingRequest || new TheaterAdminRequest({ userId: req.userId });

    request.email = email;
    request.status = "pending_verification";
    request.otpHash = otpHash;
    request.otpSalt = otpSalt;
    request.otpExpiresAt = new Date(now.getTime() + otpLifetimeMs);
    request.otpAttempts = 0;
    request.lastOtpSentAt = now;
    request.verifiedAt = undefined;
    await request.save();

    try {
      await sendEmail({
        to: email,
        subject: "Your theater admin verification code",
        body: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Verify your email</h2>
            <p>Use this code to submit your theater admin request:</p>
            <p style="font-size: 28px; font-weight: bold; letter-spacing: 6px;">${otp}</p>
            <p>This code expires in 10 minutes. An existing admin must approve your request before admin access is granted.</p>
          </div>
        `,
      });
    } catch (error) {
      await TheaterAdminRequest.deleteOne({
        _id: request._id,
        status: "pending_verification",
        otpHash,
      });
      throw error;
    }

    res.status(200).json({
      success: true,
      status: "pending_verification",
      message: `A verification code was sent to ${escapeHtml(email)}.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyTheaterAdminOtp = async (req, res) => {
  try {
    const otp = typeof req.body.otp === "string" ? req.body.otp.trim() : "";
    if (!/^\d{6}$/.test(otp)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter the 6-digit verification code." });
    }

    const request = await TheaterAdminRequest.findOne({
      userId: req.userId,
      status: "pending_verification",
    });
    if (!request) {
      return res.status(400).json({
        success: false,
        message: "Request a new verification code to continue.",
      });
    }

    if (!request.otpExpiresAt || request.otpExpiresAt <= new Date()) {
      await request.deleteOne();
      return res.status(400).json({
        success: false,
        message: "The verification code expired. Request a new code.",
      });
    }

    if (request.otpAttempts >= maxOtpAttempts) {
      await request.deleteOne();
      return res.status(429).json({
        success: false,
        message: "Too many incorrect attempts. Request a new code.",
      });
    }

    const submittedHash = Buffer.from(
      await hashOtp(otp, request.otpSalt),
      "hex",
    );
    const savedHash = Buffer.from(request.otpHash, "hex");
    if (
      submittedHash.length !== savedHash.length ||
      !timingSafeEqual(submittedHash, savedHash)
    ) {
      const updatedRequest = await TheaterAdminRequest.findOneAndUpdate(
        {
          _id: request._id,
          status: "pending_verification",
          otpAttempts: { $lt: maxOtpAttempts },
        },
        { $inc: { otpAttempts: 1 } },
        { new: true },
      );
      if (!updatedRequest) {
        return res.status(429).json({
          success: false,
          message: "Too many incorrect attempts. Request a new code.",
        });
      }
      if (updatedRequest.otpAttempts >= maxOtpAttempts) {
        await TheaterAdminRequest.deleteOne({
          _id: updatedRequest._id,
          status: "pending_verification",
          otpAttempts: { $gte: maxOtpAttempts },
        });
        return res.status(429).json({
          success: false,
          message: "Too many incorrect attempts. Request a new code.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "The verification code is incorrect.",
      });
    }

    request.status = "pending_approval";
    request.otpHash = undefined;
    request.otpSalt = undefined;
    request.otpExpiresAt = undefined;
    request.otpAttempts = 0;
    request.verifiedAt = new Date();
    await request.save();

    res.status(200).json({
      success: true,
      status: request.status,
      message: "Email verified. Your request is awaiting admin approval.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTheaterAdminRequests = async (req, res) => {
  try {
    const requests = await TheaterAdminRequest.find({
      status: "pending_approval",
    })
      .select("userId email status createdAt verifiedAt")
      .sort({ verifiedAt: 1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const decideTheaterAdminRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { decision } = req.body;
    if (decision !== "approve" && decision !== "reject") {
      return res
        .status(400)
        .json({ success: false, message: "Choose approve or reject." });
    }

    const request = await TheaterAdminRequest.findById(requestId);
    if (!request || request.status !== "pending_approval") {
      return res.status(404).json({
        success: false,
        message: "This request is no longer awaiting approval.",
      });
    }
    if (request.userId === req.userId) {
      return res.status(403).json({
        success: false,
        message: "An existing admin must review this request.",
      });
    }

    if (decision === "reject") {
      request.status = "rejected";
      await request.save();
      return res.status(200).json({
        success: true,
        message: "The theater admin request was rejected.",
      });
    }

    const user = await clerkClient.users.getUser(request.userId);
    await clerkClient.users.updateUserMetadata(request.userId, {
      privateMetadata: {
        ...user.privateMetadata,
        role: "admin",
      },
    });

    request.status = "approved";
    await request.save();
    res.status(200).json({
      success: true,
      message: "The user now has admin access.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
