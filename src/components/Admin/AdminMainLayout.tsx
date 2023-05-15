import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminSectionEcommerce from "./sections/AdminSectionEcommerce";
import AdminSectionReservation from "./sections/AdminSectionReservation";
import AdminSectionCustomer from "./sections/AdminSectionCustomer";
import AdminSectionKanban from "./sections/AdminSectionKanban";
import AdminSectionEditor from "./sections/AdminSectionEditor";
import AdminSectionCalendar from "./sections/AdminSectionCalendar";
import AdminSectionLine from "./sections/Charts/AdminSectionLine";
import AdminSectionArea from "./sections/Charts/AdminSectionArea";
import AdminSectionBar from "./sections/Charts/AdminSectionBar";
import AdminSectionPie from "./sections/Charts/AdminSectionPie";
import AdminSectionFinancial from "./sections/Charts/AdminSectionFinancial";
import AdminSectionPyramid from "./sections/Charts/AdminSectionPyramid";
import AdminSectionStacked from "./sections/Charts/AdminSectionStacked";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { motion } from "framer-motion";
import "../../styles/admin.css";

const AdminMainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isActive, setIsActive] = useState(true);

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

  const handleCloseSideBar = () => {
    setIsActive(false);
  };

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
          animate={{ x: isActive ? "0" : "-100%" }}
          transition={{ duration: 0.5 }}
        >
          <AdminSidebar isActive={isActive} setIsActive={setIsActive} />
        </motion.div>
        <button
          onClick={() => setIsActive(!isActive)}
          className="absolute top-20 left-4 z-50 items-center gap-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          {isActive ? "" : <AiOutlineMenu />}
        </button>
        <div
          className={
            isActive
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div>
            <Routes>
              {/* dashboard  */}
              <Route path="/admin" element={<AdminSectionEcommerce />} />
              <Route path="/ecommerce" element={<AdminSectionEcommerce />} />

              {/* pages  */}
              <Route
                path="/reservations"
                element={<AdminSectionReservation />}
              />
              <Route path="/customers" element={<AdminSectionCustomer />} />

              {/* apps  */}
              <Route path="/kanban" element={<AdminSectionKanban />} />
              <Route path="/editor" element={<AdminSectionEditor />} />
              <Route path="/calendar" element={<AdminSectionCalendar />} />

              {/* charts  */}
              <Route path="/line" element={<AdminSectionLine />} />
              <Route path="/area" element={<AdminSectionArea />} />
              <Route path="/bar" element={<AdminSectionBar />} />
              <Route path="/pie" element={<AdminSectionPie />} />
              <Route path="/financial" element={<AdminSectionFinancial />} />
              <Route path="/pyramid" element={<AdminSectionPyramid />} />
              <Route path="/stacked" element={<AdminSectionStacked />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
