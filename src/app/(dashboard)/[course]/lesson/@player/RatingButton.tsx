import { Button } from "@/components/ui/button";
import React from "react";
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

const RatingButton = () => {
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
                >
                  <span className="size-10 p-2 rounded-full flex items-center justify-center text-sm bg-gray-200 dark:bg-gray-100 dark:bg-opacity-10">
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
              placeholder="Đánh giá của bạn"
              className="h-[200px] resize-none"
            />
            <Button variant="primary" className="w-full mt-5">
              Gửi đánh giá
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RatingButton;
