import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
        return medicalCertificate ? "true" : "false";
    };

    return (
        <div className="container" style={{ backgroundColor: '#333', minHeight: '100vh', padding: '20px'}}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">Passport number</th>
                        <th scope="col">Full name</th>
                        <th scope="col">Med. certificate</th>
                        <th scope="col">Employee</th>
                        <th scope="col">Subscription ID</th>
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
                            <td>{client.passportNumber}</td>
                            <td>{client.fullName}</td>
                            <td>{renderMedicalCertificate(client.medicalCertificate)}</td>
                            <td>{client.empPassNum}</td>
                            <td>{client.subscriptionId}</td>
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
    );
}