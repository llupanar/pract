import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditEmloyee() {
    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        passportNumber: "",
        fullName: "",
        experience: 0
    });
    const [jobTitles, setJobTitle] = useState([]);
    const [selectedJobTitle, setSelectedJobTitile] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        loadJobTitles();
        loadEmployee()
    }, []);

    const loadJobTitles = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/job_title");
        setJobTitle(result.data);
    };

    const loadEmployee = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/employee/${id.toString()}`);
        const loadedEmployee = result.data;
        setEmployee({
            passportNumber: loadedEmployee.passportNumber,
            fullName: loadedEmployee.fullName,
            experience: loadedEmployee.experience,
        });
        setSelectedJobTitile(loadedEmployee.position);
    };

    const { passportNumber, fullName, experience } = employee;

    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const selectedJobTitleObj = jobTitles.find((jobTitle) => jobTitle.position.toString() === selectedJobTitle);
        const updatedEmployee = {
            ...employee,
            jobTitle: selectedJobTitleObj,
        };
        axios.put(`http://localhost:8080/api/v1/employee/${id.toString()}`, updatedEmployee)
            .then(response => {

            })
            .catch(error => {
            });
        navigate("/employee");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Employee</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter full name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="experience" className="form-label">
                                Experience
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter experience"
                                name="experience"
                                value={experience}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="position" className="form-label">
                                Position
                            </label>
                            <select
                                className="form-control"
                                name="position"
                                value={selectedJobTitle}
                                onChange={(e) => setSelectedJobTitile(e.target.value)}
                            >
                                <option value="">Select position</option>
                                {jobTitles.map((jobTitle) => (
                                    <option key={jobTitle.position} value={jobTitle.position}>
                                        {jobTitle.position}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Update Client
                        </button>
                        <Link to="/client" className="btn btn-secondary mt-2 w-100">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}