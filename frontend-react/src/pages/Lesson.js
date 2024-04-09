import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Lesson() {
    const [lessons, setLessons] = useState([]);

    const loadLessons = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/lesson");
        setLessons(result.data);
    };

    useEffect(() => {
        loadLessons();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/lesson/${id}`);
        loadLessons();
    };

    return (
        <div style={{ backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px' }}>
            <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Employee</th>
                        <th scope="col">
                            <Link
                                className="btn btn-no-outline mx-1"
                                to={`/add-lesson`}
                            >
                                ➕
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {lessons.map((lesson, index) => (
                        <tr key={index}>
                            <td>{lesson.category}</td>
                            <td>{lesson.duration}</td>
                            <td>{lesson.employee.fullName}</td>
                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-lesson/${lesson.id}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(lesson.id)}
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