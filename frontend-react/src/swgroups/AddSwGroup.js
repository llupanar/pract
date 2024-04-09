import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddSwGroup() {
    let navigate = useNavigate();

    const [swgroup, setSwGroup] = useState({
        id: 0,
        level: 0,
        memberCount: 0,
        ageCategory: ""
    });

    const { id, level, memberCount,ageCategory } = swgroup;

    const onInputChange = (e) => {
        setSwGroup({ ...swgroup, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/v1/swgroup", swgroup);
        navigate("/");
    };
    const generateUniqueId = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/swgroup");
        let uniqueId = 1;
        if (Array.isArray(result)) {
            const idSet = new Set(result.map(item => item.id));
            while (idSet.has(uniqueId)) {
                uniqueId++;
            }
        }
        swgroup.id= uniqueId;
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Group</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="level" className="form-label">
                                Level
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter level"
                                name="level"
                                value={level}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="memberCount" className="form-label">
                                Member Count
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter member count"
                                name="memberCount"
                                value={memberCount}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ageCategory" className="form-label">
                                Age category
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter age category"
                                name="ageCategory"
                                value={ageCategory}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/swgroup">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}