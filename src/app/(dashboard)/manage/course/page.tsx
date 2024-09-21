import React from "react";
import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { ECourseStatus } from "@/types/enums";
import PageNotFound from "@/app/not-found";
import { ITEMS_PER_PAGE } from "@/constants";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECourseStatus;
  };
}) => {
  const { page, search, status } = searchParams;

  const paginationData = await getAllCourses({
    page: page,
    limit: ITEMS_PER_PAGE,
    search: search || "",
    status: status,
  });

  const currPage = Number(page) || 1;

  return (
    <>
      <CourseManage
        page={currPage}
        search={search}
        status={status}
        courses={paginationData?.items}
        totalPages={paginationData?.totalPages}
      />
    </>
  );
};

export default page;
