import React from "react";
import { TableCell, TableRow } from "../ui/table";

const EmptyData = ({ text = "Không có dữ liệu" }: { text?: string }) => {
  return (
    <TableRow>
      <TableCell colSpan={99}>
        <div className="flex items-center justify-center text-center h-20">
          {text}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyData;
