// import { useParams } from "next/navigation";
import React from "react";
import EditCourse from "../../edit-course/[courseId]/page";

const ViewCourse = () => {
  // const { courseId } = useParams();
  return (
    <div>
      <EditCourse viewCourse={true}></EditCourse>
    </div>
  );
};

export default ViewCourse;
