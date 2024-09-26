import Heading from "@/components/common/Heading";
import React from "react";
import ProfileForm from "./ProfileForm";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import PageNotFound from "@/app/not-found";
import { parseMongoDocToPlainObject } from "@/utils/helpers";

const ProfilePage = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const mongoUser = await getUserInfo({ userId });
  if (!mongoUser) return <PageNotFound />;

  return (
    <div>
      <Heading>Thông tin cá nhân</Heading>
      <ProfileForm user={parseMongoDocToPlainObject(mongoUser)} />
    </div>
  );
};

export default ProfilePage;
