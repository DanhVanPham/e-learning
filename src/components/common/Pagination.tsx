import { commonClassName } from "@/constants";
import React from "react";
import { IconArrowLeft, IconArrowRight } from "../icons";

const Pagination = ({
  currPage,
  totalPage,
  onChangePrev,
  onChangeNext,
}: {
  currPage: number;
  totalPage: number;
  onChangePrev: () => void;
  onChangeNext: () => void;
}) => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button
        className={commonClassName.paginationButton}
        disabled={currPage <= 1}
        onClick={() => onChangePrev()}
      >
        <IconArrowLeft />
      </button>
      <button
        className={commonClassName.paginationButton}
        disabled={currPage >= totalPage}
        onClick={() => onChangeNext()}
      >
        <IconArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
