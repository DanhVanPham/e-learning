"use client";

import React, { MouseEvent } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  ICourseUpdateLecture,
  TCourseUpdateParams,
  TUpdateLectuteParams,
} from "@/types";
import { ILecture } from "@/database/lecture.model";
import LectureAccordionItem from "../lecture/LectureAccordionItem";
import { createLesson } from "@/lib/actions/lesson.actions";
import slugify from "slugify";

const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
  const lectures = course.lectures;

  const handleAddNewLecture = async () => {
    try {
      const response = await createLecture({
        title: "Chương mới",
        course: course._id,
        order: lectures.length || 0,
        path: "/manage/course/update-content",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteLecture = async (
    e: MouseEvent<HTMLSpanElement>,
    lectureId: string
  ) => {
    e.stopPropagation();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateLecture({
            lectureId: lectureId,
            updateData: {
              _destroy: true,
            },
            path: "/manage/course/update-content",
          });
          toast.success("Xoá chương thành công");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleUpdateLecture = async (bodyData: TUpdateLectuteParams) => {
    try {
      const res = await updateLecture(bodyData);
      if (res?.success) {
        toast.success("Cập nhật chương thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNewLesson = async (lectureId: string, courseId: string) => {
    try {
      const response = await createLesson({
        title: "Tiêu đề bài học mới",
        slug: `tieu-de-khoa-hoc-moi-${new Date()
          .getTime()
          .toString()
          .slice(-3)}`,
        course: courseId,
        lecture: lectureId,
        path: "/manage/course/update-content",
      });

      if (!response?.success) {
        toast.error("Thêm bài học mới thất bại");
        return;
      }

      toast.success("Thêm bài học mới thành công");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        {!!lectures.length &&
          lectures.map((lecture: ICourseUpdateLecture) => (
            <div key={lecture._id}>
              <LectureAccordionItem
                data={lecture}
                onDelete={handleDeleteLecture}
                onUpdate={handleUpdateLecture}
              />
              <Button
                className="mt-5 ml-auto w-fit block"
                onClick={() => handleAddNewLesson(lecture._id, course._id)}
              >
                Thêm bài học
              </Button>
            </div>
          ))}
      </div>
      <Button className="mt-5" onClick={handleAddNewLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
