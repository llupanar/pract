import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

export default function EditSwGroup() {
    let navigate = useNavigate();

    const [swgroup, setSwGroup] = useState({
        id: 0,
        level: 0,
        memberCount: 0,
        ageCategory: ""
    });

    const { level, memberCount,ageCategory } = swgroup;
    const { id } = useParams();

    const onInputChange = (e) => {
        setSwGroup({ ...swgroup, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        console.log(id.toString());
        const loadLwGroup = async () => {
            const result = await axios.get(`http://localhost:8080/api/v1/swgroup/${id.toString()}`);
            setSwGroup(result.data);
        };

        loadLwGroup();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`http://localhost:8080/api/v1/swgroup/${id.toString()}`, swgroup);
        navigate("/swgroup");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Group</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="level" className="form-label">
                                level
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter level"
                                name="level"
                                value={level}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="memberCount" className="form-label">
                                Member count
                            </label>
                            <input
                                type={"number"}
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
                                type={"text"}
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