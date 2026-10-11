import { clerkClient } from "@clerk/express";

export const protectUser = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    const user = await clerkClient.users.getUser(userId);

    const role = user.privateMetadata.role;
    if (role !== "admin" && role !== "main-admin") {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized access" });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const protectMainAdmin = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    const user = await clerkClient.users.getUser(userId);

    if (user.privateMetadata.role !== "main-admin") {
      return res
        .status(403)
        .json({ success: false, message: "MainAdmin access required" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
