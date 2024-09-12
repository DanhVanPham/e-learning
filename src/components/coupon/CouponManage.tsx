"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import { commonClassName } from "@/constants";
import { IconArrowLeft, IconArrowRight } from "../icons";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";
import { debounce } from "lodash";
import type { TGetAllOrderResponse } from "@/types";
import useQueryString from "@/app/hooks/useQueryString";
import Link from "next/link";

function CouponManage({
  coupons,
  totalPages = 1,
  page = 1,
  search,
}: {
  coupons: TGetAllOrderResponse[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
}) {
  const { createQueryString, router, pathname } = useQueryString();

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  }, 500);

  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    let currPage = Number(page);
    if (type === "prev") currPage -= 1;
    if (type === "next") currPage += 1;

    router.push(
      `${pathname}?${createQueryString("page", currPage.toString())}`
    );
  };

  return (
    <div>
      <Link
        href="/manage/coupon/new"
        className="size-10 rounded-full bg-primary flexCenter text-white fixed right-5 bottom-5 hover:animate-spin"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </Link>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý mã giảm giá</Heading>
        <div className="w-full lg:w-[300px]">
          <Input
            defaultValue={search || ""}
            placeholder="Tìm kiếm coupon..."
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã </TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button
          className={commonClassName.paginationButton}
          disabled={page <= 1}
          onClick={() => handleChangePage("prev")}
        >
          <IconArrowLeft />
        </button>
        <button
          className={commonClassName.paginationButton}
          disabled={page >= totalPages}
          onClick={() => handleChangePage("next")}
        >
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

export default CouponManage;
