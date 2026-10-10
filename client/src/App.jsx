import React from "react";
import NavBar from "./components/NavBar";
import { Route, Router, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import SeatLayout from "./pages/SeatLayout";
import MyBookings from "./pages/MyBookings";
import Favorite from "./pages/Favorite";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Layuot from "./pages/admin/Layuot";
import Dashboard from "./pages/admin/Dashboard";
import AddShows from "./pages/admin/AddShows";
import ListBookings from "./pages/admin/ListBookings";
import ListShows from "./pages/admin/ListShows";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/react";
import Loading from "./components/Loading";

function App() {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  const { user } = useAppContext();
  return (
    <>
      <Toaster />
      {!isAdminRoute && <NavBar />}
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Movies />} path="/movies" />
        <Route element={<MovieDetails />} path="/movies/:id" />
        <Route element={<SeatLayout />} path="/movies/:id/:date" />
        <Route element={<MyBookings />} path="/my-bookings" />
        <Route element={<Loading />} path="/loading/:nextUrl" />
        <Route element={<Favorite />} path="/favorite" />
        <Route
          path="/admin/*"
          element={
            user ? (
              <Layuot />
            ) : (
              <div className="min-h-screen flex justify-center items-center">
                <SignIn fallbackRedirectUrl={"/admin"} />
              </div>
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
