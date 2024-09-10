import { IconStarFill } from "@/components/icons";
import { commonClassName } from "@/constants";
import { IUser } from "@/database/user.model";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AlreadyEnroll = ({ user }: { user?: IUser | null }) => {
  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="relative size-16 mx-auto mb-3">
        <Image
          alt="avatar"
          src={user?.avatar || ""}
          fill
          className="w-full h-full object-cover rounded-full"
        />
        <IconStarFill className="absolute right-0 bottom-0 size-5 text-[#ffbdb6]" />
      </div>
      <p>
        Xin chào&nbsp;<strong>{user?.username}</strong>
        .Bạn đã sở hữu khóa học này rồi.Vui lòng vào&nbsp;
        <Link href="/study" className="text-primary font-bold">
          Khu vực học tập
        </Link>
        &nbsp;để học hoặc
      </p>
      <Link
        href="/study"
        className={cn(
          commonClassName.btnPrimary,
          "mt-5 font-bold px-5 h-10 flex-shrink-0 "
        )}
      >
        Nhấn vào đây
      </Link>
    </div>
  );
};

export default AlreadyEnroll;
