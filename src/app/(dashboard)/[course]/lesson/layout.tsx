import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import React, { Suspense } from "react";
import LoadingPlayer from "./@player/LoadingPlayer";
import LoadingOutline from "./@outline/LoadingOutline";
import LessonWrapper from "./LessonWrapper";

const Layout = async ({
  player,
  outline,
  comment,
}: {
  player: React.ReactNode;
  outline: React.ReactNode;
  comment: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) return <PageNotFound />;

  const foundUser = await getUserInfo({ userId });
  if (!foundUser) return <PageNotFound />;

  return (
    <LessonWrapper>
      <Suspense fallback={<LoadingPlayer />}>{player}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
      <Suspense fallback={<LoadingOutline />}>{comment}</Suspense>
    </LessonWrapper>
  );
};

export default Layout;
