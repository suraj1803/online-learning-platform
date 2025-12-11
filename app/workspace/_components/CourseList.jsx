"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddNewCourseDialog from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { index } from "drizzle-orm/gel-core";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courseList, setCourseList] = useState([]);
  const { user } = useUser();
  const GetCourseList = async () => {
    const result = await axios.get("/api/courses");
    console.log(result.data);
    setCourseList(result.data);
  };

  useEffect(() => {
    user && GetCourseList();
  }, [user]);
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl">Course List</h2>
      {courseList.length == 0 ? (
        <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-secondary">
          <Image
            src={"/online-education.png"}
            alt="edu"
            width={80}
            height={80}
          ></Image>
          <h2 className="my-2 text-xl font-bold">
            Look like you haven't created courses yet
          </h2>
          <AddNewCourseDialog>
            <Button>+ Create your first course</Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {courseList?.map((course, index) => (
            <CourseCard course={course} key={index}></CourseCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
