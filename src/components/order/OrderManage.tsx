"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseLevel, orderStatus } from "@/constants";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCancel,
  IconCheck,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "../icons";
import Link from "next/link";
import Swal from "sweetalert2";
import { EOrderStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { formatVndPrice } from "@/utils/helpers";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChangeEvent, useCallback, useState } from "react";
import { debounce } from "lodash";
import { IOrder } from "@/database/order.model";
import type { TGetAllOrderResponse } from "@/types";
import { updateOrderStatus } from "@/lib/actions/order.actions";
import { StatusBadge } from "../common";
import useQueryString from "@/app/hooks/useQueryString";

function OrderManage({
  orders,
  totalPages = 1,
  page = 1,
  search,
  status,
}: {
  orders: TGetAllOrderResponse[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  status: EOrderStatus;
}) {
  const { createQueryString, router, pathname } = useQueryString();

  const handleSearchCourse = debounce((e: ChangeEvent<HTMLInputElement>) => {
    router.push(`${pathname}?${createQueryString("search", e.target.value)}`);
  }, 500);

  const changeFilterStatus = (value: string) => {
    router.push(`${pathname}?${createQueryString("status", value)}`);
  };

  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev" && page === 1) return;
    let currPage = Number(page);
    if (type === "prev") currPage -= 1;
    if (type === "next") currPage += 1;

    router.push(
      `${pathname}?${createQueryString("page", currPage.toString())}`
    );
  };

  const handleChangeStatus = async (orderId: string, status: EOrderStatus) => {
    const isCanceling = status === EOrderStatus.CANCELED;
    Swal.fire({
      title: isCanceling
        ? "Bạn có chắc muốn hủy đơn hàng này không?"
        : "Bạn có chắc muốn xác nhận đơn hàng này không",
      icon: isCanceling ? "warning" : "question",
      showCancelButton: true,
      confirmButtonText: isCanceling ? "Đồng ý" : "Cập nhật",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateOrderStatus({
            orderId,
            status,
            path: "/manage/order",
          });
          if (res?.success) {
            toast.success("Cập nhật đơn hàng thành công");
          }
          router.push(`${pathname}?${createQueryString("status", "")}`);
        } catch (error) {}
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đơn hàng</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm đơn hàng..."
              onChange={(e) => handleSearchCourse(e)}
            />
          </div>
          <Select
            defaultValue={status || ""}
            onValueChange={changeFilterStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {orderStatus.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.title}
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
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Số tiền</TableHead>
            <TableHead>Mã giảm giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!orders?.length &&
            orders?.map((order) => {
              const foundOrderStatus = orderStatus.find(
                (status) => status.value === order.status
              );
              return (
                <TableRow key={order._id}>
                  <TableCell>
                    <strong>{order.code}</strong>
                  </TableCell>
                  <TableCell>{order.course.title}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <span>{formatVndPrice(order.amount)}</span>
                      {order.discount > 0 && (
                        <span>{formatVndPrice(order.discount)}</span>
                      )}
                      <span
                        className={cn(
                          foundOrderStatus?.className,
                          "bg-inherit"
                        )}
                      >
                        {formatVndPrice(order.total)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <StatusBadge
                      item={{
                        className: foundOrderStatus?.className,
                        title: foundOrderStatus?.title || "",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      {order.status === EOrderStatus.PENDING && (
                        <button
                          type="button"
                          className={commonClassName.action}
                          onClick={() =>
                            handleChangeStatus(
                              order._id,
                              EOrderStatus.COMPLETED
                            )
                          }
                        >
                          <IconCheck />
                        </button>
                      )}
                      {order.status !== EOrderStatus.CANCELED && (
                        <button
                          type="button"
                          className={commonClassName.action}
                          onClick={() =>
                            handleChangeStatus(order._id, EOrderStatus.CANCELED)
                          }
                        >
                          <IconCancel />
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
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

export default OrderManage;
