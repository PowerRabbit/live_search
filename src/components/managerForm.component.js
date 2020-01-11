import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateEmployees, updateFilteredEmployees } from '../actions/app.action';
import { getEmployeesData } from '../services/communication.service';

const mapDispatchToProps = dispatch => ({
    updateEmployees: (employees) => dispatch(updateEmployees(employees)),
    updateFilteredEmployees: (filteredEmployees) => dispatch(updateFilteredEmployees(filteredEmployees))
});

const mapStateToProps = state => {
    return {
        employees: state.app.employees,
        filteredEmployees: state.app.filteredEmployees,
    }
};

const addFullText = (employee) => {
    employee.fullText = (employee.firstName + employee.lastName).toLowerCase().replace(/[^\w]/g, '');
    employee.selected = false;
    return employee;
}

const sortEmployees = (a, b) => {
    const nameA = a.firstName;
    const nameB = b.firstName;

    if (nameA === nameB) {
        const lastnameA = a.lastName;
        const lastnameB = b.lastName;

        return lastnameA <= lastnameB ? 1 : -1;

    } else {
        return nameA < nameB ? -1 : 1;
    }
}

function ManagerForm(props) {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const inputEl = useRef(null);

    const handleError = (error) => {
        setRequestInProgress(false);
        props.updateEmployees([]);
        props.updateFilteredEmployees([]);
        alert(error.message);
    }

    const updateFiltered = (_e, employees = props.employees) => {
        const value = inputEl.current.value.toLowerCase().replace(/[^\w]/g, '');

        if (employees.length) {
            if (value) {
                props.updateFilteredEmployees(employees.filter(data => data.fullText.indexOf(value) > -1));
            } else {
                props.updateFilteredEmployees(employees);
            }
        }
    }

    const requestEmployees = () => {
        if (!props.employees.length && !requestInProgress) {
            setRequestInProgress(true);

            getEmployeesData().then(employees => {
                const _employees = employees.map(addFullText).sort(sortEmployees);
                props.updateEmployees(_employees);
                setRequestInProgress(false);
                updateFiltered(null, _employees);
            }).catch(handleError);

        }
    };

    return <div>
        <label htmlFor="managerSearch">Manager</label>
        <input
            id="managerSearch"
            type="text"
            placeholder={props.placeholder}
            onFocus={requestEmployees}
            onInput={updateFiltered}
            ref={inputEl}
        />

        {props.filteredEmployees.map((e, k) => {
            return <div key={k}>{e.firstName} {e.lastName} {e.email}</div>
        })}
        {requestInProgress &&
            <div>Loading...</div>
        }
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerForm);