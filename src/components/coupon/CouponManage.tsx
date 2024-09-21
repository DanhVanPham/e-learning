"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";
import { debounce } from "lodash";
import useQueryString from "@/app/hooks/useQueryString";
import Link from "next/link";
import { ECouponType } from "@/types/enums";
import { formatVndPrice } from "@/utils/helpers";
import { StatusBadge } from "../common";
import TableActions from "../common/TableActions";
import TableActionItem from "../common/TableActionItem";
import Pagination from "../common/Pagination";
import { ICoupon } from "@/database/coupon.model";
import Swal from "sweetalert2";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allValue } from "@/constants";
import EmptyData from "../common/EmptyData";

function CouponManage({
  coupons,
  totalPages = 1,
  page = 1,
  search,
}: {
  coupons: ICoupon[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
}) {
  const { onChangePage, onSearch, onChangeQs } = useQueryString();

  const handleDeleteCoupon = (id: string): void => {
    Swal.fire({
      title: "Bạn có chắc muốn xoá mã giảm giá này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const isSuccess = await deleteCoupon(id, "/manage/coupon");
        if (isSuccess) toast.success("Xoá mã giảm giá thành công");
        else toast.error("Xóa mã giảm giá thất bại!");
      }
    });
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
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm coupon..."
              onChange={onSearch}
            />
          </div>
          <Select
            defaultValue={allValue}
            onValueChange={(value) => onChangeQs("active", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {[
                  {
                    title: "Đang kích hoạt",
                    value: 1,
                  },
                  {
                    title: "Chưa kích hoạt",
                    value: 0,
                  },
                ].map((opt) => (
                  <SelectItem key={opt.title} value={`${opt.value}`}>
                    {opt.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <TableBody>
          {!coupons?.length && <EmptyData />}
          {!!coupons?.length &&
            coupons?.map((coupon) => {
              return (
                <TableRow key={coupon._id}>
                  <TableCell>
                    <strong>{coupon.code}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{coupon.title}</strong>
                  </TableCell>
                  <TableCell>
                    {coupon.type === ECouponType.AMOUNT ? (
                      <>{formatVndPrice(Number(coupon.value))}</>
                    ) : (
                      <>{coupon.value}%</>
                    )}
                  </TableCell>
                  <TableCell>
                    {coupon.used || 0} / {coupon.limit}
                  </TableCell>
                  <TableCell>
                    {coupon.active ? (
                      <StatusBadge
                        item={{
                          className: "text-green-500 bg-green-500",
                          title: "Đang kích hoạt",
                        }}
                      />
                    ) : (
                      <StatusBadge
                        item={{
                          className: "text-red-500 bg-red-500",
                          title: "Chưa kích hoạt",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <TableActions>
                      <TableActionItem
                        type="edit"
                        url={`/manage/coupon/update?code=${coupon.code}`}
                      />
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteCoupon(coupon._id)}
                      />
                    </TableActions>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <Pagination
        currPage={page}
        totalPage={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
}

export default CouponManage;
