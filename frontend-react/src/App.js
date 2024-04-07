import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import JobTitle from "./pages/JobTitle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddJobTitle from "./job-titles/AddJobTitle";
import EditJobTitile from "./job-titles/EditJobTitle";
import Client from "./pages/Client";
import Employee from "./pages/Employee";
import Lesson from "./pages/Lesson";
import Visit from "./pages/Visit";
import SwGroup from "./pages/SwGroup";
import Schedule from "./pages/Schedule";
import PoolSubscription from "./pages/PoolSubscription";
import AddSwGroup from "./swgroups/AddSwGroup";
import EditSwGroup from "./swgroups/EditSwGroup";
import Home from "./pages/Home";
import AddClient from "./clients/AddClient";
import EditClient from "./clients/EditClient";
import AddEmployee from "./employees/AddEmployee";
import EditEmloyee from "./employees/EditEmloyee";
import AddLesson from "./lessons/AddLesson";
import EditLesson from "./lessons/EditLesson";
import AddSchedule from "./schedules/AddSchedule";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />

                    <Route exact path="/employee" element={<Employee />} />
                    <Route exact path="/add-employee" element={<AddEmployee />} />
                    <Route exact path="/edit-employee/:id" element={<EditEmloyee />} />

                    <Route exact path="/client" element={<Client />} />
                    <Route exact path="/add-client" element={<AddClient />} />
                    <Route exact path="/edit-client/:id" element={<EditClient />} />

                    <Route exact path="/job-title" element={<JobTitle />} />
                    <Route exact path="/add-job-title" element={<AddJobTitle />} />
                    <Route exact path="/edit-job-title/:id" element={<EditJobTitile />} />

                    <Route exact path="/lesson" element={<Lesson />} />
                    <Route exact path="/add-lesson" element={<AddLesson />} />
                    <Route exact path="/edit-lesson/:id" element={<EditLesson />} />

                    <Route exact path="/visit" element={<Visit />} />

                    <Route exact path="/swgroup" element={<SwGroup />} />
                    <Route exact path="/add-swgroup" element={<AddSwGroup />} />
                    <Route exact path="/edit-swgroup/:id" element={<EditSwGroup />} />

                    <Route exact path="/schedule" element={<Schedule />} />
                    <Route exact path="/add-schedule" element={<AddSchedule />} />
                    <Route exact path="/subs" element={<PoolSubscription />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;