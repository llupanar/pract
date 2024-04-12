import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import JobTitle from "./pages/JobTitle";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Client from "./pages/Client";
import Employee from "./pages/Employee";
import Lesson from "./pages/Lesson";
import Visit from "./pages/Visit";
import SwGroup from "./pages/SwGroup";
import Schedule from "./pages/Schedule";
import PoolSubscription from "./pages/PoolSubscription";
import Home from "./pages/Home";
import JobTitleForm from "./job-titles/JobTitleForm";
import SwGroupForm from "./swgroups/SwGroupForm";
import EmployeeForm from "./employees/EmployeeForm";
import ScheduleForm from "./schedules/ScheduleForm";
import ClientForm from "./clients/ClientForm";
import LessonForm from "./lessons/LessonForm";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>

                    <Route exact path="/employee" element={<Employee/>}/>
                    <Route exact path="/add-employee" element={<EmployeeForm isEditing={false}/>}/>
                    <Route exact path="/edit-employee/:id" element={<EmployeeForm isEditing={true}/>}/>

                    <Route exact path="/client" element={<Client/>}/>
                    <Route exact path="/add-client" element={<ClientForm isEditing={false}/>}/>
                    <Route exact path="/edit-client/:id" element={<ClientForm isEditing={true}/>}/>

                    <Route exact path="/job-title" element={<JobTitle/>}/>
                    <Route exact path="/add-job-title" element={<JobTitleForm isEditing={false}/>}/>
                    <Route exact path="/edit-job-title/:id" element={<JobTitleForm isEditing={true}/>}/>

                    <Route exact path="/lesson" element={<Lesson/>}/>
                    <Route exact path="/add-lesson" element={<LessonForm isEditing={false}/>}/>
                    <Route exact path="/edit-lesson/:id" element={<LessonForm isEditing={true}/>}/>

                    <Route exact path="/swgroup" element={<SwGroup/>}/>
                    <Route exact path="/add-swgroup" element={<SwGroupForm isEditing={false}/>}/>
                    <Route exact path="/edit-swgroup/:id" element={<SwGroupForm isEditing={true}/>}/>

                    <Route exact path="/schedule" element={<Schedule/>}/>
                    <Route exact path="/add-schedule" element={<ScheduleForm isEditing={false}/>}/>
                    <Route exact path="/edit-schedule/:id" element={<ScheduleForm isEditing={true}/>}/>

                    <Route exact path="/subs" element={<PoolSubscription/>}/>
                    <Route exact path="/visit" element={<Visit/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;