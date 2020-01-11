export const UPDATE_EMPLOYEES = 'UPDATE_EMPLOYEES';
export const UPDATE_FILTERED_EMPLOYEES = 'UPDATE_FILTERED_EMPLOYEES';

export const updateEmployees = (employees) => dispatch => {
    dispatch({
        type: UPDATE_EMPLOYEES,
        employees
    })
};

export const updateFilteredEmployees = (filteredEmployees) => dispatch => {
    dispatch({
        type: UPDATE_FILTERED_EMPLOYEES,
        filteredEmployees
    })
};