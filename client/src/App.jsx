import React from "react";
import NavBar from "./components/NavBar";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster } from 'react-hot-toast'
import Footer from "./components/Footer";
import Layuot from "./pages/admin/Layuot"; 
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListBookings from "./pages/admin/ListBookings";
import ListShows from "./pages/admin/ListShows";

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
        <Route path="/admin/*" element={<Layuot/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="add-list" element={<AddShows/>} />
          <Route path="lsit-show" element={<ListShows/>} />
          <Route path="list-booking" element={<ListBookings/>} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer/>}
    </>
  );
}

export default App;
