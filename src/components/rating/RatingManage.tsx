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
import { ECouponType, ERatingStatus } from "@/types/enums";
import { formatVndPrice } from "@/utils/helpers";
import { StatusBadge } from "../common";
import TableActions from "../common/TableActions";
import TableActionItem from "../common/TableActionItem";
import Pagination from "../common/Pagination";
import { ICoupon } from "@/database/coupon.model";
import Swal from "sweetalert2";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import type { TGetAllRatingResponse } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allValue, ratingList, ratingStatus } from "@/constants";
import Image from "next/image";
import { deleteRating, updateRating } from "@/lib/actions/rating.actions";
import EmptyData from "../common/EmptyData";

function RatingManage({
  ratings,
  totalPages = 1,
  page = 1,
  search,
  status,
}: {
  ratings: TGetAllRatingResponse[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  status: ERatingStatus;
}) {
  const { onSearch, onChangeFilterStatus, onChangePage } = useQueryString();

  const handleDeleteRating = (id: string): void => {
    Swal.fire({
      title: "Bạn có chắc muốn xoá đánh giá này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const isSuccess = await deleteRating(id, "/manage/rating");
        if (isSuccess) toast.success("Xoá đánh giá thành công");
        else toast.error("Xóa đánh giá thất bại!");
      }
    });
  };

  const handleChangeStatus = async (
    ratingId: string,
    status: ERatingStatus
  ) => {
    Swal.fire({
      title: "Bạn có chắc muốn xác nhận đánh giá này không",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await updateRating({
            id: ratingId,
            updateData: {
              status,
            },
            path: "/manage/rating",
          });
          if (res?.success) {
            toast.success("Cập nhật đánh giá thành công");
          }
          onChangeFilterStatus("");
        } catch (error) {}
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý đánh giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm đánh giá..."
              onChange={onSearch}
            />
          </div>
          <Select
            value={status || allValue}
            onValueChange={(value) =>
              onChangeFilterStatus<ERatingStatus | string>(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {ratingStatus.map((option) => (
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
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!ratings?.length && <EmptyData />}
          {!!ratings?.length &&
            ratings?.map((rating) => {
              const foundStatus = ratingStatus.find(
                (rate) => rate.value === rating.status
              );
              const rateIcon = ratingList.find(
                (rate) => rate.value === rating.rate
              )?.icon;
              return (
                <TableRow key={rating._id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <strong>{rating.content}</strong>
                        <Image
                          width={20}
                          height={20}
                          alt=""
                          src={`/rating/${rateIcon}.png`}
                        />
                      </div>
                      <time>
                        {new Date(rating.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/course/${rating.course?.slug}`}
                      className="font-semibold hover:text-primary"
                      target="_blank"
                    >
                      {rating.course?.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{rating.user?.username}</strong>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      item={{
                        className: foundStatus?.className,
                        title: foundStatus?.title!,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TableActions>
                      {rating.status === ERatingStatus.UNACTIVE && (
                        <TableActionItem
                          type="check"
                          onClick={() =>
                            handleChangeStatus(rating._id, ERatingStatus.ACTIVE)
                          }
                        />
                      )}
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteRating(rating._id)}
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

export default RatingManage;
