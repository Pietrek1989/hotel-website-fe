import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminSectionEcommerce from "./sections/AdminSectionEcommerce";
import AdminSectionReservation from "./sections/AdminSectionReservation";
import AdminSectionCustomer from "./sections/AdminSectionCustomer";
import AdminSectionKanban from "./sections/AdminSectionKanban";
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
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import DarkMode from "./DarkMode";

const AdminMainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentMode, setCurrentMode] = useState("Light");

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

  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: "blue", borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
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
          className="absolute top-40 left-4 z-50 items-center gap-3 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
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
            {themeSettings && (
              <DarkMode
                setThemeSettings={setThemeSettings}
                setCurrentMode={setCurrentMode}
                currentMode={currentMode}
              />
            )}

            <Routes>
              {/* dashboard  */}
              <Route path="/" element={<AdminSectionEcommerce />} />
              <Route path="/ecommerce" element={<AdminSectionEcommerce />} />

              {/* pages  */}
              <Route
                path="/reservations"
                element={<AdminSectionReservation />}
              />
              <Route path="/customers" element={<AdminSectionCustomer />} />

              {/* apps  */}
              <Route path="/kanban" element={<AdminSectionKanban />} />
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
