import React from "react";
import {
  FaRegCalendarAlt,
  FaRegMoneyBillAlt,
  FaRegUser,
  FaRegCheckSquare,
  FaRegListAlt,
  FaRegClock,
  FaRegTimesCircle,
  FaRegFileAlt,
} from "react-icons/fa";
import { format } from "date-fns";
import { ReservationWhole } from "../../types and interfaces";
interface UserReservationCardProps {
  reservations: ReservationWhole[];
}

const UserReservationCard: React.FC<UserReservationCardProps> = ({
  reservations,
}) => {
  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMMM dd, yyyy");
  };
  return (
    <>
      {reservations.map((reservation: any, index: number) => (
        <div key={index} className="p-4 bg-white shadow-lg rounded-lg flex">
          {reservation.content?.offer?.image && (
            <div className="mb-4">
              <img
                className="w-full h-32 object-cover rounded-t-lg"
                src={reservation.content.offer.image}
                alt="Room"
              />
              <h3 className="text-lg font-semibold mb-2 mt-2 text-center">
                {reservation.content?.offer?.name || "Default Room"}
              </h3>
            </div>
          )}
          <div className="p-4 flex flex-wrap">
            {[
              {
                icon: <FaRegUser className="mr-1" />,
                label: "Name",
                value: `${reservation.user?.name || "Default Name"} ${
                  reservation.user?.surname || "Default Surname"
                }`,
              },
              {
                icon: <FaRegMoneyBillAlt className="mr-1" />,
                label: "Payment",
                value: `€${reservation.content?.cost || 0}`,
              },
              {
                icon: <FaRegCheckSquare className="mr-1" />,
                label: "Paid",
                value: reservation.content?.paid ? "Yes" : "No",
              },

              {
                icon: <FaRegListAlt className="mr-1" />,
                label: "Order Nr",
                value: reservation._id,
              },
              {
                icon: <FaRegTimesCircle className="mr-1" />,
                label: "Status",
                value: reservation.content?.cancelled ? "Cancelled" : "Active",
              },
              {
                icon: <FaRegCalendarAlt className="mr-1" />,
                label: "Check in",
                value: reservation.content?.checkin
                  ? formatDate(reservation.content.checkin) + " from 12:00"
                  : "Default Checkin",
              },
              {
                icon: <FaRegFileAlt className="mr-1" />,
                label: "Receipt",
                value: (
                  <a
                    href={reservation.content?.receiptUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Show
                  </a>
                ),
              },

              {
                icon: <FaRegClock className="mr-1" />,
                label: "Check out",
                value: reservation.content?.checkout
                  ? formatDate(reservation.content.checkout) + " till 10:00"
                  : "Default Checkout",
              },
            ].map(({ icon, label, value }, index) => (
              <div
                key={index}
                className="mb-2 text-sm text-gray-600 flex items-center w-1/2"
              >
                {icon}
                <strong className="mr-1">{label}: </strong>
                {value}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default UserReservationCard;
