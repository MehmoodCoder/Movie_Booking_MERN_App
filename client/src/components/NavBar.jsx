import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon, SearchIcon, TicketPlus } from "lucide-react";
import logo from "../assets/logo.svg";
import { useUser } from "@clerk/react";
import { useClerk, UserButton } from "@clerk/react";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [onboardingStage, setOnboardingStage] = useState("request");
  const [theaterName, setTheaterName] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [onboardingError, setOnboardingError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();

  const { favoriteMovies, isAdmin, axios, getToken, fetchIsAdmin } =
    useAppContext();

  const requestHeaders = useCallback(async () => ({
    Authorization: `Bearer ${await getToken()}`,
  }), [getToken]);

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/theater-admin/status", {
        headers: await requestHeaders(),
      });
      if (data.status === "pending") {
        setTheaterName(data.request.theaterName);
        setAddress(data.request.address);
        setContactPhone(data.request.contactPhone);
        setOnboardingStage("pending");
      } else if (data.status === "approved") {
        setOnboardingStage("approved");
        if (await fetchIsAdmin()) {
          setIsOnboardingOpen(false);
          navigate("/admin");
        }
      } else {
        if (data.request) {
          setTheaterName(data.request.theaterName);
          setAddress(data.request.address);
          setContactPhone(data.request.contactPhone);
        }
        setOnboardingStage(data.status === "rejected" ? "rejected" : "request");
      }
    } catch (error) {
      setOnboardingError(
        error.response?.data?.message || "Unable to check request status.",
      );
    }
  }, [axios, fetchIsAdmin, navigate, requestHeaders, user]);

  useEffect(() => {
    if (isOnboardingOpen && user) {
      setOnboardingStage("loading");
      setOnboardingError("");
      checkOnboardingStatus();
    }
  }, [checkOnboardingStatus, isOnboardingOpen, user]);

  useEffect(() => {
    if (!isOnboardingOpen || onboardingStage !== "pending") return;

    const intervalId = setInterval(async () => {
      try {
        const { data } = await axios.get("/api/user/theater-admin/status", {
          headers: await requestHeaders(),
        });
        if (data.status === "approved") {
          const hasAdminAccess = await fetchIsAdmin();
          if (hasAdminAccess) {
            setOnboardingStage("approved");
            setIsOnboardingOpen(false);
            navigate("/admin");
          }
        } else if (data.status === "rejected") {
          setOnboardingStage("rejected");
        }
      } catch (error) {
        console.error(error);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [
    axios,
    fetchIsAdmin,
    isOnboardingOpen,
    navigate,
    onboardingStage,
    requestHeaders,
  ]);

  const handleSubmitRequest = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOnboardingError("");
    try {
      const { data } = await axios.post(
        "/api/user/theater-admin/request",
        { theaterName, address, contactPhone },
        { headers: await requestHeaders() },
      );
      setOnboardingStage(data.status);
    } catch (error) {
      setOnboardingError(
        error.response?.data?.message || "Unable to submit the theater request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-transparent">
      <Link to="/" className="max-md:flex-1">
        <img src={logo} alt="Logo" className="w-50 h-auto" />
      </Link>

      <div
        className={`max-md:fixed max-md:top-0 max-md:right-0 max-md:bottom-0 max-md:bg-black/80 max-md:z-50 flex max-md:flex-col items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/25 overflow-hidden transition-[width] duration-300 ${isOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
        >
          Movies
        </Link>
        {user && isAdmin ? (
          <Link
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/admin"
          >
            Dashboard
          </Link>
        ) : user ? (
          <button
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
              setTheaterName("");
              setAddress("");
              setContactPhone("");
              setIsOnboardingOpen(true);
            }}
            className="cursor-pointer"
          >
            List Your Theater
          </button>
        ) : (
          <Link
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/"
          >
            Theaters
          </Link>
        )}
        {favoriteMovies.length > 0 && (
          <Link
            onClick={() => {
              scrollTo(0, 0);
              setIsOpen(false);
            }}
            to="/favorite"
          >
            Favorites
          </Link>
        )}
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                onClick={() => navigate("/my-bookings")}
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
    </div>
    {isOnboardingOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4">
        <div className="relative w-full max-w-md rounded-xl border border-gray-300/20 bg-[#171717] p-6 text-white shadow-xl">
          <button
            type="button"
            aria-label="Close"
            className="absolute right-4 top-4 cursor-pointer"
            onClick={() => setIsOnboardingOpen(false)}
          >
            <XIcon className="h-5 w-5" />
          </button>
          <h2 className="mb-2 pr-8 text-xl font-semibold">List Your Theater</h2>
          {onboardingStage === "loading" ? (
            <p className="text-sm text-gray-300">Checking your request...</p>
          ) : onboardingStage === "request" ||
            onboardingStage === "rejected" ? (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              {onboardingStage === "rejected" && (
                <p className="text-sm text-amber-300">
                  Your previous request was rejected. Update the details and
                  submit a new request for review.
                </p>
              )}
              <p className="text-sm text-gray-300">
                Submit your theater details for review by the MainAdmin. Your
                account will receive admin access only after approval.
              </p>
              <label className="block text-sm">
                Theater name
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={theaterName}
                  onChange={(event) => setTheaterName(event.target.value)}
                  className="mt-1 w-full rounded border border-gray-500 bg-black/40 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                Theater address
                <textarea
                  required
                  minLength={5}
                  maxLength={500}
                  rows={3}
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="mt-1 w-full resize-y rounded border border-gray-500 bg-black/40 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                Contact phone
                <input
                  type="tel"
                  required
                  maxLength={25}
                  value={contactPhone}
                  onChange={(event) => setContactPhone(event.target.value)}
                  className="mt-1 w-full rounded border border-gray-500 bg-black/40 px-3 py-2"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-4 py-2 font-medium disabled:opacity-60"
              >
                {isSubmitting ? "Submitting..." : "Submit request"}
              </button>
            </form>
          ) : onboardingStage === "pending" ? (
            <p className="text-sm text-gray-300">
              Your request for {theaterName} is pending MainAdmin review. This
              window will update after it is reviewed.
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              Your request has been approved. Opening the admin dashboard...
            </p>
          )}
          {onboardingError && (
            <p role="alert" className="mt-4 text-sm text-red-400">
              {onboardingError}
            </p>
          )}
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
