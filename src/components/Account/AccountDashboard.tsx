import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { AccountSidebar } from "./AccountSidebar";
import AccountInfo from "./AccountInfo";
import UserReservations from "./UserReservations";

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
