import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import CommentForm from "./CommentForm";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import PageNotFound from "@/app/not-found";
import { findAllLessons, getLessonBySlug } from "@/lib/actions/lesson.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import { getCommentsByLesson } from "@/lib/actions/comment.actions";
import Image from "next/image";
import { formatDateStr } from "@/constants";
import { formatDate, formatDistanceToNow } from "date-fns";
import CommentItem from "./CommentItem";

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
  if (!userId) return null;

  const foundUser = await getUserInfo({ userId });
  if (!foundUser) return null;

  const course = params.course;
  const slug = searchParams.slug;

  const findCourse = await getCourseBySlug({ slug: course });
  if (!findCourse) return null;

  const lesson = await getLessonBySlug({
    course: findCourse._id.toString(),
    slug,
  });
  if (!lesson) return null;

  const comments = await getCommentsByLesson(lesson._id.toString());

  return (
    <div>
      <CommentForm
        userId={foundUser._id.toString()}
        lessonId={lesson._id.toString()}
      />
      {comments?.length && (
        <div className="flex flex-col gap-6 mt-10">
          <h2 className="text-2xl font-bold">Comments</h2>
          <div className="flex flex-col gap-5">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                userId={foundUser._id.toString()}
                lessonId={lesson._id.toString()}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
