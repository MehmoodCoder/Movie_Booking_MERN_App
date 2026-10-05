import React, { useState } from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import ReactPlayer from "react-player";
import { PlayCircleIcon } from "lucide-react";

function TrailerSection() {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-[960px] mx-auto">
        Trailers
      </p>

      <div className="relative mt-6 max-w-[960px] mx-auto">
        <BlurCircle right="-100px" top="-100px" />
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
          <ReactPlayer
            className="mx-auto max-w-full"
            controls="{false}"
            height="540px"
            url="{currentTrailer.videoUrl}"
            width="100%"
          />
        </div>
      </div>

      <div className="group grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 mt-8 max-w-[960px] mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            className={`relative group-hover:not-hover:opacity-50 hover:-translate-y-1 duration-300 transition h-40 md:h-36 cursor-pointer rounded-xl overflow-hidden border-2 ${currentTrailer.videoUrl === trailer.videoUrl ? "border-primary" : "border-transparent"}`}
            onClick={() => setCurrentTrailer(trailer)}
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="rounded-xl w-full h-full object-cover brightness-75"
            />
            <PlayCircleIcon
              className="absolute top-1/2 left-1/2 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 text-white drop-shadow-md"
              strokeWidth="{1.6}"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrailerSection;
