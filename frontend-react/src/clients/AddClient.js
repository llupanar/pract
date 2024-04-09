import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddClient() {
    let navigate = useNavigate();

    const [client, setClient] = useState({
        passportNumber: "",
        fullName: "",
        medicalCertificate: false,
        empPassNum: "",
        subscriptionId: ""
    });

    const [employees, setEmployees] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    useEffect(() => {
        loadEmployees();
        loadSubscriptions();
    }, []);

    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/employee");
        setEmployees(result.data);
    };

    const loadSubscriptions = async () => {
        const result = await axios.get("http://localhost:8080/api/v1/pool_subscription");
        setSubscriptions(result.data);
    };

    const { passportNumber, fullName, medicalCertificate, empPassNum, subscriptionId } = client;

    const onInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setClient({ ...client, [e.target.name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        client.subscriptionId=selectedSubscription;
        client.empPassNum=selectedEmployee;
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const selectedSubscriptionObj = subscriptions.find((subscription) => subscription.id.toString() === selectedSubscription);
        console.log(selectedSubscriptionObj);
        const updatedClient = {
            ...client,
            subscription: selectedSubscriptionObj,
            employee: selectedEmployeeObj
        };

        await axios.post("http://localhost:8080/api/v1/client", updatedClient);
        navigate("/client");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Register Client</h2>
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
                                <label className="form-check-label">Has medical certificate?</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subscriptionId" className="form-label">
                                Subscription
                            </label>
                            <select
                                className="form-control"
                                name="subscription"
                                value={selectedSubscription}
                                onChange={(e) => setSelectedSubscription(e.target.value)}
                            >
                                <option value="">Select subscription</option>
                                {subscriptions.map((subscription) => (
                                    <option key={subscription.id} value={subscription.id}>
                                        {subscription.type} to {subscription.endDate}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/lesson">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}