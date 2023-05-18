import React from "react";
import { BsCalendar2Check } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { Link, useLocation } from "react-router-dom";

export const AccountSidebar = () => {
  const location = useLocation();
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 mt-20">
      <div className="flex-col justify-center items-center ml-10">
        <div>
          <Link
            to={`/account/reservations`}
            id={
              location.pathname === `/account/reservations`
                ? "admin-active"
                : " "
            }
            className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
          >
            <BsCalendar2Check />
            <span className="capitalize ">reservations</span>
          </Link>
          <Link
            to={`/account`}
            id={location.pathname === `/account` ? "admin-active" : " "}
            className="flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2"
          >
            <ImProfile />
            <span className="capitalize ">Info</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
