import { commonClassName } from "@/constants";
import React, { ChangeEvent } from "react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight,
} from "../icons";
import { debounce } from "lodash";

interface PaginationProps {
  currPage: number;
  totalPage: number;
  onChangePage: (page: number) => void;
}

const Pagination = ({ currPage, totalPage, onChangePage }: PaginationProps) => {
  const pageNum = Number(currPage);

  const handleInputChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 1 || value > totalPage) return;
    onChangePage(value);
  }, 250);

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      <button
        className={commonClassName.paginationButton}
        disabled={currPage <= 1}
        onClick={() => onChangePage(1)}
      >
        <IconDoubleArrowLeft className="size-4" />
      </button>
      <button
        className={commonClassName.paginationButton}
        disabled={currPage <= 1}
        onClick={() => onChangePage(pageNum - 1)}
      >
        <IconArrowLeft className="size-4" />
      </button>
      <input
        type="number"
        placeholder="1"
        defaultValue={currPage || 1}
        className="w-20 h-10 rounded-full outline-none text-center px-2 font-medium"
        onChange={handleInputChange}
      />
      <button
        className={commonClassName.paginationButton}
        disabled={currPage >= totalPage}
        onClick={() => onChangePage(pageNum + 1)}
      >
        <IconArrowRight className="size-4" />
      </button>
      <button
        className={commonClassName.paginationButton}
        disabled={currPage >= totalPage}
        onClick={() => onChangePage(Number(totalPage))}
      >
        <IconDoubleArrowRight className="size-4" />
      </button>
    </div>
  );
};

export default Pagination;
