import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddJobTitle() {
    let navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState({
        position: "",
        salary: 0,
        bonus: false,
    });

    const { position, salary, bonus } = jobTitle;

    const onInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setJobTitle({ ...jobTitle, [e.target.name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/job_title", jobTitle);
        navigate("/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Position
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter position"
                                name="position"
                                value={position}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Position" className="form-label">
                                Salary
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter salary"
                                name="salary"
                                value={salary}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="bonus"
                                    checked={bonus}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <label className="form-check-label">has bonus?</label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}