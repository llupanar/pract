import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditLesson() {
    let navigate = useNavigate();

    const [lesson, setLesson] = useState({
        id: 0,
        category: "",
        duration: 0,
    });

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const { category, duration, empPassNum } = lesson;
    const { id } = useParams();

    useEffect(() => {
        loadEmployees();
        loadLesson();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employee");
        setEmployees(result.data);
    };

    const loadLesson = async () => {
        const result = await axios.get(
            `http://localhost:8080/api/v1/lesson/${id.toString()}`
        );
        const loadedLesson = result.data;
        setLesson({
            id: loadedLesson.id,
            category: loadedLesson.category,
            duration: loadedLesson.duration,
        });

        setSelectedEmployee(loadedLesson.employee.passportNumber);
    };

    const onInputChange = (e) => {
        setLesson({ ...lesson, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const updatedLesson = {
            ...lesson,
            employee: selectedEmployeeObj,
        };
        axios
            .put(`http://localhost:8080/api/v1/lesson/${id.toString()}`, updatedLesson)
            .then((response) => {})
            .catch((error) => {});
        navigate("/lesson");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Client</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
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
                                value={selectedEmployee ? selectedEmployee.passportNumber : ""}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option value="">Select employee passport number</option>
                                {employees.map((employee) => (
                                    <option
                                        key={employee.passportNumber}
                                        value={employee.passportNumber}
                                    >
                                        {employee.passportNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Update Client
                        </button>
                        <Link to="/lesson" className="btn btn-secondary mt-2 w-100">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}