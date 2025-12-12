"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Courseinfo from "../_components/Courseinfo";
import ChapterTopicList from "../_components/ChapterTopicList";

const EditCourse = ({ viewCourse = false }) => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  useEffect(() => {
    GetCourseInfo();
  }, []);
  const GetCourseInfo = async () => {
    setLoading(true);
    const result = await axios.get("/api/courses?courseId=" + courseId);
    console.log("From edit Course", result.data);
    setLoading(false);
    setCourse(result.data);
  };

  return (
    <div>
      <Courseinfo course={course} viewCourse={viewCourse}></Courseinfo>
      <ChapterTopicList course={course}></ChapterTopicList>
    </div>
  );
};

export default EditCourse;
