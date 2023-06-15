import React from "react";
import LineChart from "./Charts/LineChart";
import { recentTransactions } from "./data/adminData";

const DashBoardBottom = () => {
  return (
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
  );
};

export default DashBoardBottom;
