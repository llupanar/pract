import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function JobTitleForm({isEditing = false}) {

    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const [jobTitle, setJobTitle] = useState({
        position: "",
        salary: 0,
        bonus: false,
    });

    const {position, salary, bonus} = jobTitle;
    const {id} = useParams();

    const onInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setJobTitle({...jobTitle, [e.target.name]: value});
    };

    useEffect(() => {
        if (isEditing) {
            const loadUser = async () => {
                const result = await axios.get(`${baseUrl}/job_title/${id.toString()}`);
                setJobTitle(result.data);
            };
            loadUser();
        }
    }, [isEditing, id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `${baseUrl}/job_title/${id.toString()}` : `${baseUrl}/job_title`;
        const method = isEditing ? "put" : "post";
        await axios[method](url, jobTitle);
        navigate(isEditing ? "/job-title" : "/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">{isEditing ? "Edit" : "Register"} Job Title</h2>
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
                        <Link className="btn btn-outline-danger mx-2" to="/job-title">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}