import React from "react";
import {
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "../icons";
import { commonClassName } from "@/constants";
import Link from "next/link";

type ActionType = "edit" | "delete" | "study" | "view" | "check" | "cancel";
const TableActionItem = ({
  type,
  url,
  onClick,
}: {
  type: ActionType;
  url?: string;
  onClick?: () => void;
}) => {
  const iconType: Record<ActionType, React.ReactNode> = {
    edit: <IconEdit />,
    delete: <IconDelete />,
    study: <IconStudy />,
    view: <IconEye />,
    check: <IconCheck />,
    cancel: <IconCancel />,
  };

  if (url) {
    return (
      <Link href={url} className={commonClassName.action}>
        {iconType[type]}
      </Link>
    );
  }

  return (
    <button className={commonClassName.action} onClick={onClick}>
      {iconType[type]}
    </button>
  );
};

export default TableActionItem;
