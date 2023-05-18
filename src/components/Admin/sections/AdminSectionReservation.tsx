import React, { useEffect, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ordersData, ordersGrid } from "../data/adminData";
import AdminHeader from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInfoReservations } from "../data/adminFetching";
import { ReservationSave } from "../../../types and interfaces/index";
import axios from "axios";

export const contextMenuItems: string[] = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

const AdminSectionReservation = () => {
  const [gridData, setGridData] = useState([]);
  const dispatch = useDispatch();
  const allInfoReservations = useSelector(
    (state: any) => state.allInfoReservations.allInfoReservations
  );
  useEffect(() => {
    fetchAllInfoReservations(dispatch);
    console.log("info", allInfoReservations);
  }, []);
  useEffect(() => {
    if (allInfoReservations) {
      const mappedData = allInfoReservations.map((reservation: any) => {
        // Determine status of reservation
        let status;
        const now = new Date();
        const checkIn = new Date(reservation.content?.checkin);
        const checkOut = new Date(reservation.content?.checkout);

        if (now < checkIn) status = "Future";
        else if (now > checkOut) status = "Past";
        else status = "Active";

        return {
          Room: reservation.content?.offer?.name || "Default Room",
          CustomerName: `${reservation.user?.name || "Default Name"} ${
            reservation.user?.surname || "Default Surname"
          }`,
          TotalAmount: reservation.content?.cost || 0,
          Paid: reservation.content?.paid ? "Yes" : "No",
          ReceiptUrl: reservation.content?.receiptUrl || "No Receipt",
          OrderID: reservation._id,
          checkIn: reservation.content?.checkin || "Default Checkin",
          checkOut: reservation.content?.checkout || "Default Checkout",
          Status: status,
        };
      });
      setGridData(mappedData);
    }
  }, [allInfoReservations]);
  // checkIn: format(checkIn, "dd/MM/yyyy") || "Default Checkin",
  // checkOut: format(checkOut, "dd/MM/yyyy") || "Default Checkin",

  const editing = { allowDeleting: true, allowEditing: true };
  const paidTemplate = (args: any) => {
    if (args.column.field === "Paid") {
      if (args.cell.textContent === "Yes") {
        args.cell.style.backgroundColor = "lightgreen";
      } else {
        args.cell.style.backgroundColor = "red";
      }
    }
    if (args.column.field === "Status") {
      if (args.cell.textContent === "Active") {
        args.cell.style.backgroundColor = "lightgreen";
      } else if (args.cell.textContent === "Past") {
        args.cell.style.backgroundColor = "purple";
      } else if (args.cell.textContent === "Future") {
        args.cell.style.backgroundColor = "#FFE677";
      }
    }
  };

  const handleDateFilter = () => {
    const startDate = new Date(
      (document.getElementById("start-date") as HTMLInputElement).value
    );
    const endDate = new Date(
      (document.getElementById("end-date") as HTMLInputElement).value
    );

    const filteredData = gridData.filter((reservation: any) => {
      const checkIn = new Date(reservation.checkIn);
      const checkOut = new Date(reservation.checkOut);
      return (
        (checkIn >= startDate && checkIn <= endDate) ||
        (checkOut >= startDate && checkOut <= endDate)
      );
    });

    setGridData(filteredData);
  };

  const handleSave = async (args: any) => {
    console.log(args, args.data);

    const updatedReservation = args.data;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BE_URL}/reservations/${updatedReservation.OrderID}`,
        updatedReservation
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <AdminHeader category="Page" title="Reservations" />
      <div className="date-filter mb-2 flex justify-end">
        <label>Start Date: </label>
        <input
          className="mr-10"
          type="date"
          id="start-date"
          name="start-date"
        />
        <label>End Date: </label>
        <input type="date" id="end-date" name="end-date" />
        <button
          className="ml-10 bg-currentDay px-3 rounded-sm text-white cursor-pointer hover:scale-105"
          onClick={handleDateFilter}
        >
          Filter
        </button>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={gridData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems as any}
        editSettings={editing}
        queryCellInfo={paidTemplate}
        actionComplete={handleSave}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default AdminSectionReservation;
