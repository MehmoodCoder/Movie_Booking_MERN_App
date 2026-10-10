import { Inngest } from "inngest";
import User from "../models/UserModel.js";
import Booking from "../models/BookingModel.js";
import Show from "../models/ShowsModel.js";
import { sendEmail } from "../config/nodemailer.js";

export const inngest = new Inngest({ id: "moviefyhub" });

const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
    triggers: { event: "clerk/user.created" },
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.create(userData);
  },
);

const syncUserDeletion = inngest.createFunction(
  {
    id: "user-deletion-from-clerk",
    triggers: { event: "clerk/user.deleted" },
  },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete({ _id: id });
  },
);

const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
    triggers: { event: "clerk/user.updated" },
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + " " + last_name,
      image: image_url,
    };
    await User.findByIdAndUpdate({ _id: id }, userData);
  },
);

const releaseSeatsAndDeleteMapping = inngest.createFunction(
  {
    id: "release-seats-delete-booking",
    triggers: { event: "app/checkpayment" },
  },
  async ({ event, step }) => {
    const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);
    await step.sleepUntil("wait-for-let-ten-minutes", tenMinutesLater);

    await step.run("check-payment-status", async () => {
      const bookingId = event.data.bookingId;
      const booking = await Booking.findById(bookingId);

      if (booking && !booking.isPaid) {
        const show = await Show.findById(booking.show);
        if (show) {
          booking.bookedSeats.forEach((seat) => {
            delete show.occupiedSeats[seat];
          });
          show.markModified("occupiedSeats");
          await show.save();
        }
        await Booking.findByIdAndDelete(booking._id);
      }
    });
  },
);

const sendBookingConfirmationEmail = inngest.createFunction(
  {
    id: "send-booking-confirmation-email",
    triggers: { event: "app/show.booked" },
  },
  async ({ event, step }) => {
    const { bookingId } = event.data;

    const booking = await Booking.findById(bookingId)
      .populate({
        path: "show",
        populate: { path: "movie", model: "Movie" },
      })
      .populate("user");

    if (booking && booking.user && booking.user.email) {
      await sendEmail({
        to: booking.user.email,
        subject: `Payment Confirmation: "${booking.show.movie.title}" booked!`,
        body: `
          <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Hi ${booking.user.name},</h2>
            <p>Your booking for <strong style="color: #F84565;">${booking.show.movie.title}</strong> is confirmed.</p>
            <p>
              <strong>Date:</strong> ${new Date(booking.show.showDateTime).toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" })}<br/>
              <strong>Time:</strong> ${new Date(booking.show.showDateTime).toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })}
            </p>
            <p>Enjoy the show! 🍿</p>
            <p>Thanks for booking with us!<br/>MoviefyHub Team</p>
          </div>
        `,
      });
    }
  },
);

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  releaseSeatsAndDeleteMapping,
  sendBookingConfirmationEmail,
];
