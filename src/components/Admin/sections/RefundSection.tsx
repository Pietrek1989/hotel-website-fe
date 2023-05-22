import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInfoReservations } from "../data/adminFetching";
import axios from "axios";
import AdminHeader from "../AdminHeader";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

interface Reservation {
  _id: string;
  user: {
    name: string;
    surname: string;
  };
  content: {
    chargeId: string;
    paid: boolean;
    canceled: boolean;
  };
}

const RefundSection = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage] = useState(5); //Set the number of results per page

  const allInfoReservations = useSelector(
    (state: any) => state.allInfoReservations.allInfoReservations
  );

  // Filter reservations to only include those that have been paid and have a chargeId
  const filteredReservations = allInfoReservations
    .filter(
      (reservation: Reservation) =>
        reservation.content.paid && reservation.content.chargeId
    )
    .filter((reservation: Reservation) =>
      `${reservation.user?.name} ${reservation.user?.surname}`
        .toLowerCase()
        .includes(searchName.toLowerCase())
    );

  // Pagination
  const indexOfLastReservation = currentPage * reservationsPerPage;
  const indexOfFirstReservation = indexOfLastReservation - reservationsPerPage;
  const currentReservations = filteredReservations.slice(
    indexOfFirstReservation,
    indexOfLastReservation
  );

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchAllInfoReservations(dispatch);
  }, []);

  const handleSearchChange = (e: any) => {
    setSearchName(e.target.value);
  };

  const handleRefund = async () => {
    if (selectedReservation) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BE_URL}/payments/refund`,
          {
            _id: selectedReservation._id,
            chargeId: selectedReservation.content.chargeId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Refund successful");
          fetchAllInfoReservations(dispatch);
        } else {
          alert("Refund failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24  md:p-10 bg-white rounded-3xl">
        <AdminHeader category="Page" title="Refund Section" />

        <input
          type="text"
          value={searchName}
          onChange={handleSearchChange}
          placeholder="Search by name"
          className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />

        <table className="w-full mt-5 text-center bg-white border-s-black">
          <thead>
            <tr>
              <th>Name</th>
              <th>Order ID</th>
              <th>Charge ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="refund-table">
            {currentReservations.map((reservation: Reservation) => (
              <tr
                key={reservation._id}
                onClick={() => {
                  if (!reservation.content.canceled) {
                    setSelectedReservation(reservation);
                  }
                }}
                style={{
                  cursor: "pointer",
                  color: reservation.content.canceled ? "white" : "black",
                  backgroundColor: reservation.content.canceled
                    ? "red" // If content.canceled, make the row red.
                    : selectedReservation &&
                      selectedReservation._id === reservation._id
                    ? "lightgrey" // If selected, make it lightgrey.
                    : "white", // Otherwise, keep it white.
                  pointerEvents: reservation.content.canceled
                    ? "none"
                    : undefined, // Disables click events if canceled
                }}
              >
                <td>{`${reservation.user?.name} ${reservation.user?.surname}`}</td>
                <td>{reservation._id}</td>
                <td>{reservation.content.chargeId}</td>
                <td>
                  {!reservation.content.canceled ? "Active" : "Cancelled"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedReservation && (
          <div className="mt-5 text-center">
            <button
              onClick={() => setIsModalOpen(true)} //
              data-modal-target="popup-modal"
              data-modal-toggle="popup-modal"
              className="block bg-red text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
              type="button"
            >
              Process Refund for{" "}
              {`${selectedReservation.user.name} ${selectedReservation.user.surname}`}
            </button>

            <DeleteConfirmationModal
              setIsModalOpen={setIsModalOpen}
              handleFunction={handleRefund}
              isModalOpen={isModalOpen}
            />
          </div>
        )}
      </div>
      <nav className="relative  w-full ">
        <ul className="pagination flex justify-center">
          {Array(Math.ceil(filteredReservations.length / reservationsPerPage))
            .fill(null)
            .map((_, index) => (
              <li key={index} className="mr-3 text-1xl">
                <span
                  onClick={() => paginate(index + 1)}
                  className="cursor-pointer hover:text-currentDay"
                >
                  {index + 1}
                </span>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
};

export default RefundSection;
