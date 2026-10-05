import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import timeFormat from "../lib/timeFormat";
import { dummyShowsData, dummyDateTimeData, dummyCastsData } from "../assets/assets";
import Loading from "../components/Loading";

import { Star, PlayCircle, Heart } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const foundShow = dummyShowsData.find((show) => show._id === id);
    if (foundShow) {
      setShow({
        movie: foundShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
    window.scrollTo(0, 0);
  }, [id]);

  return show ? (
    <div className="px-4 sm:px-6 md:px-16 lg:px-40 pt-28 md:pt-36 bg-black text-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto items-start">
        <div className="w-full md:w-auto flex-shrink-0">
          <img
            src={show.movie.poster_path}
            alt=""
            className="w-full max-w-[280px] sm:max-w-[320px] max-md:mx-auto rounded-xl h-auto aspect-[70/104] object-cover shadow-2xl border border-white/10"
          />
        </div>

        <div className="relative flex flex-col gap-4 w-full flex-grow">
          <BlurCircle top="-100px" left="-100px" />

          <p className="text-primary font-medium tracking-wider text-sm">
            ENGLISH
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold max-w-2xl text-balance tracking-tight">
            {show.movie.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-300 bg-white/5 w-fit px-3 py-1 rounded-full border border-white/5 text-sm">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span>{show.movie.vote_average.toFixed(1)} User Rating</span>
          </div>

          <p className="text-gray-400 mt-1 text-sm leading-relaxed max-w-xl">
            {show.movie.overview}
          </p>

          <p className="text-gray-300 font-medium text-xs sm:text-sm">
            {timeFormat(show.movie.runtime)} •{" "}
            {show.movie.genres.map((genre) => genre.name).join(", ")} •{" "}
            {show.movie.release_date.split("-")[0]}
          </p>

          <div className="flex items-center flex-wrap gap-4 mt-3">
            <button className="flex items-center gap-2 px-6 py-2.5 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95 border border-white/5">
              <PlayCircle className="w-4 h-4" />
              Watch Trailer
            </button>

            <a
              href="#dateSelect"
              className="px-8 py-2.5 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95 text-white text-center shadow-lg shadow-primary/20"
            >
              Buy Tickets
            </a>

            <button className="bg-gray-800 hover:bg-gray-900 p-2.5 rounded-full transition cursor-pointer active:scale-95 text-white border border-white/5">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-8 w-full max-w-xl">
            <p className="text-lg font-medium text-white">Your Favorite Cast</p>
            <div className="overflow-x-auto no-scrollbar mt-4 pb-2 scroll-smooth">
              <div className="flex items-start gap-5 w-max pr-4">
                {dummyCastsData.map((cast, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center w-20 group"
                  >
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-md">
                      <img
                        src={cast.profile_path}
                        alt={cast.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <p className="font-medium text-[11px] mt-2 text-gray-400 group-hover:text-white transition-colors line-clamp-2 max-w-[80px]">
                      {cast.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>

      <div className="mt-24 max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 text-center md:text-left">
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto gap-8 justify-items-center">
          {dummyShowsData.slice(0, 3).map((movie, index) => (
            <div key={index} className="w-full max-w-[260px] sm:max-w-[280px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-16 mb-20">
        <button
          onClick={() => {navigate("/movies"); scrollTo(0, 0);}}
          className="px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer text-white shadow-md"
        >
          Show more
        </button>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Loading />
    </div>
  );
};

export default MovieDetails;
