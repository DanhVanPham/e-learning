import { ILecture } from "@/database/lecture.model";
import { ICourseUpdateLecture, TUpdateLectuteParams } from "@/types";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import { commonClassName } from "@/constants";
import { IconCancel, IconCheck, IconDelete, IconEdit } from "../icons";
import { cn } from "@/lib/utils";
import LessonAccordionItem from "../lesson/LessonAccordionItem";

function LectureAccordionItem({
  data,
  onDelete,
  onUpdate,
}: {
  data: ICourseUpdateLecture;
  onDelete: (e: MouseEvent<HTMLSpanElement>, lectureId: string) => {};
  onUpdate: (bodyData: TUpdateLectuteParams) => {};
}) {
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
    const bodyData: TUpdateLectuteParams = {
      lectureId: data._id,
      updateData: {
        title: titleUpdate,
      },
      path: "/manage/course/update-content",
    };
    await onUpdate(bodyData);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === "Enter") handleUpdateTitle();
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setTitleUpdate(e.target.value);
  };

  return (
    <Accordion type="single" collapsible={!isEditing} className="w-full">
      <AccordionItem key={data._id} value={data._id}>
        <AccordionTrigger>
          <div className="flex items-center gap-3 w-full justify-between pr-5">
            {isEditing ? (
              <>
                <div className="w-full" onClick={(e) => e.stopPropagation()}>
                  <Input
                    placeholder="Tên chương"
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
                    onClick={(e) => onDelete(e, data._id)}
                  >
                    <IconDelete />
                  </span>
                </div>
              </>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-none !bg-transparent">
          <div className="flex flex-col gap-3">
            {data.lessons.map((lesson) => (
              <LessonAccordionItem key={lesson._id} data={lesson} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default LectureAccordionItem;
