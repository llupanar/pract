import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Visit() {
    const [visits, setVisits] = useState([]);

    const loadVisits = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/visit");
        setVisits(result.data);
    };

    useEffect(() => {
        loadVisits();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/visit/${id}`);
        loadVisits();
    };

    const renderAttended = (attended) => {
        return attended ? "true" : "false";
    };
    const formatDateTime = (dateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(dateTime).toLocaleString('en-US', options);
    };
    return (
        <div style={{ backgroundColor: '#333', minHeight: '92vh', minWidth:'100hv'}}>
            <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Attended</th>
                        <th scope="col">Date/Time</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Client</th>
                        <th scope="col">Lesson</th>
                        <th scope="col">
                            <Link
                                className="btn btn-no-outline mx-1"
                                to={`/add-job-title`}
                            >
                                ➕
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {visits.map((visit, index) => (
                        <tr key={index}>
                            <td>{visit.id}</td>
                            <td>{renderAttended(visit.attended)}</td>
                            <td>{formatDateTime(visit.dateTime)}</td>
                            <td>{visit.empPassNum}</td>
                            <td>{visit.clientPassNum}</td>
                            <td>{visit.lessonId}</td>
                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-job-title/${visit.id}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(visit.id)}
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