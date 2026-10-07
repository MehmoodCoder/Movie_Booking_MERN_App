import React, { useState, useEffect } from "react";
import { dummyShowsData } from "../../assets/assets";
import Title from "../../components/admin/Title";
import Loading from "../../components/Loading";
import { Star, Check, Trash2 } from "lucide-react";
import {kConverter} from "../../lib/kConverter";

const AddShows = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [dateTimeSelection, setDateTimeSelection] = useState({});
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [showPrice, setShowPrice] = useState("");

  const fetchNowPlayingMovies = async () => {
    setNowPlayingMovies(dummyShowsData);
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  const handleDateTimeAdd = () => {
    if (!dateTimeInput) return;
    const [date, time] = dateTimeInput.split("T");
    if (!date || !time) return;

    setDateTimeSelection((prev) => {
      const times = prev[date] || [];
      if (!times.includes(time)) {
        return { ...prev, [date]: [...times, time] };
      }
      return prev;
    });
  };

  const handleRemoveTime = (date, time) => {
    setDateTimeSelection((prev) => {
      const filteredTimes = prev[date].filter((t) => t !== time);
      if (filteredTimes.length === 0) {
        const { [date]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [date]: filteredTimes,
      };
    });
  };

  return nowPlayingMovies.length > 0 ? (
    <div className="w-full min-h-screen bg-[#09090b] text-aliceblue p-4 sm:p-6 md:p-10 select-none">
      <Title text1="Add" text2="Shows" />

      <p className="mt-10 text-lg font-medium">Now Playing Movies</p>

      <div className="overflow-x-auto no-scrollbar pb-4 mt-4">
        <div className="flex gap-4 w-max px-1">
          {nowPlayingMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedMovie(movie.id)}
              className="relative w-36 sm:w-40 cursor-pointer group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[70/104] rounded-lg overflow-hidden border border-white/5 shadow-md">
                <img
                  src={movie.poster_path}
                  alt=""
                  className={`w-full h-full object-cover transition-all duration-300 brightness-90 ${
                    selectedMovie && selectedMovie !== movie.id
                      ? "opacity-40 group-hover:opacity-100"
                      : "opacity-100"
                  }`}
                />

                <div className="absolute bottom-0 left-0 w-full bg-black/70 p-2 flex items-center justify-between text-[11px] sm:text-xs">
                  <p className="flex items-center gap-1 text-gray-400">
                    <Star className="w-3.5 h-3.5 text-primary fill-primary flex-shrink-0" />
                    <span className="text-white font-medium">
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "0.0"}
                    </span>
                  </p>
                  <p className="text-gray-300 truncate max-w-[55px]">
                    {kConverter(movie.vote_count || 0)} Votes
                  </p>
                </div>

                {selectedMovie === movie.id && (
                  <div className="absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded shadow-md animate-fade-in">
                    <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                )}
              </div>

              <p className="font-medium text-sm mt-2 truncate w-full group-hover:text-primary transition-colors">
                {movie.title}
              </p>
              <p className="text-gray-400 text-xs mt-0.5">
                {movie.release_date}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 max-w-md w-full">
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Show Price
        </label>
        <div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md bg-black/20 w-full focus-within:border-primary transition-colors">
          <p className="text-gray-400 text-sm font-medium">{currency}</p>
          <input
            min={0}
            type="number"
            value={showPrice}
            onChange={(e) => setShowPrice(e.target.value)}
            placeholder="Enter show price"
            className="w-full bg-transparent outline-none text-sm text-white"
          />
        </div>
      </div>

      <div className="mt-6 max-w-xl w-full">
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Select Date and Time
        </label>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center border border-gray-600 p-2 rounded-lg bg-black/20 w-full focus-within:border-primary transition-colors">
          <input
            type="datetime-local"
            value={dateTimeInput}
            onChange={(e) => setDateTimeInput(e.target.value)}
            className="w-full bg-transparent outline-none p-1 text-sm rounded-md text-white cursor-pointer"
          />
          <button
            type="button"
            onClick={handleDateTimeAdd}
            className="bg-primary hover:bg-primary-dull text-white px-5 py-2 text-sm rounded-md font-medium cursor-pointer transition-all active:scale-95 whitespace-nowrap text-center"
          >
            Add Time
          </button>
        </div>
      </div>

      {Object.keys(dateTimeSelection).length > 0 && (
        <div className="mt-8 max-w-2xl bg-white/[0.02] border border-white/5 p-4 sm:p-5 rounded-xl backdrop-blur-sm animate-fade-in">
          <h2 className="text-base font-semibold mb-3 tracking-wide text-gray-200">
            Selected Date-Time
          </h2>
          <ul className="space-y-4">
            {Object.entries(dateTimeSelection).map(([date, times]) => (
              <li
                key={date}
                className="border-b border-white/5 pb-3 last:border-0 last:pb-0"
              >
                <div className="font-semibold text-sm text-primary">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {times.map((time) => (
                    <div
                      key={time}
                      className="border border-primary/40 bg-primary/5 px-2.5 py-1 flex items-center justify-between gap-2 rounded text-xs font-medium transition-colors hover:border-primary"
                    >
                      <span className="text-gray-200">{time}</span>
                      <Trash2
                        onClick={() => handleRemoveTime(date, time)}
                        className="w-3.5 h-3.5 text-red-500 hover:text-red-400 cursor-pointer transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 border-t border-white/5 pt-6 flex justify-start">
        <button
          type="button"
          className="w-full sm:w-auto bg-primary text-white px-10 py-3 rounded-md hover:bg-primary-dull transition-all duration-300 font-semibold cursor-pointer active:scale-95 shadow-md shadow-primary/10 text-center"
        >
          Add Show
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#09090b]">
      <Loading />
    </div>
  );
};

export default AddShows;
