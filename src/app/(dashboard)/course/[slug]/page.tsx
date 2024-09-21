import PageNotFound from "@/app/not-found";
import {
  IconChart,
  IconClock,
  IconEye,
  IconPlay,
  IconStar,
  IconStarFill,
  IconStudy,
  IconUsers,
} from "@/components/icons";
import { commonClassName, courseLevelTitle } from "@/constants";
import {
  getAllMyCourses,
  getCourseBySlug,
  getCourseLessonDuration,
  updateCourseView,
} from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  formatThousandSeperator,
  formatVndPrice,
  parseMongoDocToPlainObject,
} from "@/utils/helpers";
import { ICourseUpdateLecture } from "@/types";
import LectureItem from "@/components/lecture/LectureItem";
import LessonItem from "@/components/lesson/LessonItem";
import MuxPlayer from "@mux/mux-player-react";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import ButtonEnroll from "./ButtonEnroll";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { cn, formatViewToK, parseMinutesToHours } from "@/lib/utils";
import CourseWidget from "./CourseWidget";
import AlreadyEnroll from "./AlreadyEnroll";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({
    slug: params.slug,
  });

  if (!data) return notFound();
  await updateCourseView({ slug: params.slug });
  const duration = await getCourseLessonDuration({ slug: params.slug });

  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;

  const { userId } = auth();
  const foundUser = await getUserInfo({ userId: userId || "" });

  const videoId = data.intro_url?.split("v=")[1];
  const lectures = data.lectures;

  const numLessons =
    lectures?.reduce((result, currLec) => {
      return result + currLec?.lessons?.length || 0;
    }, 0) || 0;
  const alreadyBuyCourse =
    foundUser?.courses?.find(
      (courseId) => String(courseId) === String(data._id)
    ) ?? false;
  const ratings = data.rating?.map((r: any) => r.content);
  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen items-start">
      <div>
        <div className="relative mb-5 aspect-video">
          {data.intro_url ? (
            <>
              {/* <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe> */}
              <MuxPlayer
                streamType="on-demand"
                playbackId="MrHpFNCJhaO5jvC1IQBM4iSij2moMmohJ6TeoeUNSzw"
                metadataVideoTitle="Placeholder (optional)"
                metadataViewerUserId="Placeholder (optional)"
                primaryColor="#FFFFFF"
                secondaryColor="#000000"
                className="object-fill w-full h-full"
              />
            </>
          ) : (
            <Image
              src={data.image}
              alt="course image"
              fill
              className="object-cover w-full h-full rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {ratings?.map((rating, index) => (
            <div
              key={index}
              className="rounded-full p-2 px-4 text-sm font-semibold text-white bg-gradient-to-tr from-primary to-secondary"
            >
              {rating}
            </div>
          ))}
        </div>
        <h1 className="mb-5 text-3xl font-bold">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.description}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 ">
            <BoxInfo title="Bài học" icon={<IconPlay className="size-4" />}>
              {numLessons}
            </BoxInfo>
            <BoxInfo title="Lượt xem" icon={<IconEye className="size-4" />}>
              {formatViewToK(data.views)}
            </BoxInfo>
            <BoxInfo title="Trình độ" icon={<IconChart className="size-4" />}>
              {courseLevelTitle[data.level] || ""}
            </BoxInfo>
            <BoxInfo title="Thời lượng" icon={<IconClock className="size-4" />}>
              {parseMinutesToHours(duration || 0)}
            </BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <div className="flex flex-col gap-5">
            {!!lectures.length &&
              lectures.map((lecture: ICourseUpdateLecture) => (
                <LectureItem key={lecture._id.toString()} data={lecture}>
                  <div className="flex flex-col gap-3 mt-5">
                    {lecture.lessons.map((lesson) => (
                      <LessonItem
                        key={lesson._id.toString()}
                        data={parseMongoDocToPlainObject(lesson)}
                      />
                    ))}
                  </div>
                </LectureItem>
              ))}
          </div>
        </BoxSection>
        <BoxSection title="Yêu cầu">
          <div className="leading-normal">
            {data.info.requirements.map((r, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center flex-shrink-0 p-1 text-white rounded size-5 bg-primary ">
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{r}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Lợi ích">
          <div className="leading-normal">
            {data.info.benefits.map((b, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-3">
                <span className="flex items-center justify-center flex-shrink-0 p-1 text-white rounded size-5 bg-primary ">
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </BoxSection>
        <BoxSection title="Q&A">
          <div className="leading-normal">
            <div className="flex flex-col gap-5">
              {data.info.qa.map((qa, idx) => (
                <Accordion key={idx} type="single" collapsible>
                  <AccordionItem value={qa.question}>
                    <AccordionTrigger>{qa.question}</AccordionTrigger>
                    <AccordionContent>{qa.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </div>
        </BoxSection>
      </div>
      <div className="sticky top-5 right-0">
        {!alreadyBuyCourse && (
          <CourseWidget
            course={data}
            foundUser={foundUser}
            duration={duration}
          />
        )}
        {!!alreadyBuyCourse && <AlreadyEnroll user={foundUser} />}
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-white rounded-lg">
      <h4 className="text-sm text-slate-400 font-medium">{title}</h4>
      <div className="flex items-center gap-1 font-semibold text-sm">
        {icon}
        <span>{children}</span>
      </div>
    </div>
  );
}

function BoxSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h4 className="mb-5 text-xl font-bold">{title}</h4>
      <div className="mb-10">{children}</div>
    </>
  );
}

export default page;
