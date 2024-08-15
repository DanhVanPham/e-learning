import PageNotFound from "@/app/not-found";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.actions";
import { useRouter } from "next/navigation";
import React from "react";
import LessonNavigation from "./LessonNavigation";

const page = async ({
  params,
  searchParams,
}: {
  params: {
    course: string;
  };
  searchParams: {
    slug: string;
  };
}) => {
  console.log(params, searchParams);
  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return <PageNotFound />;

  const courseId = findCourse._id.toString();
  const findLesson = await getLessonBySlug({
    slug,
    course: courseId,
  });

  const lessonList = await findAllLessons({ course: courseId });

  if (!findLesson) return <PageNotFound />;

  const currentLessonIndex =
    lessonList?.findIndex((l) => l.slug === findLesson.slug) || -1;

  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = findLesson.video_url?.split("v=")[1];
  console.log(nextLesson, prevLesson);
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={findLesson.title}
            allowFullScreen
            className="w-full h-full object-fill"
          ></iframe>
        </div>
        <div className="flex items-center justify-between">
          <LessonNavigation
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            course={courseId}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
