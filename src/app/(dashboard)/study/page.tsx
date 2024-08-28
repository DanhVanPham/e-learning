import Heading from "@/components/common/Heading";
import { getAllMyCourses } from "@/lib/actions/course.actions";
import StudyCourses from "./StudyCourses";

const page = async () => {
  const courses = await getAllMyCourses();

  return (
    <div>
      <Heading>Khu vực học tập</Heading>
      <StudyCourses courses={courses} />
    </div>
  );
};

export default page;
