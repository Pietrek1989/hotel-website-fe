import { useSelector } from "react-redux";

const SkiFiveDay = () => {
  const SkiConditions = useSelector(
    (state: any) => state.skiConditions.conditions
  );
  return (
    <>
      {SkiConditions.items[0].weatherTomorrow_Condition && (
        <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-bg text-mainText p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40 h-screen overflow-auto weather-shadow">
          <span className="font-semibold text-lg  ">
            Tomorrow:{" "}
            {SkiConditions.items[0].weatherTomorrow_Condition
              ? SkiConditions.items[0].weatherTomorrow_Condition
              : "Season finished"}
          </span>
          <span className="font-semibold text-lg  ">
            In 2 days:{" "}
            {SkiConditions.items[0].weatherDayAfterTomorrow_Condition
              ? SkiConditions.items[0].weatherDayAfterTomorrow_Condition
              : "Season finished"}
          </span>
          <span className="font-semibold text-lg  ">
            In 3 days:{" "}
            {SkiConditions.items[0].weatherDay4_Condition
              ? SkiConditions.items[0].weatherDay4_Condition
              : "Season finished"}
          </span>
          <span className="font-semibold text-lg  ">
            In 4 days:{" "}
            {SkiConditions.items[0].weatherDay5_Condition
              ? SkiConditions.items[0].weatherDay5_Condition
              : "Season finished"}
          </span>
        </div>
      )}
    </>
  );
};

export default SkiFiveDay;
