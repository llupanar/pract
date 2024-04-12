import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function JobTitle() {
    const [jobTitiles, setJobTitles] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadJobTitles = async () => {
        const result = await axios.get(`${baseUrl}/job_title`);
        setJobTitles(result.data);
    };

    useEffect(() => {
        loadJobTitles();
    }, []);

    const deleteUser = async (position) => {
        await axios.delete(`${baseUrl}/job_title/${position}`);
        loadJobTitles();
    };

    const renderBonus = (bonus) => {
        return bonus ? "yes" : "no";
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
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
        </div>
    );
}