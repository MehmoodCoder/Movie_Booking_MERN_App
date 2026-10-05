import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlurCircle from "./BlurCircle";
import toast from "react-hot-toast";

import { ChevronLeft, ChevronRight } from "lucide-react";

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast.error("Please select a date");
    }
    navigate(`/movies/${id}/${selected}`);
    window.scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="pt-24 scroll-mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative p-6 md:p-8 bg-primary/10 border border-primary/20 rounded-xl backdrop-blur-md overflow-hidden">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="w-full md:w-auto z-10">
          {/* Typo fixed here (text-text-lg -> text-lg) */}
          <p className="text-lg font-semibold text-white">Choose Date</p>
          <div className="flex items-center gap-4 text-sm mt-5 bg-black/30 p-2.5 rounded-xl border border-white/5 w-fit max-w-full">
            <ChevronLeft
              width={24}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors flex-shrink-0"
            />

            <span className="grid grid-cols-3 sm:flex sm:flex-wrap md:max-w-lg gap-3">
              {dateTime &&
                Object.keys(dateTime).map((date) => (
                  <button
                    type="button"
                    onClick={() => setSelected(date)}
                    key={date}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-xl cursor-pointer transition-all duration-300 ${
                      selected === date
                        ? "bg-primary text-white font-bold shadow-md shadow-primary/20 scale-105"
                        : "border border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {new Date(date).getDate()}
                    </span>
                    <span className="text-[10px] uppercase opacity-75">
                      {new Date(date).toLocaleDateString("en-US", {
                        month: "short",
                      })}
                    </span>
                  </button>
                ))}
            </span>

            <ChevronRight
              width={24}
              className="cursor-pointer text-gray-400 hover:text-white transition-colors flex-shrink-0"
            />
          </div>
        </div>

        <button
          onClick={onBookHandler}
          type="button"
          className="w-full md:w-auto bg-primary text-white px-10 py-3 rounded-xl hover:bg-primary/90 transition-all font-semibold cursor-pointer shadow-lg shadow-primary/20 active:scale-95 self-end md:self-center z-10 whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
