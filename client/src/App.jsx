import React from "react";
import NavBar from "./components/NavBar";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Movies />} path="/movies" />
        <Route element={<MovieDetails />} path="/movies/:id" />
        <Route element={<SeatLayout />} path="/movies/:id/:date" />
        <Route element={<MyBookings />} path="/my-bookings" />
        <Route element={<Favorite />} path="/favorite" />
      </Routes>
    </>
  );
}

export default App;
