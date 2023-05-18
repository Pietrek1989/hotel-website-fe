import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountSidebar } from "./AccountSidebar";
import AccountInfo from "./AccountInfo";
import { UserReservations } from "./UserReservations";

const AccountDashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex relative dark:bg-main-dark-bg">
        <div
          className="fixed right-4 bottom-4"
          style={{ zIndex: "1000" }}
        ></div>
        <motion.div
          className={`fixed sidebar dark:bg-secondary-dark-bg bg-white ${
            isMobile ? "w-full" : "w-72"
          }`}
          initial={{ x: "-100%" }}
          animate={{ x: "0" }}
          transition={{ duration: 0.5 }}
        >
          <AccountSidebar />
        </motion.div>
        <button className="absolute top-20 left-4 z-50 items-center gap-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"></button>
        <div className="dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  ">
          <div>
            <Routes>
              <Route path="/" element={<AccountInfo />} />
              <Route path="/reservations" element={<UserReservations />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
