"use client";
import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ILesson } from "@/database/lesson.model";
import { useRouter } from "next/navigation";
import React from "react";

const LessonNavigation = ({
  nextLesson,
  prevLesson,
  course,
}: {
  nextLesson: ILesson;
  prevLesson: ILesson;
  course: string;
}) => {
  const router = useRouter();
  return (
    <div className="flex gap-3">
      <Button
        className="size-10 p-3"
        disabled={!prevLesson}
        onClick={() => router.push(`${course}/lesson?slug=${prevLesson.slug}`)}
      >
        <IconArrowLeft />
      </Button>
      <Button
        className="size-10 p-3"
        disabled={!nextLesson}
        onClick={() => router.push(`${course}/lesson?slug=${nextLesson.slug}`)}
      >
        <IconArrowRight />
      </Button>
    </div>
  );
};

export default LessonNavigation;
