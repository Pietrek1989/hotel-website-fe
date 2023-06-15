import React, { FunctionComponent } from "react";

interface AdminHeaderProps {
  category: string;
  title: string;
}
const AdminHeader: FunctionComponent<AdminHeaderProps> = ({
  category,
  title,
}) => (
  <div className=" mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-bold ">{title}</p>
  </div>
);

export default AdminHeader;
