import Navbar from "./navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import '../components/employeeonboarding.css';

function EmployeeOnBoarding() {
    const [jobTitle, setJobTitle] = useState([]);
    const [managers, setManagers] = useState([]);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [salary, setSalary] = useState('');
    const [jobTitleVal, setJobTitleVal] = useState('');
    const [managerId, setManagerId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/api/jobtype', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
            .then(resp => setJobTitle(resp.data));

        axios.get('http://localhost:8081/api/manager/all', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        }).then(resp => setManagers(resp.data));
    }, []);

    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'Name is required';
        if (!city) formErrors.city = 'City is required';
        if (!salary) formErrors.salary = 'Salary is required';
        if (!jobTitleVal) formErrors.jobTitleVal = 'Job title is required';
        if (!managerId) formErrors.managerId = 'Manager is required';
        if (!username) formErrors.username = 'Username is required';
        if (!password) formErrors.password = 'Password is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const addEmployee = () => {
        if (validateForm()) {
            const data = {
                name,
                city,
                salary,
                jobTitle: jobTitleVal,
                userInfo: {
                    username,
                    password
                }
            };

            axios.post('http://localhost:8081/api/employee/add/' + managerId, data, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            }).then(resp => {
                setMsg('Employee Onboarded Successfully..');
                // Reset the form fields
                setName('');
                setCity('');
                setSalary('');
                setJobTitleVal('');
                setManagerId('');
                setUsername('');
                setPassword('');
                setErrors({});
            })
                .catch(err => {
                    setMsg('Employee Onboarding Failed.. please contact IT Admin');
                });

            window.scroll(0, 0);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4" style={{ width: '50%' }}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card form-container">
                            <div className="card-header">
                                <h4>Onboard Employee</h4>
                            </div>
                            <div className="card-body employee-form">
                                {msg && (
                                    <div className={`alert ${msg.includes('Successfully') ? 'custom-alert' : 'alert-danger'}`} role="alert">
                                        {msg}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <h5>Employee Info</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter City:</label>
                                    <input type="text" className="form-control" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                                    {errors.city && <div className="text-danger">{errors.city}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Salary:</label>
                                    <input type="number" className="form-control" placeholder="Enter salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                                    {errors.salary && <div className="text-danger">{errors.salary}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Job Title:</label>
                                    <select className="form-select" value={jobTitleVal} onChange={(e) => setJobTitleVal(e.target.value)}>
                                        <option value="" disabled>Select a job title</option>
                                        {jobTitle.map((e, index) => (
                                            <option key={index} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    {errors.jobTitleVal && <div className="text-danger">{errors.jobTitleVal}</div>}
                                </div>
                                <div className="mb-3">
                                    <h5>Assign Manager</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Manager:</label>
                                    <select className="form-select" value={managerId} onChange={(e) => setManagerId(e.target.value)}>
                                        <option value="" disabled>Select a manager</option>
                                        {managers.map((m, index) => (
                                            <option key={index} value={m.id}>{m.name}</option>
                                        ))}
                                    </select>
                                    {errors.managerId && <div className="text-danger">{errors.managerId}</div>}
                                </div>
                                <div className="mb-3">
                                    <h5>Employee Credentials</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Username:</label>
                                    <input type="text" className="form-control" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                    {errors.username && <div className="text-danger">{errors.username}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeOnBoarding;
