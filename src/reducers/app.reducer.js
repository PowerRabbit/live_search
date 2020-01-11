import { UPDATE_EMPLOYEES, UPDATE_FILTERED_EMPLOYEES } from '../actions/app.action'

const initialState = {
    employees: [],
    filteredEmployees: []
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMPLOYEES:
            return {
                ...state,
                employees: action.employees
            }
        case UPDATE_FILTERED_EMPLOYEES:
            return {
                ...state,
                filteredEmployees: action.filteredEmployees
            }
        default:
            return state
    }
};