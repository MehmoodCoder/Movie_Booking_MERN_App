import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

function Favorite() {  
  const { favoriteMovies } = useAppContext()

  return favoriteMovies.length > 0 ? (
      <div className="relative my-20 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden w-full min-h-[80vh]">
        <BlurCircle top="156px" left="0px" />
        <BlurCircle bottom="50px" right="50px" />
  
        <h1 className="text-lg font-medium my-4">Your Favorite Movies</h1>
  
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-items-center sm:justify-items-start">
          {favoriteMovies.map((movie) => (
            <MovieCard movie={movie} key={movie._id} />
          ))}
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg">No movies available.</p>
      </div>
    );
}

export default Favorite