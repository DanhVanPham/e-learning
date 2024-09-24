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
import { ECommentStatus, ECouponType, ERatingStatus } from "@/types/enums";
import { formatVndPrice } from "@/utils/helpers";
import { StatusBadge } from "../common";
import TableActions from "../common/TableActions";
import TableActionItem from "../common/TableActionItem";
import Pagination from "../common/Pagination";
import { ICoupon } from "@/database/coupon.model";
import Swal from "sweetalert2";
import { deleteCoupon } from "@/lib/actions/coupon.actions";
import { toast } from "react-toastify";
import type { TCommentItemManage, TGetAllRatingResponse } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { allValue, commentStatus, ratingList, ratingStatus } from "@/constants";
import Image from "next/image";
import { deleteRating, updateRating } from "@/lib/actions/rating.actions";
import EmptyData from "../common/EmptyData";
import { deleteComment, updateComment } from "@/lib/actions/comment.actions";

function RatingManage({
  comments,
  totalPages = 1,
  page = 1,
  search,
  status,
}: {
  comments: TCommentItemManage[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  status: ECommentStatus;
}) {
  const { onSearch, onChangeFilterStatus, onChangePage } = useQueryString();

  const handleDeleteComment = (id: string): void => {
    Swal.fire({
      title: "Bạn có chắc muốn xoá bình luận này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Thoát",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const isSuccess = await deleteComment(id, "/manage/comment");
        if (isSuccess) toast.success("Xoá bình luận thành công");
        else toast.error("Xóa bình luận thất bại!");
      }
    });
  };

  const handleChangeStatus = async (
    commentId: string,
    status: ECommentStatus
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
          const res = await updateComment({
            id: commentId,
            updateData: {
              status,
            },
            path: "/manage/comment",
          });
          if (res?.success) {
            toast.success("Cập nhật đánh giá thành công");
          } else {
            toast.error("Cập nhật đánh giá tthất bại!");
          }
          onChangeFilterStatus("");
        } catch (error) {
          toast.error("Cập nhật đánh giá tthất bại!");
        }
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading>Quản lý bình luận</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm bình luận..."
              onChange={onSearch}
            />
          </div>
          <Select
            defaultValue={status || allValue}
            onValueChange={(value) =>
              onChangeFilterStatus<ECommentStatus | string>(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={allValue}>Tất cả</SelectItem>
                {commentStatus.map((option) => (
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
            <TableHead>Nội dung</TableHead>
            <TableHead>Khóa học</TableHead>
            <TableHead>Thành viên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!comments?.length && <EmptyData />}
          {!!comments?.length &&
            comments?.map((comment) => {
              const foundStatus = commentStatus.find(
                (cmt) => cmt.value === comment.status
              );
              return (
                <TableRow key={comment._id}>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <strong>{comment.content}</strong>
                      <time>
                        {new Date(comment.created_at).toLocaleDateString(
                          "vi-VI"
                        )}
                      </time>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/course/${comment.lesson?.course?.slug}`}
                      className="font-semibold hover:text-primary"
                      target="_blank"
                    >
                      {comment.lesson?.course?.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <strong>{comment.user?.username}</strong>
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
                      {comment.status === ECommentStatus.PENDING && (
                        <TableActionItem
                          type="check"
                          onClick={() =>
                            handleChangeStatus(
                              comment._id,
                              ECommentStatus.APPROVED
                            )
                          }
                        />
                      )}
                      <TableActionItem
                        type="delete"
                        onClick={() => handleDeleteComment(comment._id)}
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
