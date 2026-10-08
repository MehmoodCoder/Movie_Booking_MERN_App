import Booking from '../models/BookingModel.js'

export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};
