import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function LessonForm({isEditing = false}) {

    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const [lesson, setLesson] = useState({
        id: 0,
        category: "",
        duration: 0,
        empPassNum: ""
    });

    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        loadEmployees();
        if (isEditing) {
            loadLesson()
        } else {
            generateUniqueId();
        }
    }, [isEditing, id]);

    const loadEmployees = async () => {
        const result = await axios.get(`${baseUrl}/employee`);
        setEmployees(result.data);
    };

    const loadLesson = async () => {
        const result = await axios.get(`${baseUrl}/lesson/${id.toString()}`);
        const loadedLesson = result.data;
        setLesson({
            id: loadedLesson.id,
            category: loadedLesson.category,
            duration: loadedLesson.duration,
        });

        setSelectedEmployee(loadedLesson.employee.passportNumber);
    };
    const onInputChange = (e) => {
        setLesson({...lesson, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        lesson.empPassNum = selectedEmployee;
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const sendLesson = {
            ...lesson,
            employee: selectedEmployeeObj
        };

        const url = isEditing ? `${baseUrl}/lesson/${id.toString()}` : `${baseUrl}/lesson`;
        const method = isEditing ? "put" : "post";
        await axios[method](url, sendLesson);
        navigate(isEditing ? "/lesson" : "/");
    };

    const generateUniqueId = async () => {
        const response = await axios.get(`${baseUrl}/lesson`);
        const result = response.data;
        let uniqueId = 1;
        if (Array.isArray(result)) {
            const idSet = new Set(result.map(item => item.id));
            while (idSet.has(uniqueId)) {
                uniqueId++;
            }
        }
        lesson.id = uniqueId;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">{isEditing ? "Edit" : "Register"} Lesson </h2>
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
                                value={lesson.category}
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
                                value={lesson.duration}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="empPassNum" className="form-label">
                                Teacher
                            </label>
                            <select
                                className="form-control"
                                name="empPassNum"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option value="">Select teacher</option>
                                {employees.map((employee) => (
                                    <option key={employee.passportNumber} value={employee.passportNumber}>
                                        {employee.fullName}, exp. {employee.experience}
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