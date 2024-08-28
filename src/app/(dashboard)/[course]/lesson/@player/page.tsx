import React from "react";
import LessonSaveUrl from "../LessonSaveUrl";
import LessonNavigation from "../LessonNavigation";
import Heading from "@/components/common/Heading";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import PageNotFound from "@/app/not-found";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { findAllLessons } from "@/lib/actions/lesson.actions";
import MuxPlayer from "@mux/mux-player-react";
import VideoPlayer from "./VideoPlayer";

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
  const { userId } = auth();
  if (!userId) return <PageNotFound />;

  const foundUser = await getUserInfo({ userId });
  if (!foundUser) return <PageNotFound />;

  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return <PageNotFound />;

  const courseId = findCourse._id.toString();

  if (
    !foundUser.courses.includes(courseId as any)
    // && foundUser.role !== EUserRole.ADMIN
  )
    return <PageNotFound />;

  const lessonList = await findAllLessons({ course: courseId });
  if (!lessonList?.length) return <PageNotFound />;

  const currentLessonIndex = lessonList?.findIndex((l) => l.slug === slug);

  const currentLesson = lessonList?.[currentLessonIndex];

  const lessonDetails = lessonList?.[currentLessonIndex];
  const nextLesson = lessonList?.[currentLessonIndex + 1];
  const prevLesson = lessonList?.[currentLessonIndex - 1];
  const videoId = lessonDetails.video_url?.split("v=")[1];

  return (
    <div>
      <LessonSaveUrl
        url={`/${course}/lesson?slug=${currentLesson.slug}`}
        course={course}
      />
      <div>
        {/* <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={lessonDetails.title}
            allowFullScreen
            className="w-full h-full object-fill"
          ></iframe> */}
        <VideoPlayer
          course={findCourse.slug}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
        />
        <Heading className="mb-10">{lessonDetails.title}</Heading>
        <div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
          <div
            dangerouslySetInnerHTML={{ __html: lessonDetails.content || "" }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
