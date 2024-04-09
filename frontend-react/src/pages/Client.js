import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Client() {
    const [clients, setClients] = useState([]);

    const loadClients = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/client");
        setClients(result.data);
    };

    useEffect(() => {
        loadClients()
    }, []);

    const deleteUser = async (passportNumber) => {
        await axios.delete(`http://localhost:8080/api/v1/client/${passportNumber}`);
        loadClients();
    };

    const renderMedicalCertificate = (medicalCertificate) => {
        return medicalCertificate ? "yes" : "no";
    };

    return (
        <div style={{backgroundColor: '#333', color: '#fff', minHeight: '92vh', padding: '20px'}}>
            <div className="container">
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Full name</th>
                        <th scope="col">Med. certificate</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">
                            <Link
                                className="btn btn-no-outline mx-1"
                                to={`/add-client`}
                            >
                                ➕
                            </Link>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client, index) => (
                        <tr key={index}>
                            <td>{client.fullName}</td>
                            <td>{renderMedicalCertificate(client.medicalCertificate)}</td>
                            <td>{client.employee.fullName}</td>
                            <td>{client.subscription.type} (to {client.subscription.endDate})</td>
                            <td>
                                <Link
                                    className="btn btn-no-outline mx-2"
                                    to={`/edit-client/${client.passportNumber}`}
                                >
                                    &#x270E;
                                </Link>
                                <button
                                    className="btn btn-no-outline mx-2"
                                    onClick={() => deleteUser(client.passportNumber)}
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