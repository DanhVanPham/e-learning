"use client";

import React, { useEffect, useState } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { ILesson } from "@/database/lesson.model";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import LessonNavigation from "../LessonNavigation";
import useGlobalStore from "@/store";
import { Button } from "@/components/ui/button";
import RatingButton from "./RatingButton";
import { TCourseUpdateParams } from "@/types";
// `/${course}/lesson?slug=${nextLesson?.slug}`
const VideoPlayer = ({
  course,
  userId,
  prevLesson,
  nextLesson,
}: {
  userId: string;
  course: TCourseUpdateParams;
  prevLesson: ILesson | undefined;
  nextLesson: ILesson | undefined;
}) => {
  const duration = 5000;
  const [isEndedVideo, setIsEndedVideo] = useState(false);

  const { expandedPlayer, setExpandedPlayer } = useGlobalStore();

  const router = useRouter();

  useEffect(() => {
    if (!isEndedVideo || !nextLesson) return;

    const timer = setTimeout(() => {
      router.push(`/${course.slug}/lesson?slug=${nextLesson?.slug}`);
    }, duration);

    return () => clearTimeout(timer);
  }, [isEndedVideo, course, nextLesson]);

  return (
    <>
      <div className="relative mb-5 aspect-video">
        <div
          className={cn(
            "h-1.5 absolute top-0 right-0 z-10 bg-gradient-to-r from-primary to-secondary",
            isEndedVideo && !!nextLesson ? "animate-bar" : ""
          )}
        ></div>
        <MuxPlayer
          streamType="on-demand"
          playbackId="MrHpFNCJhaO5jvC1IQBM4iSij2moMmohJ6TeoeUNSzw"
          metadataVideoTitle="Placeholder (optional)"
          metadataViewerUserId="Placeholder (optional)"
          primaryColor="#FFFFFF"
          secondaryColor="#000000"
          className="w-full h-full object-fill"
          onEnded={() => setIsEndedVideo(true)}
          onPlay={() => setIsEndedVideo(false)}
        />
      </div>
      <div className="flex items-center justify-between mb-5">
        <LessonNavigation
          prevLesson={prevLesson}
          nextLesson={nextLesson}
          course={course.slug}
        />
        <div className="flex gap-5">
          <RatingButton courseId={course._id.toString()} userId={userId} />
          <Button onClick={() => setExpandedPlayer(!expandedPlayer)}>
            {expandedPlayer ? "Mặc định" : "Mở rộng"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
