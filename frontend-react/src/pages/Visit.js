import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Visit() {
    const [visits, setVisits] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadVisits = async () => {
        const result = await axios.get(`${baseUrl}/visit`);
        setVisits(result.data);
    };

    useEffect(() => {
        loadVisits();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`${baseUrl}/visit/${id}`);
        loadVisits();
    };

    const renderAttended = (attended) => {
        return attended ? "yes" : "no";
    };
    const formatDateTime = (dateTime) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return new Date(dateTime).toLocaleString('en-US', options);
    };
    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Employee</th>
                            <th scope="col">Client</th>
                            <th scope="col">Lesson</th>
                            <th scope="col">Attended</th>
                            <th scope="col">➕</th>
                        </tr>
                        </thead>
                        <tbody>
                        {visits.map((visit, index) => (
                            <tr key={index}>
                                <td>{formatDateTime(visit.dateTime)}</td>
                                <td>{visit.employee.fullName}</td>
                                <td>{visit.client.fullName}</td>
                                <td>{visit.lesson.category} {visit.lesson.duration} min</td>
                                <td>{renderAttended(visit.attended)}</td>
                                <td>
                                    &#x270E;
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