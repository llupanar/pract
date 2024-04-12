import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function SwGroupForm({isEditing = false}) {

    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const [swgroup, setSwGroup] = useState({
        id: 0,
        level: 0,
        memberCount: 0,
        ageCategory: ""
    });


    const {level, memberCount, ageCategory} = swgroup;
    const {id} = useParams();

    const onInputChange = (e) => {
        setSwGroup({...swgroup, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (isEditing) {
            const loadLwGroup = async () => {
                const result = await axios.get(`${baseUrl}/swgroup/${id.toString()}`);
                setSwGroup(result.data);
            };
            loadLwGroup();
        } else {
            generateUniqueId();
        }
    }, [isEditing, id]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const url = isEditing ? `${baseUrl}/swgroup/${id.toString()}` : `${baseUrl}/swgroup`;
        const method = isEditing ? "put" : "post";
        await axios[method](url, swgroup);
        navigate(isEditing ? "/swgroup" : "/");
    };
    const generateUniqueId = async () => {
        const response = await axios.get(`${baseUrl}/swgroup`);
        const result = response.data;
        let uniqueId = 1;
        if (Array.isArray(result)) {
            const idSet = new Set(result.map(item => item.id));
            while (idSet.has(uniqueId)) {
                uniqueId++;
            }
        }
        swgroup.id = uniqueId;
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">{isEditing ? "Edit" : "Register"} Group </h2>
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