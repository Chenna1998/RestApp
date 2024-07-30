import { useState, useEffect } from "react";
import Navbar from "./navbar";
import axios from "axios";
import '../components/manageronboarding.css';

function ManagerOnboarding() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobTitleOptions, setJobTitleOptions] = useState([]);
    const [msg, setMsg] = useState(null);
    const [errors, setErrors] = useState({});

    let data = {
        "name": name,
        "email": email,
        "contact": contact,
        "userInfo": {
            "username": username,
            "password": password
        }
    }

    useEffect(() => {
        axios.get('http://localhost:8081/api/jobtype', {
            headers: {
                'Authorization': 'Basic ' + localStorage.getItem('token')
            }
        })
            .then(resp => {
                setJobTitleOptions(resp.data);
            });
    }, []);

    const validateForm = () => {
        let formErrors = {};
        if (!name) formErrors.name = 'Name is required';
        if (!email) formErrors.email = 'Email is required';
        if (!contact) formErrors.contact = 'Contact is required';
        if (!username) formErrors.username = 'Username is required';
        if (!password) formErrors.password = 'Password is required';
        if (!jobTitle) formErrors.jobTitle = 'Job title is required';
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const addManager = () => {
        if (validateForm()) {
            axios.post('http://localhost:8081/api/manager/add/', data, {
                headers: {
                    'Authorization': 'Basic ' + localStorage.getItem('token')
                }
            }).then(resp => {
                setMsg('Manager Onboarded Successfully..');
                // Reset the form fields
                setName('');
                setEmail('');
                setContact('');
                setUsername('');
                setPassword('');
                setJobTitle('');
                setErrors({});
            })
                .catch(err => {
                    setMsg('Manager Onboarding Failed.. please contact IT Admin');
                });

            window.scroll(0, 0);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card form-container">
                            <div className="card-header">
                                <h4>Onboard Manager</h4>
                            </div>
                            <div className="card-body manager-form">
                                {
                                    msg && <div className={`alert ${msg.includes('Successfully') ? 'custom-alert' : 'alert-danger'}`} role="alert">
                                        {msg}
                                    </div>
                                }
                                <div className="mb-3">
                                    <h5>Manager Info</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Name:</label>
                                    <input type="text" className="form-control" placeholder="Enter full name" value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Email:</label>
                                    <input type="email" className="form-control" placeholder="Enter email@example.com" value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Contact:</label>
                                    <input type="tel" className="form-control" placeholder="999-999-9999" value={contact}
                                        onChange={(e) => setContact(e.target.value)} />
                                    {errors.contact && <div className="text-danger">{errors.contact}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Select Job Title:</label>
                                    <select className="form-select" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
                                        <option value="" disabled>Select a job title</option>
                                        {jobTitleOptions.map((e, index) => (
                                            <option key={index} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    {errors.jobTitle && <div className="text-danger">{errors.jobTitle}</div>}
                                </div>
                                <div className="mb-3">
                                    <h5>Manager Credentials</h5>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Username:</label>
                                    <input type="text" className="form-control" placeholder="Enter username" value={username}
                                        onChange={(e) => setUsername(e.target.value)} />
                                    {errors.username && <div className="text-danger">{errors.username}</div>}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Enter Password:</label>
                                    <input type="password" className="form-control" placeholder="Enter password" value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                <div className="d-grid">
                                    <button className="btn btn-primary" onClick={addManager}>Add Manager</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerOnboarding;
