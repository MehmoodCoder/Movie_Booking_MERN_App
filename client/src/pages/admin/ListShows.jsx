import React, { useState, useEffect } from "react";
import { dummyShowsData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import { dateFormat } from "../../lib/dateFormat";
import Loading from "../../components/Loading";

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      setShows([
        {
          movie: dummyShowsData[0],
          showDateTime: "2025-06-30T02:30:00.000Z",
          showPrice: 59,
          occupiedSeats: {
            A1: "user_1",
            B1: "user_2",
            C1: "user_3",
          },
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllShows();
  }, []);

  return !loading ? (
    <div className="p-4 md:p-6 w-full flex flex-col items-center md:items-start">
      <div className="w-full text-center md:text-left">
        <Title text1="List" text2="Shows" />
      </div>

      <div className="max-w-4xl mt-6 w-full">
        <div className="grid grid-cols-1 gap-4 md:hidden w-full">
          {shows.map((show, index) => (
            <div
              key={index}
              className="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 space-y-2.5 shadow-md w-full"
            >
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Movie Name
                </span>
                <span className="font-medium text-right text-sm">
                  {show.movie.title}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Show Time
                </span>
                <span className="text-xs font-light">
                  {dateFormat(show.showDateTime)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 pb-2">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Total Bookings
                </span>
                <span className="text-sm font-light">
                  {Object.keys(show.occupiedSeats).length}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Earnings
                </span>
                <span className="text-sm font-semibold">
                  {currency}{" "}
                  {Object.keys(show.occupiedSeats).length * show.showPrice}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto shadow-md rounded-md w-full">
          <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-3 font-medium pl-5">Movie Name</th>
                <th className="p-3 font-medium">Show Time</th>
                <th className="p-3 font-medium">Total Bookings</th>
                <th className="p-3 font-medium">Earnings</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
              {shows.map((show, index) => (
                <tr
                  key={index}
                  className="border-b border-primary/10 bg-primary/5 even:bg-primary/10 hover:bg-primary/15 transition-colors"
                >
                  <td className="p-3 min-w-45 pl-5 font-medium">
                    {show.movie.title}
                  </td>
                  <td className="p-3">{dateFormat(show.showDateTime)}</td>
                  <td className="p-3">
                    {Object.keys(show.occupiedSeats).length}
                  </td>
                  <td className="p-3">
                    {currency}{" "}
                    {Object.keys(show.occupiedSeats).length * show.showPrice}
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

export default ListShows;
