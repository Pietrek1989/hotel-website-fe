import React, { useEffect, useState, useTransition } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEarnings,
  fetchAllReservationsCount,
  fetchThisMonthEarnings,
  fetchThisMonthReservationsCount,
  fetchUsers,
} from "../data/adminFetching";
import DashBoardMainInfo from "../DashBoardMainInfo";
import DashBoardMiddle from "../DashBoardMiddle";
import DashBoardBottom from "../DashBoardBottom";

const AdminSectionEcommerce = () => {
  const [currentMode, setCurrentMode] = useState("Light");
  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      fetchThisMonthEarnings(dispatch);
      fetchUsers(dispatch);
      fetchAllReservationsCount(dispatch);
      fetchThisMonthReservationsCount(dispatch);
      fetchAllEarnings(dispatch);
    });
  }, []);
  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark mt-24" : "mt-24"}>
      <DashBoardMainInfo
        thisMonthEarnings={thisMonthEarnings}
        thisMonthReservations={thisMonthReservations}
        users={users}
        allReservations={allReservations}
        allEarnings={allEarnings}
      />

      <DashBoardMiddle allEarnings={allEarnings} />
      <DashBoardBottom />
    </div>
  );
};

export default AdminSectionEcommerce;
