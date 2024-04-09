import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddEmployee() {
    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        passportNumber: "",
        fullName: "",
        experience: false,
        position: "",
    });

    const [jobTitles, setJobTitle] = useState([]);
    const [selectedJobTitle, setSelectedJobTitile] = useState(null);

    useEffect(() => {
        loadJobTitles();
    }, []);

    const loadJobTitles = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/job_title");
        setJobTitle(result.data);
    };

    const { passportNumber, fullName, experience, position } = employee;

    const onInputChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        employee.position=selectedJobTitle;
        const selectedJobTitleObj = jobTitles.find((jobTitle) => jobTitle.position.toString() === selectedJobTitle);
        const updatedEmployee = {
            ...employee,
            jobTitle: selectedJobTitleObj,
        };

        await axios.post("http://localhost:8080/api/v1/employee", updatedEmployee);
        navigate("/employee");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="passportNumber" className="form-label">
                                Passport Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter passport number"
                                name="passportNumber"
                                value={passportNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
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
                                onChange={(e) => setSelectedJobTitile(e.target.value)}>
                                <option value="">Select position</option>
                                {jobTitles.map((jobTitle) => (
                                    <option key={jobTitle.position} value={jobTitle.position}>
                                        {jobTitle.position}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/employee">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}