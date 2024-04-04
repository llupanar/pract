import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewJobTitle() {
    const [jobTitile, setJobTitile] = useState({
        position: "",
        salary: 0,
        bonus: false,
    });

    const { position } = useParams();

    useEffect(() => {
        const loadUser = async () => {
            const result = await axios.get(`http://localhost:8080/api/v1/job_title/${position}`);
            setJobTitile(result.data);
        };

        loadUser();
    }, [position]);

    return (
        <div className="container">
            <div className="row">
                <div className="shadow">
                    <h2 className="text-center m-4">User Details</h2>
                    <div className="card">
                        <div className="card-header">
                            Details of user id : {jobTitile.position}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Salary:</b>
                                    {jobTitile.salary}
                                </li>
                                <li className="list-group-item">
                                    <b>Bonus:</b>
                                    {jobTitile.bonus}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}