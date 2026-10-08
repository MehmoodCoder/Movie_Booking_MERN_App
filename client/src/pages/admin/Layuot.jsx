import React from "react";
import AdminNavBar from "../../components/admin/AdminNavBar";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import Loading from "../../components/Loading";

function Layuot() {
  const { isAdmin, fetchIsAdmin } = useAppContext();

  console.log(isAdmin)

  useEffect(() => {
    fetchIsAdmin();
  }, []);

  return isAdmin ? (
    <>
      <AdminNavBar />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Layuot;
