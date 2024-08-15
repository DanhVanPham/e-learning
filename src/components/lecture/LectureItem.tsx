import { ILecture } from "@/database/lecture.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ICourseUpdateLecture } from "@/types";
import { IconPlay } from "../icons";

function LectureItem({ data }: { data: ICourseUpdateLecture }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={data._id.toString()}>
        <AccordionTrigger>
          <div className="flex items-center gap-3 w-full justify-start pr-5">
            <div>{data.title}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-none !bg-transparent p-0">
          <div className="flex flex-col gap-3">
            {data.lessons.map((lesson) => (
              <div
                key={lesson._id.toString()}
                className="flex items-center gap-3 bgDarkMode border borderDarkMode rounded-lg p-3 text-sm font-medium"
              >
                <IconPlay className="size-4 " />
                <h4>{lesson.title}</h4>
                <span className="ml-auto text-xs font-semibold">
                  {lesson.duration} phút
                </span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default LectureItem;
