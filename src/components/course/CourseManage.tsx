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
import { commonClassName, courseLevel, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDelete,
  IconEdit,
  IconEye,
  IconStudy,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
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
import { StatusBadge } from "../common";
import useQueryString from "@/app/hooks/useQueryString";

function CourseManage({
  courses,
  totalPages = 1,
  page = 1,
  search,
  status,
}: {
  courses: ICourse[] | undefined;
  totalPages?: number;
  page: number;
  search: string;
  status: ECourseStatus;
}) {
  const { createQueryString, router, pathname } = useQueryString();

  const handleDeleteCourse = (slug: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status: ECourseStatus.PENDING,
            _destroy: true,
          },
          path: "/manage/course",
        });
        toast.success("Xoá khóa học thành công");
      }
    });
  };

  const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
    Swal.fire({
      title: "Bạn có chắc muốn đổi trạng thái không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cập nhật",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateCourse({
          slug,
          updateData: {
            status:
              status === ECourseStatus.PENDING
                ? ECourseStatus.APPROVED
                : ECourseStatus.PENDING,
            _destroy: false,
          },
          path: "/manage/course",
        });
        toast.success("Cập nhật trạng thái thành công");
        router.push(`${pathname}?${createQueryString("status", "")}`);
      }
    });
  };

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

  return (
    <div>
      <Link
        href="/manage/course/new"
        className="size-10 rounded-full bg-primary flexCenter text-white  fixed right-5 bottom-5 hover:animate-spin"
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
        <Heading>Quản lý khóa học</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input
              defaultValue={search || ""}
              placeholder="Tìm kiếm khóa học..."
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
                {courseStatus.map((option) => (
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
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!courses?.length &&
            courses?.map((course) => {
              const foundCourseStatus = courseStatus.find(
                (status) => status.value === course.status
              );
              return (
                <TableRow key={course._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        alt="image course"
                        src={course.image}
                        width={40}
                        height={40}
                        className="flex-shrink-0 size-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
                          {course.title}
                        </h3>
                        <h4 className="text-slate-500 text-xs lg:text-sm">
                          {new Date(course.created_at).toLocaleDateString(
                            "vi-VI"
                          )}
                        </h4>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-sm lg:text-base">
                      {formatVndPrice(Number(course.price))}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      item={{
                        className: foundCourseStatus?.className,
                        title: foundCourseStatus?.title || "",
                      }}
                      onClick={() =>
                        handleChangeStatus(course.slug, course.status)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Link
                        href={`/manage/course/update-content?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconStudy />
                      </Link>
                      <Link
                        href={`/course/${course.slug}`}
                        target="_blank"
                        className={commonClassName.action}
                      >
                        <IconEye />
                      </Link>
                      <Link
                        href={`/manage/course/update?slug=${course.slug}`}
                        className={commonClassName.action}
                      >
                        <IconEdit />
                      </Link>
                      <button
                        className={commonClassName.action}
                        onClick={() => handleDeleteCourse(course.slug)}
                      >
                        <IconDelete />
                      </button>
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

export default CourseManage;
