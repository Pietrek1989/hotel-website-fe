import React from "react";
import SparkLine from "./Charts/SparkLine";
import { SparklineAreaData } from "./data/adminData";
import Stacked from "./Charts/Stacked";
interface EarningsAndReservationsProps {
  allEarnings: number;
}

const DashBoardMiddle: React.FC<EarningsAndReservationsProps> = ({
  allEarnings,
}) => {
  return (
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
  );
};

export default DashBoardMiddle;
