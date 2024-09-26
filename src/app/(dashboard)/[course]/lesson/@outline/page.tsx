import PageNotFound from "@/app/not-found";
import LectureItem from "@/components/lecture/LectureItem";
import LessonItem from "@/components/lesson/LessonItem";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getHistories } from "@/lib/actions/history.actions";
import { normalizeData } from "@/utils/helpers";
import React from "react";

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
  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return <PageNotFound />;

  const histories = await getHistories({ course: findCourse._id });

  const normalizedHistories = normalizeData(histories, "lesson");

  const lectures = findCourse.lectures;
  const totalLesson = lectures.reduce(
    (result, curr) => result + curr.lessons.length,
    0
  );
  const completedProgress =
    totalLesson && histories?.length
      ? Math.round(((histories?.length || 0) / totalLesson) * 100)
      : 0;

  return (
    <div className="xl:sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
      <div className="hidden lg:flex items-center gap-3 mb-5">
        <div className="p-0.5 w-full rounded-full bgDarkMode border borderDarkMode flex items-center">
          <div
            className="h-2 rounded-full transition-all gradient-background animate-gradient bg-[length:400%_400%]"
            style={{
              width: `${completedProgress}%`,
            }}
          ></div>
        </div>
        <span className="font-bold text-xs flex-shrink-0">
          {completedProgress}%
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {!!lectures.length &&
          lectures.map((lecture) => {
            const isIncludeCurrLesson = lecture.lessons.some(
              (lesson) => lesson.slug === slug
            );
            return (
              <LectureItem
                key={lecture._id.toString()}
                data={lecture}
                defaultOpen={isIncludeCurrLesson}
              >
                <div className="flex flex-col gap-3 mt-5">
                  {lecture.lessons.map((lesson) => (
                    <LessonItem
                      key={lesson._id.toString()}
                      data={lesson}
                      currentLesson={slug}
                      url={`/${findCourse.slug}/lesson?slug=${lesson.slug}`}
                      isChecked={!!normalizedHistories?.[lesson._id.toString()]}
                    />
                  ))}
                </div>
              </LectureItem>
            );
          })}
      </div>
    </div>
  );
};

export default page;
