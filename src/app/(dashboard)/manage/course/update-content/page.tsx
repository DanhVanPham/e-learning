import Heading from "@/components/common/Heading";
import CourseUpdate from "@/components/course/CourseUpdate";
import CourseUpdateContent from "@/components/course/CourseUpdateContent";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { parseMongoDocToPlainObject } from "@/utils/helpers";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    slug: string;
  };
}) => {
  const { slug } = searchParams;

  const foundCourse = await getCourseBySlug({ slug });

  if (!foundCourse) return notFound();

  return (
    <>
      <Heading className="mb-8">
        Nội dung: <strong className="text-primary">{foundCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={parseMongoDocToPlainObject(foundCourse)} />
    </>
  );
};

export default page;
