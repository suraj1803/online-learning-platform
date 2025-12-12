import { Button } from "@/components/ui/button";
import { SelectedChapterIndexContext } from "@/context/SelectedChapterIndexContext";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import YouTube from "react-youtube";
import { toast } from "sonner";

const ChapterContent = ({ courseInfo, refreshData }) => {
  const { courseId } = useParams();
  const { course, enrollCourse } = courseInfo ?? "";
  const courseContent = courseInfo?.courses?.courseContent?.chapters;
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(
    SelectedChapterIndexContext
  );
  const topics = courseContent?.[selectedChapterIndex]?.topics;
  const markChapterCompleted = async () => {
    let completedChapters = enrollCourse?.completedChapters ?? [];
    console.log("Completed Chapters: ", completedChapters);
    if (completedChapters?.length == 0) {
      completedChapters.push(selectedChapterIndex);
      const result = await axios.put("/api/enroll-course", {
        completedChapters: completedChapters,
        courseId: courseId,
      });
      console.log("Result form", result);
      refreshData();
      toast.success("Chapter marked as completed!");
    }
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.{" "}
          {courseContent?.[selectedChapterIndex]?.chapterName}
        </h2>
        <Button onClick={markChapterCompleted}>
          <CheckCircle></CheckCircle>Mark as Completed
        </Button>
      </div>
      <div className="mt-5">
        {topics?.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}. {topic?.topic}
            </h2>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 mt-5 mb-10 gap-5">
              {topics?.[index]?.youtubeVideos?.map(
                (video, vidIndex) =>
                  vidIndex < 2 && (
                    <div key={vidIndex}>
                      <YouTube
                        videoId={video.videoId}
                        opts={{ height: "250", width: "460" }}
                      ></YouTube>
                    </div>
                  )
              )}
            </div> */}
            <div
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{
                lineHeight: "2.5",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
