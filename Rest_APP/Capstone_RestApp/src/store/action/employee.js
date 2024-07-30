import axios from 'axios';

export const GET_ALL_EMPLOYEE = 'GET_ALL_EMPLOYEE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';

export const getEmployees = () => (dispatch) => {
    axios.get('http://localhost:8081/api/manager/employee', {
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('token')
        }
    })
    .then(response => {
        // Filter out employees with the role of 'manager'
        const employees = response.data.filter(emp => emp.role !== 'manager');
        dispatch({
            type: GET_ALL_EMPLOYEE,
            payload: employees
        });
    })
    .catch(error => {
        console.error("Failed to fetch employees", error);
    });
};

export const addEmployee = (employee) => ({
    type: ADD_EMPLOYEE,
    payload: employee
});