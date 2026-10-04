import React from "react";
import NavBar from "./components/NavBar";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster, toaster } from 'react-hot-toast'
import Footer from "./components/Footer";

function App() {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
      <Toaster/>
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Movies />} path="/movies" />
        <Route element={<MovieDetails />} path="/movies/:id" />
        <Route element={<SeatLayout />} path="/movies/:id/:date" />
        <Route element={<MyBookings />} path="/my-bookings" />
        <Route element={<Favorite />} path="/favorite" />
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  );
}

export default App;
