import MemberManage from "@/components/member/MemberManage";
import { ITEMS_PER_PAGE } from "@/constants";
import { getComments } from "@/lib/actions/comment.actions";
import { getUserInfo, getUsers } from "@/lib/actions/user.actions";
import { ECommentStatus, EUserRole, EUserStatus } from "@/types/enums";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    role: EUserRole;
    status: EUserStatus;
  };
}) => {
  const { page, search, role, status } = searchParams;

  const { userId } = auth();
  if (!userId) return null;

  const foundUser = await getUserInfo({ userId });
  if (!foundUser) return null;

  const paginationData = await getUsers({
    page,
    limit: ITEMS_PER_PAGE,
    search: search,
    role: role,
    status: status,
  });

  const currPage = Number(page) || 1;

  return (
    <MemberManage
      currUser={foundUser}
      page={currPage}
      totalPages={paginationData?.totalPages}
      status={status}
      role={role}
      search={search}
      users={paginationData?.items}
    />
  );
};

export default page;
