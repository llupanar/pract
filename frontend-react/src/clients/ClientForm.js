import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

export default function ClientForm({isEditing = false}) {

    let navigate = useNavigate();
    let baseUrl = process.env.REACT_APP_BASE_URL;

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
    const {passportNumber, fullName, medicalCertificate} = client;
    const {id} = useParams();

    useEffect(() => {
        loadEmployees();
        loadSubscriptions();
        if (isEditing) {
            loadClient();
        }
    }, [isEditing, id]);

    const loadEmployees = async () => {
        const result = await axios.get(`${baseUrl}/employee`);
        setEmployees(result.data);
    };

    const loadSubscriptions = async () => {
        const result = await axios.get(`${baseUrl}/pool_subscription`);
        setSubscriptions(result.data);
    };

    const loadClient = async () => {
        const result = await axios.get(`${baseUrl}/client/${id.toString()}`);
        const loadedClient = result.data;
        setClient({
            passportNumber: loadedClient.passportNumber,
            fullName: loadedClient.fullName,
            medicalCertificate: loadedClient.medicalCertificate,
        });

        setSelectedEmployee(loadedClient.employee.passportNumber);
        setSelectedSubscription(loadedClient.subscription.id);
    };

    const onInputChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setClient({...client, [e.target.name]: value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        client.subscriptionId = selectedSubscription;
        client.empPassNum = selectedEmployee;
        const selectedEmployeeObj = employees.find((employee) => employee.passportNumber === selectedEmployee);
        const selectedSubscriptionObj = subscriptions.find((subscription) => subscription.id.toString() === selectedSubscription);
        const sendClient = {
            ...client,
            subscription: selectedSubscriptionObj,
            employee: selectedEmployeeObj
        };

        const url = isEditing ? `${baseUrl}/client/${id.toString()}` : `${baseUrl}/client`;
        const method = isEditing ? "put" : "post";
        await axios[method](url, sendClient);
        navigate(isEditing ? "/client" : "/");
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">{isEditing ? "Edit" : "Register"} Client </h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        {!isEditing && (
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
                        )}
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
                        <div className="mb-3">
                            <label htmlFor="employee" className="form-label">
                                Employee
                            </label>
                            <select
                                className="form-control"
                                name="employee"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                            >
                                <option value="">Select employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.passportNumber} value={employee.passportNumber}>
                                        {employee.fullName} exp. {employee.experience}
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