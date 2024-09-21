"use client";

import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconStar } from "@/components/icons";
import { ratingList } from "@/constants";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  checkUserAlreadyRatingCourse,
  createRating,
} from "@/lib/actions/rating.actions";
import { toast } from "react-toastify";

const RatingButton = ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const [selectedRate, setSelectedRate] = useState<number>(5);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRate = (value: number) => {
    setSelectedRate(value);
  };

  const handleChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSendFeedback = async () => {
    try {
      setIsLoading(true);
      const alreadyRating = await checkUserAlreadyRatingCourse(
        userId,
        courseId
      );
      if (alreadyRating) {
        toast.error("Bạn đã đánh giá khóa học!");
        return;
      }

      await createRating({
        rate: selectedRate,
        content,
        user: userId,
        course: courseId,
      });
      toast.success("Gửi đánh giá khóa học thành công");
    } catch (error) {
      console.log(error);
      toast.error("Gửi đánh giá khóa học thất bại!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-3 rounded-lg h-10 bg-primary text-sm font-semibold px-3 text-white">
        <IconStar className="size-4" />
        <span>Đánh giá khóa học</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="tracking-tight font-bold mb-5 text-xl">
            Đánh giá
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center  justify-between gap-5 mb-5">
              {ratingList.map((rating) => (
                <button
                  key={rating.title}
                  className="flex flex-col gap-2 text-xs justify-center items-center group font-semibold"
                  onClick={() => handleSelectRate(rating.value)}
                >
                  <span
                    className={cn(
                      "size-10 p-2 rounded-full flex items-center justify-center text-sm bg-gray-200 dark:bg-gray-100 dark:bg-opacity-10",
                      {
                        "bg-[#FEE272]": selectedRate === rating.value,
                      }
                    )}
                  >
                    <Image
                      width={40}
                      height={40}
                      alt={rating.title}
                      src={`/rating/${rating.icon}.png`}
                    />
                  </span>
                  <span className="capitalize grayPrimary dark:text-white transition-all group-hover:opacity-100 group-hover:visible">
                    {rating.title}
                  </span>
                </button>
              ))}
            </div>
            <Textarea
              value={content}
              placeholder="Đánh giá của bạn"
              className="h-[200px] resize-none text-[#1f2937]"
              onChange={handleChangeContent}
            />
            <Button
              variant="primary"
              className="w-full mt-5"
              disabled={!content}
              isLoading={isLoading}
              onClick={handleSendFeedback}
            >
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
