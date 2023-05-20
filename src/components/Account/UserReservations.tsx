import React, { useEffect, useState } from "react";
import AdminHeader from "../Admin/AdminHeader";
import Loader from "../other/Loader";
import UserReservationCard from "./UserReservationCard";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/users/me/reservations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data); // add this line
      setReservations(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return (
      <div className="flex w-screen h-screen flex-col justify-center items-center ">
        <div>
          <h2 className="text-2xl">LOADING</h2>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        Error: {error}
        <button onClick={fetchReservations}>Retry</button>
      </div>
    );
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <AdminHeader category="Page" title="Reservations" />
      {reservations ? (
        <div>
          <UserReservationCard reservations={reservations} />
        </div>
      ) : (
        <div className="text-4xl">No reservations to show</div>
      )}
    </div>
  );
};

export default UserReservations;
