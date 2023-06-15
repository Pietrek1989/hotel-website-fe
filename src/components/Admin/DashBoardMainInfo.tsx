import React from "react";
import {
  BsCalendar2Check,
  BsCurrencyDollar,
  BsListColumnsReverse,
} from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineSupervisorAccount } from "react-icons/md";

interface EarningsAndReservationsProps {
  thisMonthEarnings: number;
  thisMonthReservations: number;
  users: number;
  allReservations: number;
  allEarnings: number;
}
const DashBoardMainInfo: React.FC<EarningsAndReservationsProps> = ({
  thisMonthEarnings,
  thisMonthReservations,
  users,
  allReservations,
  allEarnings,
}) => {
  return (
    <div className="flex flex-col flex-wrap lg:flex-nowrap justify-center w-full">
      <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-2/3 p-8 pt-9 m-3 bg-admin-hero-pattern bg-no-repeat bg-cover bg-center mx-auto">
        <div className="flex justify-between items-center w-full">
          <div className="dark:bg-secondary-dark-bg  bg-white rounded-md p-2 m">
            <p className="font-bold text-gray-400">
              {" "}
              Earning this Month:{" "}
              <span className="text-2xl text-gray-700 dark:text-white ">
                {thisMonthEarnings ? thisMonthEarnings : 1230}$
              </span>
            </p>
          </div>
          <div className="text-2xl opacity-0.9 text-black hover:drop-shadow-xl rounded-full  p-4">
            <BsCurrencyDollar />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="dark:bg-secondary-dark-bg  bg-white rounded-md p-1">
            <p className="font-bold text-gray-400">
              Reservations this Month:{" "}
              <span className="text-2xl text-gray-700 dark:text-white">
                {thisMonthReservations ? thisMonthReservations : 5}
              </span>
            </p>
          </div>
          <div className="text-2xl opacity-0.9 text-black hover:drop-shadow-xl rounded-full  p-4">
            <BsCalendar2Check />
          </div>
        </div>
      </div>
      <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
          <button
            type="button"
            style={{ color: "#03C9D7", backgroundColor: "#E5FAFB" }}
            className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
          >
            <MdOutlineSupervisorAccount />
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">{users}</span>
            {/* <span className={`text-sm text-red-600 ml-2`}>10%</span> */}
          </p>
          <p className="text-sm text-gray-400  mt-1">All Customers</p>
        </div>
        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
          <button
            style={{
              color: "rgb(255, 244, 229)",
              backgroundColor: "rgb(254, 201, 15)",
            }}
            className="
                      text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
          >
            <BsListColumnsReverse />
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">
              {allReservations ? allReservations : 231}
            </span>
            {/* <span className={`text-sm text-green-600 ml-2`}>10%</span> */}
          </p>
          <p className="text-sm text-gray-400  mt-1">All reservations</p>
        </div>
        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
          <button
            type="button"
            style={{
              color: "rgb(228, 106, 118)",
              backgroundColor: "rgb(255, 244, 229)",
            }}
            className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl text-"
          >
            <FiBarChart />
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">
              {allEarnings ? allEarnings : 12300}
            </span>
            {/* <span className={`text-sm text-green-600 ml-2`}>10%</span> */}
          </p>
          <p className="text-sm text-gray-400  mt-1">All earnings</p>
        </div>
        <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
          <button
            type="button"
            style={{
              color: "rgb(0, 194, 146)",
              backgroundColor: "rgb(235, 250, 242)",
            }}
            className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
          >
            <HiOutlineRefresh />{" "}
          </button>
          <p className="mt-3">
            <span className="text-lg font-semibold">1</span>
            {/* <span className={`text-sm text-red-600 ml-2`}>10%</span> */}
          </p>
          <p className="text-sm text-gray-400  mt-1">Refunds</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoardMainInfo;
