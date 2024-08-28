"use client";

import { useEffect } from "react";
import { lastLessonKey } from "@/constants";

const LessonSaveUrl = ({ url, course }: { url: string; course: string }) => {
  useEffect(() => {
    const result =
      JSON.parse(localStorage.getItem(lastLessonKey) || "[]") || [];
    const item = {
      course,
      lesson: url,
    };

    const existedIdx =
      result?.length > 0
        ? result.findIndex((i: any) => i.course === course)
        : -1;

    if (result.length > 0 && existedIdx !== -1) result.splice(existedIdx, 1);

    result.push(item);
    localStorage.setItem(lastLessonKey, JSON.stringify(result));
  }, [url, course]);

  return null;
};

export default LessonSaveUrl;
