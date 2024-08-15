import PageNotFound from "@/app/not-found";
import { IconPlay, IconStudy, IconUsers } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle, courseStatusTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
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
import { ILecture } from "@/database/lecture.model";
import { ICourseUpdateLecture, TCourseUpdateParams } from "@/types";
import LectureItem from "@/components/lecture/LectureItem";

const page = async ({ params }: { params: { slug: string } }) => {
  const data = await getCourseBySlug({
    slug: params.slug,
  });

  if (!data) return notFound();
  if (data.status !== ECourseStatus.APPROVED) return <PageNotFound />;

  const videoId = data.intro_url?.split("v=")[1];
  const lectures = data.lectures;

  return (
    <div className="grid lg:grid-cols-[2fr,1fr] gap-10 min-h-screen">
      <div>
        <div className="relative mb-5 aspect-video">
          {data.intro_url ? (
            <>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="object-fill w-full h-full"
              ></iframe>
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
        <h1 className="mb-5 text-3xl font-bold">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal">{data.description}</div>
        </BoxSection>
        <BoxSection title="Thông tin">
          <div className="grid grid-cols-4 gap-5 ">
            <BoxInfo title="Bài học">100</BoxInfo>
            <BoxInfo title="Lượt xem">
              {formatThousandSeperator(data.views)}
            </BoxInfo>
            <BoxInfo title="Trình độ">
              {courseLevelTitle[data.level] || ""}
            </BoxInfo>
            <BoxInfo title="Thời lượng">100h48ph</BoxInfo>
          </div>
        </BoxSection>
        <BoxSection title="Nội dung khóa học">
          <div className="flex flex-col gap-4">
            {!!lectures.length &&
              lectures.map((lecture: ICourseUpdateLecture) => (
                <LectureItem key={lecture._id.toString()} data={lecture} />
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
            <div className="flex flex-col gap-4">
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
      <div>
        <div className="p-5 bg-white rounded-lg ">
          <div className="flex items-center gap-2 mb-3">
            <strong className="text-xl font-bold text-primary">
              {formatVndPrice(Number(data.price))}
            </strong>
            <span className="text-sm line-through text-slate-500">
              {formatVndPrice(Number(data.sale_price))}
            </span>
            <span className="inline-block px-3 py-1 ml-auto text-sm font-semibold rounded-lg text-primary bg-primary bg-opacity-10">
              {data.price &&
                data.sale_price &&
                `${Math.round((data.price / data.sale_price) * 100)}%`}
            </span>
          </div>
          <h3 className="mb-3 text-sm font-bold">Khóa học gồm có:</h3>
          <ul className="flex flex-col gap-2 mb-5 text-sm text-slate-500">
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>30h học</span>
            </li>
            <li className="flex items-center gap-2">
              <IconPlay className="size-4" />
              <span>Video Full HD</span>
            </li>
            <li className="flex items-center gap-2">
              <IconUsers className="size-4" />
              <span>Có nhóm hỗ trợ</span>
            </li>
            <li className="flex items-center gap-2">
              <IconStudy className="size-4" />
              <span>Tài liệu kèm theo</span>
            </li>
          </ul>
          <Button variant="primary" className="w-full">
            Mua khóa học
          </Button>
        </div>
      </div>
    </div>
  );
};

function BoxInfo({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-white rounded-lg">
      <h4 className="text-sm text-slate-400">{title}</h4>
      <h3 className="font-bold">{children}</h3>
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
