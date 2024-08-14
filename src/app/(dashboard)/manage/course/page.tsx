import React from "react";
import CourseManage from "@/components/course/CourseManage";
import { getAllCourses } from "@/lib/actions/course.actions";
import { parseMongoDocToPlainObject } from "@/utils/helpers";

const page = async () => {
  const courses = await getAllCourses();
  return (
    <>
      <CourseManage
        courses={courses ? parseMongoDocToPlainObject(courses) : []}
      />
    </>
  );
};

export default page;
