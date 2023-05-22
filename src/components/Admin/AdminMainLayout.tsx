import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminSectionEcommerce from "./sections/AdminSectionEcommerce";
import AdminSectionReservation from "./sections/AdminSectionReservation";
import AdminSectionCustomer from "./sections/AdminSectionCustomer";
import AdminSectionKanban from "./sections/AdminSectionKanban";
import AdminSectionCalendar from "./sections/AdminSectionCalendar";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import "../../styles/admin.css";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import DarkMode from "./DarkMode";
import { RootState } from "../../redux/hooks";
import { useSelector } from "react-redux";
import AdminSectionImages from "./sections/AdminSectionImages";
import RefundSection from "./sections/RefundSection";

const AdminMainLayout = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.user.userData);
  const [isMobile, setIsMobile] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [themeSettings, setThemeSettings] = useState(false);
  const [currentMode, setCurrentMode] = useState("Light");

  useEffect(() => {
    console.log(role);
    if (role !== "Admin") {
      return navigate("/");
    }

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

              <Route path="/refunds" element={<RefundSection />} />

              {/* apps  */}
              <Route path="/kanban" element={<AdminSectionKanban />} />
              <Route path="/calendar" element={<AdminSectionCalendar />} />
              <Route path="/images" element={<AdminSectionImages />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMainLayout;
