import { GET_ALL_EMPLOYEE, ADD_EMPLOYEE } from '../action/employee';

const initialState = {
    list: []
};

const employee = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_EMPLOYEE:
            return { ...state, list: action.payload };
        case ADD_EMPLOYEE:
            return { ...state, list: [...state.list, action.payload] };
        default:
            return state;
    }
};

export default employee;