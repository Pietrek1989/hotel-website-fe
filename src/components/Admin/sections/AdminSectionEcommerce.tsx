import React, { useEffect, useState } from "react";
import {
  BsCalendar2Check,
  BsCurrencyDollar,
  BsListColumnsReverse,
} from "react-icons/bs";
import { IoIosMore } from "react-icons/io";

import {
  recentTransactions,
  weeklyStats,
  SparklineAreaData,
} from "../data/adminData.js";
import SparkLine from "../Charts/SparkLine";
import Stacked from "../Charts/Stacked.jsx";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEarnings,
  fetchAllReservationsCount,
  fetchThisMonthEarnings,
  fetchThisMonthReservationsCount,
  fetchUsers,
} from "../data/adminFetching";
import LineChart from "../Charts/LineChart.jsx";

const AdminSectionEcommerce = () => {
  const [currentMode, setCurrentMode] = useState("Light");

  const thisMonthEarnings = useSelector(
    (state: any) => state.thisMonthEarnings.thisMonthEarnings
  );
  const users = useSelector((state: any) => state.allUsers.allUsers);

  const thisMonthReservations = useSelector(
    (state: any) => state.thisMonthReservations.thisMonthReservations
  );

  const allReservations = useSelector(
    (state: any) => state.allReservations.allReservations
  );
  const allEarnings = useSelector(
    (state: any) => state.allEarnings.allEarnings
  );

  const dispatch = useDispatch();

  useEffect(() => {
    fetchThisMonthEarnings(dispatch);
    fetchUsers(dispatch);
    fetchAllReservationsCount(dispatch);
    fetchThisMonthReservationsCount(dispatch);
    fetchAllEarnings(dispatch);
  }, []);
  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark mt-24" : "mt-24"}>
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

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between"></div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div>
              <Stacked width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: "white" }}
          >
            <div className="flex justify-between items-center ">
              <div>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor="brown"
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold ">
                {allEarnings ? allEarnings : 2131}{" "}
              </p>
              <p className="text-gray-400">Yearly sales</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="mt-10 w-72 md:w-400">
            {recentTransactions.map((item) => (
              <div key={item.title} className="flex justify-between mt-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    style={{
                      color: item.iconColor,
                      backgroundColor: item.iconBg,
                    }}
                    className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                  >
                    {item.icon}
                  </button>
                  <div>
                    <p className="text-md font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
                <p className={`text-${item.pcColor}`}>{item.amount}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <div className="mt-3">
              <button className="bg-lightgreen rounded-md text-white" />
            </div>

            <p className="text-gray-400 text-sm">36 Recent Transactions</p>
          </div>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="md:w-full overflow-auto">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionEcommerce;
