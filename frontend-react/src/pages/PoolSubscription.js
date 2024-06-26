import React, {useEffect, useState} from "react";
import axios from "axios";

export default function PoolSubscription() {
    const [subs, setSubscriptions] = useState([]);
    let baseUrl = process.env.REACT_APP_BASE_URL;

    const loadPoolSubscriptions = async () => {
        const result = await axios.get(`${baseUrl}/pool_subscription`);
        setSubscriptions(result.data);
    };

    useEffect(() => {
        loadPoolSubscriptions();
    }, []);

    const deleteUser = async (id) => {
        await axios.delete(`${baseUrl}/pool_subscription/${id}`);
        loadPoolSubscriptions();
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
                <div className="py-4">
                    <table className="table border shadow">
                        <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Cost</th>
                            <th scope="col">Group</th>
                            <th scope="col">➕</th>
                        </tr>
                        </thead>
                        <tbody>
                        {subs.map((subscription, index) => (
                            <tr key={index}>
                                <td>{subscription.type}</td>
                                <td>{subscription.endDate}</td>
                                <td>{subscription.cost}</td>
                                <td>{subscription.swGroup.ageCategory}, level: {subscription.swGroup.level}</td>

                                <td>
                                    &#x270E;
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