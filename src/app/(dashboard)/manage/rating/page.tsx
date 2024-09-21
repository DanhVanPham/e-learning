import RatingManage from "@/components/rating/RatingManage";
import { ITEMS_PER_PAGE } from "@/constants";
import { getRatings } from "@/lib/actions/rating.actions";
import { ERatingStatus } from "@/types/enums";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    search: string;
    status: ERatingStatus;
  };
}) => {
  const { page, search, status } = searchParams;

  const paginationData = await getRatings({
    page,
    limit: ITEMS_PER_PAGE,
    search: search,
    status: status,
  });

  const currPage = Number(page) || 1;

  return (
    <RatingManage
      page={currPage}
      totalPages={paginationData?.totalPages}
      status={status}
      search={search}
      ratings={paginationData?.items}
    />
  );
};

export default page;
