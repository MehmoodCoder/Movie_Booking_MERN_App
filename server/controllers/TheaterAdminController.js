import { clerkClient } from "@clerk/express";
import TheaterAdminRequest from "../models/TheaterAdminRequestModel.js";

const validateTheaterDetails = (body) => {
  const theaterName =
    typeof body.theaterName === "string" ? body.theaterName.trim() : "";
  const address = typeof body.address === "string" ? body.address.trim() : "";
  const contactPhone =
    typeof body.contactPhone === "string" ? body.contactPhone.trim() : "";

  if (theaterName.length < 2 || theaterName.length > 120) {
    return { error: "Theater name must be between 2 and 120 characters." };
  }
  if (address.length < 5 || address.length > 500) {
    return { error: "Address must be between 5 and 500 characters." };
  }
  if (!/^[+()\d\s.-]{7,25}$/.test(contactPhone)) {
    return { error: "Enter a valid contact phone number." };
  }

  return {
    theaterDetails: { theaterName, address, contactPhone },
  };
};

export const getTheaterAdminRequestStatus = async (req, res) => {
  try {
    const request = await TheaterAdminRequest.findOne({
      userId: req.userId,
    }).select("theaterName address contactPhone applicantEmail status createdAt");

    res.status(200).json({
      success: true,
      status: request?.status || "none",
      request: request || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitTheaterAdminRequest = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.userId);
    const role = user.privateMetadata.role;

    if (role === "admin" || role === "main-admin") {
      return res.status(409).json({
        success: false,
        message: "This account already has admin access.",
      });
    }

    const validated = validateTheaterDetails(req.body);
    if (validated.error) {
      return res
        .status(400)
        .json({ success: false, message: validated.error });
    }

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId,
    )?.emailAddress;
    if (!primaryEmail) {
      return res.status(400).json({
        success: false,
        message: "Add a primary email address to your account before applying.",
      });
    }

    let request = await TheaterAdminRequest.findOne({ userId: req.userId });
    if (request?.status === "pending") {
      return res.status(409).json({
        success: false,
        status: request.status,
        message: "Your theater request is already awaiting review.",
      });
    }
    if (request?.status === "approved") {
      return res.status(409).json({
        success: false,
        status: request.status,
        message: "This request has already been approved.",
      });
    }

    if (!request) {
      request = new TheaterAdminRequest({ userId: req.userId });
    }

    request.applicantEmail = primaryEmail;
    request.theaterName = validated.theaterDetails.theaterName;
    request.address = validated.theaterDetails.address;
    request.contactPhone = validated.theaterDetails.contactPhone;
    request.status = "pending";
    request.reviewedAt = undefined;
    request.reviewedBy = undefined;
    await request.save();

    res.status(201).json({
      success: true,
      status: request.status,
      message: "Your theater request has been submitted for MainAdmin review.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTheaterAdminRequests = async (req, res) => {
  try {
    const requests = await TheaterAdminRequest.find({ status: "pending" })
      .select(
        "userId applicantEmail theaterName address contactPhone status createdAt",
      )
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const decideTheaterAdminRequest = async (req, res) => {
  try {
    const { decision } = req.body;
    if (decision !== "approve" && decision !== "reject") {
      return res
        .status(400)
        .json({ success: false, message: "Choose approve or reject." });
    }

    const request = await TheaterAdminRequest.findOne({
      _id: req.params.requestId,
      status: "pending",
    });
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "This request is no longer pending review.",
      });
    }
    if (request.userId === req.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot review your own request.",
      });
    }

    if (decision === "approve") {
      const user = await clerkClient.users.getUser(request.userId);
      await clerkClient.users.updateUserMetadata(request.userId, {
        privateMetadata: {
          ...user.privateMetadata,
          role: "admin",
        },
      });
      request.status = "approved";
    } else {
      request.status = "rejected";
    }

    request.reviewedAt = new Date();
    request.reviewedBy = req.userId;
    await request.save();

    res.status(200).json({
      success: true,
      status: request.status,
      message:
        decision === "approve"
          ? "The request was approved and the user now has admin access."
          : "The request was rejected.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
