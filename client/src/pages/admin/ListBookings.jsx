import React, { useEffect, useState } from "react";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const { axios, user, getToken } = useAppContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get("/api/admin/all-bookings", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      setBookings(data.bookings);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  return !isLoading ? (
    <div className="p-4 md:p-6 flex flex-col items-center md:items-start w-full">
      <div className="w-full text-center md:text-left">
        <Title text1="List" text2="Bookings" />
      </div>

      <div className="max-w-4xl mt-6 w-full">
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-primary/5 border border-primary/20 rounded-lg text-center w-full">
            <p className="text-gray-400 text-lg font-medium">
              No bookings available
            </p>
            <p className="text-gray-500 text-sm mt-1">
              When users book tickets, they will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 md:hidden w-full">
              {bookings.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 space-y-2.5 shadow-md w-full"
                >
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      User Name
                    </span>
                    <span className="font-medium text-right text-sm">
                      {item.user.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Movie Name
                    </span>
                    <span className="text-sm text-right font-light">
                      {item.show.movie.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Show Time
                    </span>
                    <span className="text-xs text-right font-light">
                      {dateFormat(item.show.showDateTime)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Seats
                    </span>
                    <span className="text-xs text-right font-light">
                      {Object.keys(item.bookedSeats)
                        .map((seat) => item.bookedSeats[seat])
                        .join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                      Amount
                    </span>
                    <span className="text-sm font-semibold text-right">
                      {currency} {item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto shadow-md rounded-md w-full">
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
                      <td className="p-3">
                        {dateFormat(item.show.showDateTime)}
                      </td>
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
          </>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ListBookings;
