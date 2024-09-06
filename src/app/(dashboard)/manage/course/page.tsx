import React from "react";
import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { ECourseStatus } from "@/types/enums";
import PageNotFound from "@/app/not-found";

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
    limit: 5,
    search: search || "",
    status: status,
  });

  return (
    <>
      <CourseManage
        page={page}
        search={search}
        status={status}
        courses={paginationData?.items}
        totalPages={paginationData?.totalPages}
      />
    </>
  );
};

export default page;
