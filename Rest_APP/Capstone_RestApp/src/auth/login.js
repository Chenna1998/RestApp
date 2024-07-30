import { useState } from 'react';
import './login.css';
import { Button } from 'primereact/button';
import axios from 'axios';
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [errMsg, setErrMsg] = useState('');
    const [param] = useSearchParams();
    const navigate = useNavigate();
    const [msg] = useState(param.get('msg'));

    const onLogin = () => {
        let token = window.btoa(username + ":" + password)
        axios.get('http://localhost:8081/api/login', {
            headers: {
                'Authorization': 'Basic ' + token
            }
        })
            .then(response => {
                console.log(response.data)
                let user = {
                    'token': token,
                    'username': username,
                    'role': response.data.role
                }
                localStorage.setItem('token', token)
                localStorage.setItem('username', username)
                localStorage.setItem('role', user.role)

                if (user.role === 'HR') {
                    navigate('/hr');
                    return;
                }
                else if (user.role === 'MANAGER') {
                    navigate('/manager');
                    return;
                } if (user.role === 'EMPLOYEE') {
                    navigate('/employee')
                    return;
                }

            })
            .catch(error => { setErrMsg('Invalid Credentials') })

    }

    return (
        <div className="page">
            <div className="cover">
                <div className="incedo-container">
                    <div className="incedo"></div>
                    <h1 className="login-title">Login</h1>
                </div>
                <div>{errMsg}</div>
                {
                    msg === "" || msg === undefined || msg === null ? '' : <div className="alert alert-dark" role="alert">
                        You have logged Out
                    </div>
                }
                <input type="text" placeholder="username" className="inpt" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" className="inpt" onChange={(e) => setPassword(e.target.value)} />
                <Button label="LogIn" className="login-btn" onClick={() => onLogin()} />
            </div>
        </div>
    );
}

export default Login;
