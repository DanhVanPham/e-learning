import { ILesson } from "@/database/lesson.model";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const LessonItem = ({ data }: { data: ILesson }) => {
  return (
    <Accordion type="single" key={data._id} collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{data.title}</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default LessonItem;
