import React, {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { ILesson } from "@/database/lesson.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { cn } from "@/lib/utils";
import { commonClassName } from "@/constants";
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icons";
import { Input } from "../ui/input";
import { TUpdateLessonParams } from "@/types";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import slugify from "slugify";
import LessonItemUpdate from "./LessonItemUpdate";

const LessonAccordionItem = ({ data }: { data: ILesson }) => {
  const [titleUpdate, setTitleUpdate] = useState(data.title || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setTitleUpdate(data.title);
  }, [data.title]);

  const handleOpenEditing = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleCancelEditing = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleUpdateTitle = async () => {
    try {
      const bodyData: TUpdateLessonParams = {
        lessonId: data._id,
        updateData: {
          title: titleUpdate,
          slug: slugify(titleUpdate, {
            lower: true,
            locale: "vi",
            remove: /[*+~.()'"!:@]/g,
          }),
        },
        path: "/manage/course/update-content",
      };
      const res = await updateLesson(bodyData);

      if (res?.success) {
        toast.success("Cập nhật bài học thành công");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleUpdateTitle();
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTitleUpdate(e.target.value);
  };

  const handleDelete = (e: MouseEvent<HTMLSpanElement>, lessonId: string) => {
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
          await updateLesson({
            lessonId: lessonId,
            updateData: {
              _destroy: true,
            },
            path: "/manage/course/update-content",
          });
          toast.success("Xoá bài học thành công");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <Accordion type="single" key={data._id} collapsible={!isEditing}>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-3 w-full justify-between pr-5">
            {isEditing ? (
              <>
                <div className="w-full" onClick={(e) => e.stopPropagation()}>
                  <Input
                    placeholder="Tên bài học"
                    value={titleUpdate}
                    onKeyDown={handleKeyDown}
                    onChange={handleChangeTitle}
                  />
                </div>
                <div className="flex gap-2">
                  <span
                    className={cn(commonClassName.action, "text-green-500")}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateTitle();
                    }}
                  >
                    <IconCheck />
                  </span>
                  <span
                    className={cn(commonClassName.action, "text-red-500")}
                    onClick={handleCancelEditing}
                  >
                    <IconCancel />
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="line-clamp-1">{data.title}</div>
                <div className="flex gap-2">
                  <span
                    className={cn(commonClassName.action, "text-blue-500")}
                    onClick={handleOpenEditing}
                  >
                    <IconEdit />
                  </span>
                  <span
                    className={cn(commonClassName.action, "text-red-500")}
                    onClick={(e) => handleDelete(e, data._id)}
                  >
                    <IconDelete />
                  </span>
                </div>
              </>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LessonItemUpdate lesson={data} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LessonAccordionItem;
