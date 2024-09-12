import React from "react";

const TableActions = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-3">{children}</div>;
};

export default TableActions;
