import { motion } from "framer-motion";
import { slideFromRightVariantWithOpacity } from "../../utils/motion";
import { useSelector } from "react-redux";
import SkiFiveDay from "./SkiFiveDay";

const SkiSection = () => {
  const SkiConditions = useSelector(
    (state: any) => state.skiConditions.conditions
  );
  return (
    <motion.div
      variants={slideFromRightVariantWithOpacity}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center  min-h-screen text-gray-700 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 mt-20 p-0  w-5/5 lg:w-2/5 "
    >
      <div className="w-full max-w-screen-sm bg-currentDay p-10 rounded-xl ring-8 ring-white ring-opacity-40 hero-ski md:h-4/7 lg:h-3/7  weather-shadow">
        <div className="flex justify-between">
          <div className="flex flex-col  bg-white rounded-lg p-4">
            <span className="font-semibold mt-1 text-5xl md:text-4xl lg-text-5xl text-gray-500">
              Alpbach
            </span>
            <span className="text-2xl md:text-xl lg:text-2xl font-bold">
              SLOPE CONDITION: {SkiConditions.items[0].operatingStatus}
            </span>
            <span className="font-semibold text-lg ">
              Today:{" "}
              {SkiConditions.items[0].weatherToday_Condition
                ? SkiConditions.items[0].weatherToday_Condition
                : "Seson starts again 20-12-2023!"}
            </span>
            <p>
              Check for more information{" "}
              <a
                className="text-currentDayDarker"
                href="https://www.skijuwel.com/en/winter/operating-times"
              >
                HERE
              </a>
            </p>
          </div>
        </div>
      </div>

      <SkiFiveDay />
    </motion.div>
  );
};

export default SkiSection;
