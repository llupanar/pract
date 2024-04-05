import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function JobTitle() {
    const [jobTitiles, setJobTitles] = useState([]);

    const loadJobTitles = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/job_title");
        setJobTitles(result.data);
    };

    useEffect(() => {
        loadJobTitles();
    }, []);

    const deleteUser = async (position) => {
        await axios.delete(`http://localhost:8080/api/v1/job_title/${position}`);
        loadJobTitles();
    };

    const renderBonus = (bonus) => {
        return bonus ? "true" : "false";
    };

    return (
        <div className="container" style={{ backgroundColor: '#333', minHeight: '100vh', minWidth:'100hv'}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Position</th>
                        <th scope="col">Salary</th>
                        <th scope="col">Bonus</th>
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
                    {jobTitiles.map((jobTitle, index) => (
                        <tr key={index}>
                            <td>{jobTitle.position}</td>
                            <td>{jobTitle.salary}</td>
                            <td>{renderBonus(jobTitle.bonus)}</td>
                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-job-title/${jobTitle.position}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(jobTitle.position)}
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
    );
}