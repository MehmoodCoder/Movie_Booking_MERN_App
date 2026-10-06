import React from "react";
import { Link } from "react-router-dom";

function AdminNavBar() {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default AdminNavBar;
