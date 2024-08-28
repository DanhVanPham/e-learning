import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ICourseUpdateLecture, TCourseUpdateParams } from "@/types";
import LessonItem from "../lesson/LessonItem";

function LectureItem({
  data,
  children,
}: {
  data: ICourseUpdateLecture;
  children: React.ReactNode;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={data._id.toString()}>
        <AccordionTrigger>
          <div className="flex items-center gap-3 w-full justify-start pr-5">
            <div className="line-clamp-1">{data.title}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-none !bg-transparent p-0">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default LectureItem;
