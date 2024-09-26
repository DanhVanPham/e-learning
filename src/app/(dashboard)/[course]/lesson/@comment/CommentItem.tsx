"use client";

import { TGetCommentItem } from "@/types";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import ReplyForm from "./ReplyForm";
import { getRepliesOfComment } from "@/lib/actions/comment.actions";
import { cn } from "@/lib/utils";

const CommentItem = ({
  comment,
  userId,
  lessonId,
  hasReply = true,
}: {
  comment: TGetCommentItem;
  userId: string;
  lessonId: string;
  hasReply?: boolean;
}) => {
  const [isOpenReply, setIsOpenReply] = useState(false);
  const [isShowReply, setIsShowReply] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [replies, setReplies] = useState<TGetCommentItem[] | undefined>();

  useEffect(() => {
    if (!isShowReply) return;
    startTransition(async () => {
      const replies = await getRepliesOfComment(comment._id);
      setReplies(replies);
    });
  }, [isShowReply, comment]);

  return (
    <div>
      <div
        key={comment._id}
        className={cn(
          "flex items-start gap-3 p-3 rounded-xl border borderDarkMode bg-white  dark:bg-grayDarker shadow-sm ",
          {
            "p-2 py-3 shadow-none border-none": !hasReply,
          }
        )}
      >
        <div className="size-10 rounded-full relative border borderDarkMode shadow-sm  flex-shrink-0">
          <Image
            alt="avatar"
            src={comment.user?.avatar || ""}
            fill
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h4 className="font-bold ">{comment.user?.name}</h4>
            <span className="text-sm text-gray-400">
              {formatDistanceToNow(new Date(comment.created_at))}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-900 dark:text-white">
            {comment.content || ""}
          </p>
          {hasReply && (
            <div className="mt-1 flex items-center gap-5 text-sm text-gray-400 font-medium">
              <button
                type="button"
                onClick={() => setIsOpenReply((prev) => !prev)}
              >
                Reply
              </button>
              {!!comment?.replyCount && (
                <div
                  className="flex items-center gap-1"
                  onClick={() => setIsShowReply((prev) => !prev)}
                >
                  <span className="text-sm hover:underline hover:cursor-pointer hover:text-primary">
                    {isShowReply ? "Ẩn" : "Xem"} {comment.replyCount} phản hồi
                  </span>
                  {isPending && (
                    <div className="size-4 rounded-full border-2 border-t-0 border-gray-500 animate-spin" />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isOpenReply && (
        <ReplyForm parentId={comment._id} lessonId={lessonId} userId={userId} />
      )}
      {isShowReply && !!replies?.length && (
        <div className="px-4 pt-2 mx-2 rounded-lg border borderDarkMode mt-2 bg-white ">
          {replies?.map((reply, idx) => (
            <div key={reply._id}>
              <CommentItem
                comment={reply}
                lessonId={lessonId}
                userId={userId}
                hasReply={false}
              />
              {idx !== replies.length - 1 && (
                <div className="w-full border border-b borderDarkMode border-dashed border-gray-300" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
