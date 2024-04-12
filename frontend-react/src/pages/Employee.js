import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Employee() {
    const [employees, setEmployees] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadEmployees = async () => {
        const result = await axios.get(`${baseUrl}/employee`);
        setEmployees(result.data);
    };

    useEffect(() => {
        loadEmployees()
    }, []);

    const deleteUser = async (passportNumber) => {
        await axios.delete(`${baseUrl}/employee/${passportNumber}`);
        loadEmployees();
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Full name</th>
                            <th scope="col">Experience</th>
                            <th scope="col">Position</th>
                            <th scope="col">
                                <Link
                                    className="btn btn-no-outline mx-1"
                                    to={`/add-employee`}
                                >
                                    ➕
                                </Link>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.fullName}</td>
                                <td>{employee.experience}</td>
                                <td>{employee.position}</td>
                                <td>
                                    <Link
                                        className="btn btn-no-outline mx-2"
                                        to={`/edit-employee/${employee.passportNumber}`}
                                    >
                                        &#x270E;
                                    </Link>
                                    <button
                                        className="btn btn-no-outline mx-2"
                                        onClick={() => deleteUser(employee.passportNumber)}
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