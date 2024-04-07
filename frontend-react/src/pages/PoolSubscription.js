import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function PoolSubscription() {
    const [subs, setSubscriptions] = useState([]);

    const loadPoolSubscriptions = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/pool_subscription");
        setSubscriptions(result.data);
    };

    useEffect(() => {
        loadPoolSubscriptions();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/api/v1/pool_subscription/${id}`);
        loadPoolSubscriptions();
    };

    return (
        <div style={{ backgroundColor: '#333', minHeight: '92vh', minWidth:'100hv'}}>
            <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Type</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Group</th>
                        <th scope="col">
                            <Link
                                className="btn btn-no-outline mx-1"
                                to={`/add-job-title`}
                            >
                                ➕
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {subs.map((subscription, index) => (
                        <tr key={index}>
                            <td>{subscription.id}</td>
                            <td>{subscription.type}</td>
                            <td>{subscription.endDate}</td>
                            <td>{subscription.cost}</td>
                            <td>{subscription.swGroupId}</td>

                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-job-title/${subscription.id}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(subscription.id)}
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