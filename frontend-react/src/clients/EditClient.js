import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditClient() {
    let navigate = useNavigate();

    const [client, setClient] = useState({
        passportNumber: "",
        fullName: "",
        medicalCertificate: false
    });

    const [employees, setEmployees] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        loadEmployees();
        loadSubscriptions();
        loadClient();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employee");
        setEmployees(result.data);
    };

    const loadSubscriptions = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/pool_subscription");
        setSubscriptions(result.data);
    };

    const loadClient = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/client/${id.toString()}`);
        const loadedClient = result.data;
        setClient({
            passportNumber: loadedClient.passportNumber,
            fullName: loadedClient.fullName,
            medicalCertificate: loadedClient.medicalCertificate,
        });

        setSelectedEmployee(loadedClient.employee.passportNumber);
        setSelectedSubscription(loadedClient.subscription.id);
    };

    const { passportNumber, fullName, medicalCertificate } = client;

    const onInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setClient({ ...client, [e.target.name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const selectedSubscriptionObj = subscriptions.find((subscription) => subscription.id === selectedSubscription);

        const updatedClient = {
            ...client,
            employee: selectedEmployeeObj,
            subscription: selectedSubscriptionObj
        };
        axios
            .put(`http://localhost:8080/api/v1/client/${id.toString()}`, updatedClient)
            .then(response => {})
            .catch(error => {});
        navigate("/client");
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit Client</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="passportNumber" className="form-label">
                                Passport Number
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter passport number"
                                name="passportNumber"
                                value={passportNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label">
                                Full name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter full name"
                                name="fullName"
                                value={fullName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="medicalCertificate"
                                    checked={medicalCertificate}
                                    onChange={(e) => onInputChange(e)}
                                />
                                <label className="form-check-label">Has bonus?</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="empPassNum" className="form-label">
                                Employee passport number
                            </label>
                            <select
                                className="form-control"
                                name="empPassNum"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option value="">Select employee passport number</option>
                                {employees.map((employee) => (
                                    <option key={employee.passportNumber} value={employee.passportNumber}>
                                        {employee.passportNumber}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subscriptionId" className="form-label">
                                Subscription ID
                            </label>
                            <select
                                className="form-control"
                                name="subscriptionId"
                                value={selectedSubscription}
                                onChange={(e) => setSelectedSubscription(e.target.value)}
                            >
                                <option value="">Select subscription ID</option>
                                {subscriptions.map((subscription) => (
                                    <option key={subscription.id} value={subscription.id}>
                                        {subscription.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Update Client
                        </button>
                        <Link to="/client" className="btn btn-secondary mt-2 w-100">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}