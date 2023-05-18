import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { links } from "./data/adminData.js";
import { MdOutlineCancel } from "react-icons/md";

interface SidebarProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isActive, setIsActive }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const closeSidebar = () => {
    if (isMobile) {
      setIsActive(false);
    }
  };

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

  const mobileClass = isMobile
    ? "flex-col justify-center items-center ml-10"
    : "";
  const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 ${
    isMobile ? "justify-center" : ""
  } `;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 mt-20">
      {isActive && (
        <div className={mobileClass}>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className="items-center gap-3 ml-3  flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <MdOutlineCancel />
            </button>
          </div>
          {links.map((item: any) => (
            <div key={item.title}>
              <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                {item.title}
              </p>
              {item.links.map((link: any) => (
                <NavLink
                  to={`/admin/${link.name}`}
                  key={link.name}
                  id={
                    location.pathname === `/admin/${link.name}`
                      ? "admin-active"
                      : " "
                  }
                  className={normalLink}
                  onClick={closeSidebar} // close sidebar when link is clicked
                >
                  {link.icon}
                  <span className="capitalize ">{link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
