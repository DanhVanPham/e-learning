import CommentManage from "@/components/comment/CommentManage";
import { ITEMS_PER_PAGE } from "@/constants";
import { getComments } from "@/lib/actions/comment.actions";
import { ECommentStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ECommentStatus;
  };
}) => {
  const { page, search, status } = searchParams;

  const paginationData = await getComments({
    page,
    limit: ITEMS_PER_PAGE,
    search: search,
    status: status,
  });

  const currPage = Number(page) || 1;

  return (
    <CommentManage
      page={currPage}
      totalPages={paginationData?.totalPages}
      status={status}
      search={search}
      comments={paginationData?.items}
    />
  );
};

export default page;
