import { CourseGrid } from "@/components/common";
import Heading from "@/components/common/Heading";
import CourseItem from "@/components/course/CourseItem";
import { getAllCoursesPublic } from "@/lib/actions/course.actions";
import React from "react";

const page = async () => {
  const courses = await getAllCoursesPublic();

  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        {!!courses?.length &&
          courses?.map((course) => (
            <CourseItem key={course._id} data={course} />
          ))}
      </CourseGrid>
    </div>
  );
};

export default page;
