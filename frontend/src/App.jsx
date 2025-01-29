import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// School components
import School from "./school/school";
import Attendance from "./school/components/attendance/Attendance";
import Class from "./school/components/class/class";
import Dashboard from "./school/components/dashboard/dashboard";
import Examination from "./school/components/examination/examination";
import Notice from "./school/components/notice/notice";
import ScheduleList from "./school/components/schedule/schedule";
import Students from "./school/components/students/student";
import Subject from "./school/components/subjects/subject";
import Teachers from "./school/components/teachers/teacher";

// Client components
import Client from "./client/client";
import Home from "./client/components/home/Home"; // Corrected Home component
import Login from "./client/components/login/Login"; // Corrected Login component
import Register from "./client/components/register/register";

// Teacher components
import Teacher from "./teacher/teacher";
import ExaminationTeacher from "./teacher/components/examination/ExaminationTeacher";
import AttendanceTeacher from "./teacher/components/attendance/AttendanceTeacher";
import ScheduleTeacher from "./teacher/components/schedule/ScheduleTeacher";
import NoticeTeacher from "./teacher/components/notice/NoticeTeacher";
import TeacherDetails from "./teacher/components/teacher details/TeacherDetails";

// student components
import Student from "./student/student";
import ExaminationStudent from "./student/components/examination/ExaminationStudent";
import AttendanceStudent from "./student/components/attendance/AttenadanceStudent";
import NoticeStudent from "./student/components/notice/NoticeStudent";
import StudentDetails from "./student/components/student details/StudentDetails";
// import ScheduleStudent from "./student/schedule/ScheduleStudent";
// import StudentDetails from "./student/student details/StudentDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* School routes */}
        <Route path="school" element={<School />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="class" element={<Class />} />
          <Route path="examination" element={<Examination />} />
          <Route path="notice" element={<Notice />} />
          <Route path="schedule" element={<ScheduleList />} />
          <Route path="student" element={<Students />} />
          <Route path="subject" element={<Subject />} />
          <Route path="teachers" element={<Teachers />} />
        </Route>

        {/* Client/public routes */}
        <Route path="/" element={<Client />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Teacher routes */}
        <Route path="teacher" element={<Teacher />}>
          <Route index element={<TeacherDetails />} />
          <Route path="schedule" element={<ScheduleTeacher />} />
          <Route path="examination" element={<ExaminationTeacher />} />
          <Route path="attendance" element={<AttendanceTeacher />} />
          <Route path="notice" element={<NoticeTeacher />} />
        </Route>

        {/* student's route */}
        <Route path="student" element={<Student />}>
          <Route index element={<StudentDetails />} />
          <Route path="schedule" element={<ScheduleTeacher />} />
          <Route path="examination" element={<ExaminationStudent />} />
          <Route path="attendance" element={<AttendanceStudent />} />
          <Route path="notice" element={<NoticeStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
