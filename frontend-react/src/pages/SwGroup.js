import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function SwGroup() {
    const [swgroups, setSwGroups] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadLwGroups = async () => {
        const result = await axios.get(`${baseUrl}/swgroup`);
        setSwGroups(result.data);
    };

    useEffect(() => {
        loadLwGroups();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`${baseUrl}/v1/swgroup/${id}`);
        loadLwGroups();
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Age category</th>
                            <th scope="col">Level</th>
                            <th scope="col">Member</th>
                            <th scope="col">
                                <Link
                                    className="btn btn-no-outline mx-1"
                                    to={`/add-swgroup`}
                                >
                                    ➕
                                </Link>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {swgroups.map((swgroup, index) => (
                            <tr key={index}>
                                <td>{swgroup.ageCategory}</td>
                                <td>{swgroup.level}</td>
                                <td>{swgroup.memberCount}</td>
                                <td>
                                    <Link
                                        className="btn btn-no-outline mx-2"
                                        to={`/edit-swgroup/${swgroup.id}`}
                                    >
                                        &#x270E;
                                    </Link>
                                    <button
                                        className="btn btn-no-outline mx-2"
                                        onClick={() => deleteUser(swgroup.id)}
                                    >
                                        ✖
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}