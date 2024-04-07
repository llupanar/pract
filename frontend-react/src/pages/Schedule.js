import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Schedule() {
    const [schedules, setSchedules] = useState([]);

    const loadSchedules = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/schedule");
        setSchedules(result.data);
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/schedule/${id}`);
        loadSchedules();
    };

    return (
        <div style={{backgroundColor: '#333', minHeight: '92vh', minWidth: '100hv'}}>
            <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Day</th>
                        <th scope="col">Time</th>
                        <th scope="col">Track</th>
                        <th scope="col">Lesson</th>
                        <th scope="col">Group</th>
                        <th scope="col">
                            <Link
                                className="btn btn-no-outline mx-1"
                                to={`/add-schedule`}
                            >
                                ➕
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{schedule.id}</td>
                            <td>{schedule.dayOfWeek}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.track}</td>
                            <td>{schedule.lessonId}</td>
                            <td>{schedule.swGroupId}</td>
                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-job-title/${schedule.id}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(schedule.id)}
                                >
                                    ✖
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}