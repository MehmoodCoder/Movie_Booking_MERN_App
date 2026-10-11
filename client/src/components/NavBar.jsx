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
  const [onboardingStage, setOnboardingStage] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
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
      setEmail(data.email || user?.primaryEmailAddress?.emailAddress || "");
      if (data.status === "pending_verification") {
        setOnboardingStage("otp");
      } else if (data.status === "pending_approval") {
        setOnboardingStage("pending_approval");
      } else if (data.status === "approved") {
        setOnboardingStage("approved");
        if (await fetchIsAdmin()) {
          setIsOnboardingOpen(false);
          navigate("/admin");
        }
      } else {
        setOnboardingStage("email");
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
    if (!isOnboardingOpen || onboardingStage !== "pending_approval") return;

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
          setOnboardingStage("email");
          setOnboardingError("Your request was declined. You may submit a new request.");
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

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOnboardingError("");
    try {
      const { data } = await axios.post(
        "/api/user/theater-admin/request-otp",
        { email },
        { headers: await requestHeaders() },
      );
      if (data.status === "pending_approval") {
        setOnboardingStage("pending_approval");
      } else {
        setOnboardingStage("otp");
      }
    } catch (error) {
      if (error.response?.data?.status === "pending_verification") {
        setOnboardingStage("otp");
      }
      setOnboardingError(
        error.response?.data?.message || "Unable to send the verification code.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setOnboardingError("");
    try {
      const { data } = await axios.post(
        "/api/user/theater-admin/verify-otp",
        { otp },
        { headers: await requestHeaders() },
      );
      setOnboardingStage(data.status);
    } catch (error) {
      setOnboardingError(
        error.response?.data?.message || "Unable to verify the code.",
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
              setEmail(user.primaryEmailAddress?.emailAddress || "");
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
          ) : onboardingStage === "email" ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <p className="text-sm text-gray-300">
                Verify your email to submit a request. An existing admin must
                approve it before your account receives admin access.
              </p>
              <label className="block text-sm">
                Email address
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1 w-full rounded border border-gray-500 bg-black/40 px-3 py-2"
                />
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-4 py-2 font-medium disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send verification code"}
              </button>
            </form>
          ) : onboardingStage === "otp" ? (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <p className="text-sm text-gray-300">
                Enter the 6-digit code sent to {email}.
              </p>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                aria-label="6-digit verification code"
                className="w-full rounded border border-gray-500 bg-black/40 px-3 py-2 text-center text-xl tracking-[0.5em]"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-primary px-4 py-2 font-medium disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify email"}
              </button>
            </form>
          ) : onboardingStage === "pending_approval" ? (
            <p className="text-sm text-gray-300">
              Your email is verified. Your request is waiting for approval by an
              existing admin. This window will update when it is reviewed.
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
