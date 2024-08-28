"use client";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.model";
import { StudyCoursesProps } from "@/types";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import React from "react";

const StudyCourses = ({
  courses,
}: {
  courses: StudyCoursesProps[] | undefined;
}) => {
  let lastLesson = [];
  if (typeof localStorage !== "undefined") {
    lastLesson = localStorage
      ? JSON.parse(localStorage?.getItem(lastLessonKey) || "[]") || []
      : [];
  }

  return (
    <CourseGrid>
      {!!courses?.length &&
        courses?.map((course) => {
          const url =
            lastLesson.find((el: any) => el.course === course.slug)?.lesson ||
            "";
          const firstLesson = course.lectures[0]?.lessons[0]?.slug;

          return (
            <CourseItem
              key={course._id}
              cta="Tiếp tục học"
              url={url || `/${course.slug}/lesson?slug=${firstLesson}`}
              data={course}
            />
          );
        })}
    </CourseGrid>
  );
};

export default StudyCourses;
