"use client";

import { ILesson } from "@/database/lesson.model";
import { IconPlay } from "../icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { createHistory } from "@/lib/actions/history.actions";

const LessonItem = ({
  data,
  url,
  currentLesson,
  isChecked = false,
}: {
  data: ILesson;
  url?: string;
  currentLesson?: string;
  isChecked?: boolean;
}) => {
  const handleCompleteLesson = async (checked: boolean | string) => {
    try {
      await createHistory({
        course: String(data.course),
        lesson: data._id,
        checked,
        path: url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const isActive = currentLesson === data.slug;
  return (
    <div
      className={cn(
        "flex items-center gap-2 bgDarkMode border borderDarkMode rounded-lg p-4 text-sm font-medium",
        isActive && "font-bold text-primary"
      )}
    >
      {url ? (
        <Checkbox
          defaultChecked={isChecked}
          className="flex-shink-0 inline-block"
          onCheckedChange={handleCompleteLesson}
        />
      ) : (
        <></>
      )}
      <IconPlay className="size-5 flex-shrink-0" />
      {url ? (
        <Link
          href={url}
          className={cn("line-clamp-1", isActive ? "pointer-events-none" : "")}
        >
          {data.title}
        </Link>
      ) : (
        <h4 className="line-clamp-1">{data.title}</h4>
      )}
      <span className="ml-auto text-xs font-semibold flex-shrink-0">
        {data.duration} phút
      </span>
    </div>
  );
};

export default LessonItem;
