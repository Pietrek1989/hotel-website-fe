import React, { useEffect, useState } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import axios from "axios";

import { customersGrid } from "../data/adminData";
import AdminHeader from "../AdminHeader";

const AdminSectionCustomers = () => {
  const toolbarOptions = ["Search"];
  const [currentMode, setCurrentMode] = useState("Light");

  const editing = { allowDeleting: true, allowEditing: true };

  const [usersData, setUsersData] = useState([]);

  const apiUrl = process.env.REACT_APP_BE_URL;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const updatedData = response.data.map((user: any) => ({
        ...user,
        fullName: `${user.name} ${user.surname}`,
      }));

      setUsersData(updatedData);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeMode) {
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <AdminHeader category="Page" title="Customers" />
      <GridComponent
        dataSource={usersData}
        width="auto"
        allowPaging
        allowSorting
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default AdminSectionCustomers;
