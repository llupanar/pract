import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditSchedule() {
    let navigate = useNavigate();

    const [schedule, setSchedule] = useState({
        id: 0,
        dayOfWeek: "",
        time: "",
        track: 0,
        lessonId:0,
        swGroupId:0
    });

    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const { id } = useParams();
    const { dayOfWeek, time, track,lessonId,swGroupId } = schedule;

    useEffect(() => {
        loadLessons();
        loadGroups();
        loadSchedule();
    }, []);

    const loadLessons = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/lesson");
        setLessons(result.data);
    };
    const loadGroups = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/swgroup");
        setGroups(result.data);
    };

    const loadSchedule=async ()=>{
        const result = await axios.get(`http://localhost:8080/api/v1/schedule/${id.toString()}`);
        const loadedSchedule=result.data;
        setSchedule({
            id:loadedSchedule.id,
            time: loadedSchedule.time,
            track: loadedSchedule.track
        });
        setSelectedLesson(loadedSchedule.lessonId);
        setSelectedGroup(loadedSchedule.swGroup.id);
    }


    const onInputChange = (e) => {
        setSchedule({ ...schedule, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const selectedLessonObj = lessons.find((lesson) => lesson.id.toString() === selectedLesson);
        const selectedGroupObj = groups.find((group) => group.id.toString() === selectedGroup);
        const updatedSchedule = {
            ...schedule,
            lesson: selectedLessonObj,
            swGroup:selectedGroupObj
        };

        await axios
            .put(`http://localhost:8080/api/v1/schedule/${id.toString()}`, updatedSchedule)
            .then((response) => {})
            .catch((error) => {});
        navigate("/schedule");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="time" className="form-label">
                                TIME
                            </label>
                            <input
                                type="time"
                                className="form-control"
                                placeholder="Enter time"
                                name="time"
                                value={time}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dayOfWeek" className="form-label">
                                Passport Number
                            </label>
                            <select
                                className="form-control"
                                name="dayOfWeek"
                                value={dayOfWeek}
                                onChange={(e) => onInputChange(e)}
                            >
                                <option value="">Choose a day of the week</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="track" className="form-label">
                                TRACK
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter track"
                                name="track"
                                value={track}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lessonId" className="form-label">
                                Lesson
                            </label>
                            <select
                                className="form-control"
                                name="lessonId"
                                value={selectedLesson}
                                onChange={(e) => setSelectedLesson(e.target.value)}>
                                <option value="">Select lesson id</option>
                                {lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.category}, {lesson.duration} min
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="swGroupId" className="form-label">
                                Group
                            </label>
                            <select
                                className="form-control"
                                name="swGroupId"
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}>
                                <option value="">Select group id</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.ageCategory}, level: {group.level}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/employee">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}