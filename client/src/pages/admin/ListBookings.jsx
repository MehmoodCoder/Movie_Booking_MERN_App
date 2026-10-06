import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { dateFormat } from "../../lib/dateFormat";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <div className="p-4 md:p-6 flex flex-col items-center md:items-start w-full">
      <div className="w-full text-center md:text-left">
        <Title text1="List" text2="Bookings" />
      </div>

      <div className="max-w-4xl mt-6 w-full">
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {bookings.map((item, index) => (
            <div
              key={index}
              className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">
                  User Name
                </span>
                <span className="font-medium text-right">{item.user.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">
                  Movie Name
                </span>
                <span className="text-sm text-right">
                  {item.show.movie.title}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">
                  Show Time
                </span>
                <span className="text-sm text-right">
                  {dateFormat(item.show.showDateTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">Seats</span>
                <span className="text-sm text-right">
                  {Object.keys(item.bookedSeats)
                    .map((seat) => item.bookedSeats[seat])
                    .join(", ")}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">
                  Amount
                </span>
                <span className="text-sm font-medium text-right">
                  {currency} {item.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto shadow-md rounded-md">
          <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-3 font-medium pl-5">User Name</th>
                <th className="p-3 font-medium">Movie Name</th>
                <th className="p-3 font-medium">Show Time</th>
                <th className="p-3 font-medium">Seats</th>
                <th className="p-3 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-primary/15 transition-colors"
                >
                  <td className="p-3 min-w-45 pl-5 font-medium">
                    {item.user.name}
                  </td>
                  <td className="p-3">{item.show.movie.title}</td>
                  <td className="p-3">{dateFormat(item.show.showDateTime)}</td>
                  <td className="p-3">
                    {Object.keys(item.bookedSeats)
                      .map((seat) => item.bookedSeats[seat])
                      .join(", ")}
                  </td>
                  <td className="p-3">
                    {currency} {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;
