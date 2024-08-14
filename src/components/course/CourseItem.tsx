import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";
import { ICourse } from "@/database/course.model";
import { formatVndPrice } from "@/utils/helpers";

const CourseItem = ({ data }: { data: ICourse }) => {
  const courseInfo = [
    {
      title: data?.views,
      icon: (className?: string) => (
        <IconEye className={`size-4 ${className}`} />
      ),
    },
    {
      title: data?.rating?.[0],
      icon: (className?: string) => (
        <IconStar className={`size-4 ${className}`} />
      ),
    },
    {
      title: "30h25ph",
      icon: (className?: string) => (
        <IconClock className={`size-4 ${className}`} />
      ),
    },
  ];

  return (
    <div className="bg-white dark:bg-grayDarker border border-gray-200 dark:border-opacity-10 p-4 rounded-2xl flex flex-col">
      <Link href={`/course/${data?.slug}`} className="block h-[180px] relative">
        <Image
          src={data.image}
          alt="product image"
          //   fill
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300px, 100vw"
        />
        <span
          className="inline-block px-3 py-1 absolute top-3 right-3 z-10 text-white font-medium
        bg-green-500 text-xs rounded-full"
        >
          New
        </span>
      </Link>
      <div className="pt-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-3 line-clamp-3 block">
          {data?.title}
        </h3>
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-grayDark mb-5 ">
            {courseInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-1">
                {item.icon()}
                <span>{item.title}</span>
              </div>
            ))}
            <span className="font-bold text-primary text-base ml-auto">
              {formatVndPrice(Number(data?.price))}
            </span>
          </div>
          <Link
            href={`/course/${data?.slug}`}
            className="w-full flex items-center justify-center 
          rounded-lg text-white font-semibold bg-primary h-12"
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
