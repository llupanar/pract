import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function EmployeeForm({isEditing = false}) {

    let baseUrl = process.env.REACT_APP_BASE_URL;
    let navigate = useNavigate();

    const [employee, setEmployee] = useState({
        passportNumber: "",
        fullName: "",
        experience: false,
        position: "",
    });

    const [jobTitles, setJobTitle] = useState([]);
    const [selectedJobTitle, setSelectedJobTitile] = useState(null);
    const {id} = useParams();
    const {passportNumber, fullName, experience, position} = employee;


    useEffect(() => {
        loadJobTitles();
        if (isEditing) {
            loadEmployee()

        }
    }, [isEditing, id]);

    const loadEmployee = async () => {
        const result = await axios.get(`${baseUrl}/employee/${id.toString()}`);
        const loadedEmployee = result.data;
        setEmployee({
            passportNumber: loadedEmployee.passportNumber,
            fullName: loadedEmployee.fullName,
            experience: loadedEmployee.experience,
        });
        setSelectedJobTitile(loadedEmployee.position);
    };

    const loadJobTitles = async () => {
        const result = await axios.get(`${baseUrl}/job_title`);
        setJobTitle(result.data);
    };

    const onInputChange = (e) => {
        setEmployee({...employee, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        employee.position = selectedJobTitle;
        const selectedJobTitleObj = jobTitles.find((jobTitle) => jobTitle.position.toString() === selectedJobTitle);
        const sendEmployee = {
            ...employee,
            jobTitle: selectedJobTitleObj,
        };
        const url = isEditing ? `${baseUrl}/employee/${id.toString()}` : `${baseUrl}/employee`;
        const method = isEditing ? "put" : "post";
        await axios[method](url, sendEmployee);
        navigate(isEditing ? "/employee" : "/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">{isEditing ? "Edit" : "Register"} Employee </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        {!isEditing && (
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
                        )}
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