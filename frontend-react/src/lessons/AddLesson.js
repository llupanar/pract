import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddLesson() {
    let navigate = useNavigate();

    const [lesson, setLesson] = useState({
        id: 0,
        category: "",
        duration: 0,
        empPassNum: "",
    });

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employee");
        setEmployees(result.data);
    };

    const { id, category, duration, empPassNum } = lesson;

    const onInputChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        lesson.empPassNum=selectedEmployee;
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const updatedLesson = {
            ...lesson,
            employee: selectedEmployeeObj
        };

        await axios.post("http://localhost:8080/api/v1/lesson", updatedLesson);
        navigate("/lesson");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Client</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label">
                                ID
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter category"
                                name="id"
                                value={id}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                name="category"
                                value={category}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="duration" className="form-label">
                                Duration
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter duration"
                                name="duration"
                                value={duration}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="empPassNum" className="form-label">
                                Employee passport number
                            </label>
                            <select
                                className="form-control"
                                name="empPassNum"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option value="">Select employee passport number</option>
                                {employees.map((employee) => (
                                    <option key={employee.passportNumber} value={employee.passportNumber}>
                                        {employee.passportNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/lesson">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}