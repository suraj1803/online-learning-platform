import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";

const ChapterListSidebar = ({ courseInfo }) => {
  const course = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent?.chapters;

  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  return (
    <div className="w-150 bg-secondary h-screen p-5">
      <h2 className="my-3 font-bold text-xl">
        Chapters ({courseContent?.length})
      </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem
            value={chapter?.chapterName}
            key={index}
            onClick={() => {
              setSelectedChapterIndex(index);
            }}
          >
            <AccordionTrigger className={"text-md font-medium"}>
              {index + 1}. {chapter?.chapterName}
            </AccordionTrigger>
            <AccordionContent asChild>
              <div className="">
                {chapter?.topics.map((topic, index) => (
                  <h2 className="p-3 bg-white my-1 rounded-lg" key={index}>
                    {topic?.topic}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ChapterListSidebar;
