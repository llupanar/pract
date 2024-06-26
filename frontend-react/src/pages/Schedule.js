import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Schedule() {
    const [schedules, setSchedules] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadSchedules = async () => {
        const result = await axios.get(`${baseUrl}/schedule`);
        setSchedules(result.data);
    };

    useEffect(() => {
        loadSchedules();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`${baseUrl}/schedule/${id}`);
        loadSchedules();
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
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
                                <td>{schedule.dayOfWeek}</td>
                                <td>{schedule.time}</td>
                                <td>{schedule.track}</td>
                                <td>{schedule.lesson.category} {schedule.lesson.duration} min</td>
                                <td>{schedule.swGroup.ageCategory}, level: {schedule.swGroup.level}</td>
                                <td>
                                    <Link
                                        className="btn btn-no-outline mx-2"
                                        to={`/edit-schedule/${schedule.id}`}
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