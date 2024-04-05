import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Employee() {
    const [employees, setEmployees] = useState([]);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employee");
        setEmployees(result.data);
    };

    useEffect(() => {
        loadEmployees()
    }, []);

    const deleteUser = async (passportNumber) => {
        await axios.delete(`http://localhost:8080/api/v1/employee/${passportNumber}`);
        loadEmployees();
    };

    return (
        <div className="container" style={{ backgroundColor: '#333', minHeight: '100vh', minWidth:'100hv'}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Passport number</th>
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
                            <td>{employee.passportNumber}</td>
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
    );
}