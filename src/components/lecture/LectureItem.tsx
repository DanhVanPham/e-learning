import { ILecture } from "@/database/lecture.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ICourseUpdateLecture } from "@/types";

function LectureItem({ data }: { data: ICourseUpdateLecture }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem key={data._id} value={data._id}>
        <AccordionTrigger>
          <div className="flex items-center w-full justify-start pr-5">
            <div>{data.title}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="border-none !bg-transparent">
          <div className="flex flex-col gap-3">
            {data.lessons.map((lesson) => (
              <Accordion type="single" key={lesson._id} collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>{lesson.title}</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default LectureItem;
