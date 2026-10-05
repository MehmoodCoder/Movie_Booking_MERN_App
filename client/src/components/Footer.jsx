import React from "react";
import logo from "../assets/logo.svg";

function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailInput = e.target.elements.email.value;
    if (emailInput) {
      window.location.href = `mailto:mehmood.mh56@gmail.com?subject=Newsletter Subscription&body=Please subscribe this email: ${emailInput}`;
    }
  };

  return (
    <div className="bg-black text-gray-400 pt-12 pb-6 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-white/10">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <a href="/">
            <img src={logo} alt="logo" className="mb-4 h-8 md:h-9" />
          </a>
          <p className="text-sm">
            MoviefyHub is your ultimate destination for seamless movie ticket
            booking, latest releases, trailers, and instant seat reservations.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://www.instagram.com/mehmood_mh56"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zm9.5 1a4 4 0 11-4 4 4 4 0 014-4zm0 1.5a2.5 2.5 0 102.5 2.5 2.5 2.5 0 00-2.5-2.5zm3.5-.75a.75.75 0 11.75-.75.75.75 0 01-.75.75z" />
              </svg>
            </a>
            <a
              href="https://x.com/MehmoodHassan56"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/MehmoodCoder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mehmood-hassan-7604a03b1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48c0 1.1.88 1.98 1.98 1.98h.02c1.1 0 1.98-.88 1.98-1.98C6.98 4.38 6.1 3.5 4.98 3.5zM3 8.75h3.96V21H3V8.75zm6.25 0h3.8v1.68h.05c.53-.98 1.82-2.02 3.75-2.02 4.01 0 4.75 2.64 4.75 6.07V21H17v-5.63c0-1.34-.03-3.07-1.88-3.07-1.88 0-2.17 1.47-2.17 2.98V21H9.25V8.75z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <p className="text-lg text-white font-semibold">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Partners
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg text-white font-semibold">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Safety Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Accessibility
              </a>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="text-lg text-white font-semibold">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for movie updates and special offers.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center mt-4">
            <input
              type="email"
              name="email"
              required
              className="bg-zinc-900 text-white rounded-l border border-white/20 h-9 px-3 outline-none focus:border-primary w-full text-sm"
              placeholder="Your email"
            />
            <button
              type="submit"
              className="flex items-center justify-center bg-primary hover:bg-primary/90 transition h-9 px-4 rounded-r shrink-0"
            >
              <svg
                className="w-4 h-4 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <hr className="border-white/10 mt-8" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-center py-5">
        <p className="text-center text-sm">
          Copyright {new Date().getFullYear()} ©{" "}
          <a href="/" className="text-white hover:underline">
            MoviefyHub
          </a>
          . All Right Reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
