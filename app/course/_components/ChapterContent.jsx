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

  const { course, enrollCourse } = courseInfo ?? {};
  const courseContent = courseInfo?.courses?.courseContent?.chapters;

  const { selectedChapterIndex } = useContext(SelectedChapterIndexContext);

  const topics = courseContent?.[selectedChapterIndex]?.topics || [];

  // 🔹 Get ONLY 2 YouTube videos from the whole chapter
  const chapterYoutubeVideos =
    topics.flatMap((topic) => topic?.youtubeVideos || []).slice(0, 2);

  const markChapterCompleted = async () => {
    let completedChapters = enrollCourse?.completedChapters ?? [];

    if (!completedChapters.includes(selectedChapterIndex)) {
      completedChapters.push(selectedChapterIndex);

      await axios.put("/api/enroll-course", {
        completedChapters,
        courseId,
      });

      refreshData();
      toast.success("Chapter marked as completed!");
    } else {
      toast.info("Chapter already completed");
    }
  };

  return (
    <div className="p-10">
      {/* -------- Chapter Header -------- */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">
          {selectedChapterIndex + 1}.{" "}
          {courseContent?.[selectedChapterIndex]?.chapterName}
        </h2>

        <Button onClick={markChapterCompleted}>
          <CheckCircle className="mr-2" />
          Mark as Completed
        </Button>
      </div>

      {/* -------- Chapter Level Videos (ONLY 2) -------- */}
      {chapterYoutubeVideos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 mb-12">
          {chapterYoutubeVideos.map((video, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-md bg-black"
            >
              <YouTube
                videoId={video.videoId}
                opts={{
                  height: "250",
                  width: "100%",
                  playerVars: { autoplay: 0 },
                }}
              />
              {video?.title && (
                <p className="text-sm text-white p-2">{video.title}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* -------- Topics -------- */}
      <div className="mt-5">
        {topics.map((topic, index) => (
          <div key={index} className="mt-10 p-5 bg-secondary rounded-2xl">
            <h2 className="font-bold text-2xl text-primary">
              {index + 1}. {topic?.topic}
            </h2>

            <div
              className="mt-5"
              dangerouslySetInnerHTML={{ __html: topic?.content }}
              style={{ lineHeight: "2.5" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterContent;
