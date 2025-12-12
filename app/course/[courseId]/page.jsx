"use client";
import AppHeader from "@/app/workspace/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import ChapterContent from "../_components/ChapterContent";
import axios from "axios";
import { useParams } from "next/navigation";

const Course = () => {
  const { courseId } = useParams();
  const [courseInfo, setCourseInfo] = useState(null);
  useEffect(() => {
    GetEnrolledCourseById();
  }, []);
  const GetEnrolledCourseById = async () => {
    const result = await axios.get("/api/enroll-course?courseId=" + courseId);
    console.log("courseInfoData: ", result.data);
    setCourseInfo(result.data);
    
  };
  return (
    <div>
      <AppHeader hideSidebar={true}></AppHeader>
      <div className="flex gap-10">
        <ChapterListSidebar courseInfo={courseInfo}></ChapterListSidebar>
        <ChapterContent
          courseInfo={courseInfo}
          refreshData={() => GetEnrolledCourseById()}
        ></ChapterContent>
      </div>
    </div>
  );
};

export default Course;
