import CourseList from "./_components/CourseList";
import EnrollCourseList from "./_components/EnrollCourseList";
import WelcomeBanner from "./_components/WelcomeBanner";

const Workspace = () => {
  return (
    <div>
      <WelcomeBanner></WelcomeBanner>
      <EnrollCourseList></EnrollCourseList>
      <CourseList></CourseList>
    </div>
  );
};

export default Workspace;
