import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Book,
  LoaderCircle,
  PlayCircle,
  PlayIcon,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const EnrollCourseCard = ({ course, enrollCourse }) => {
  const courseJson = course?.courseJson?.course;
  const CalculatePerProgress = () => {
    return (
      (enrollCourse?.completedChapters?.length / courseJson?.noOfChapters) *
        100 || 0
    );
  };
  useEffect(() => {
    console.log("checking", enrollCourse);
  }, []);
  return (
    <div className="shadow rounded-xl">
      <Image
        src={course?.bannerImageUrl}
        alt={course?.name}
        height={400}
        width={400}
        className="w-full aspect-video rounded-t-xl object-cover"
      ></Image>
      <div className="p-3  flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-gray-500 text-sm">
          {courseJson?.description}
        </p>
        <div className="">
          <h2 className="flex justify-between text-sm text-primary mb-1">
            Progress <span>{CalculatePerProgress()}%</span>
          </h2>
          <Progress value={CalculatePerProgress()}></Progress>
          <Link href={"/workspace/course/" + course?.cid}>
            <Button className={"w-full mt-3"}>
              <PlayIcon></PlayIcon> Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnrollCourseCard;
