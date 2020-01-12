import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateEmployees, updateFilteredEmployees } from '../../actions/app.action';
import { getEmployeesData } from '../../services/communication.service';
import styles from './managerForm.module.css';
import ManagerEntry from '../managerEntry/managerEntry.component';
import ArrowIcon from '../arrowIcon/arrowIcon.component';


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
    employee.abbr = (employee.firstName[0] + employee.lastName[0]);
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
let doNotClose = false;

function ManagerForm(props) {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [showList, setShowList] = useState(false);
    const componentEl = useRef(null);
    const inputEl = useRef(null);

    const handleGlobalMouseup = (e) => {
        doNotClose = false;
        window.removeEventListener('mouseup', handleGlobalMouseup);
    };

    const handleGlobalMousedown = (e) => {
        if (!e.path.includes(componentEl.current)) {
            window.removeEventListener('mousedown', handleGlobalMousedown);
        } else {
            doNotClose = true;
            window.addEventListener('mouseup', handleGlobalMouseup)
        }
    }

    const handleError = (error) => {
        setRequestInProgress(false);
        props.updateEmployees([]);
        props.updateFilteredEmployees([]);
        alert(error.message);
    }

    const selectEntry = (employee) => {
        inputEl.current.value = `${employee.firstName} ${employee.lastName}`;
        updateFiltered();
        doNotClose = false;
        setShowList(false);
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
        window.removeEventListener('mousedown', handleGlobalMousedown);
        window.addEventListener('mousedown', handleGlobalMousedown);
        if (!props.employees.length) {
            if (!requestInProgress) {
                setRequestInProgress(true);
                getEmployeesData().then(employees => {
                    const _employees = employees.map(addFullText).sort(sortEmployees);
                    props.updateEmployees(_employees);
                    setRequestInProgress(false);
                    setShowList(true);
                    updateFiltered(null, _employees);
                }).catch(handleError);
            }
        } else {
            setShowList(true);
        }
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (!doNotClose) {
                setShowList(false);
            }
        }, 100)
    }

    return <div ref={componentEl}>
        <label className={styles.label} htmlFor="managerSearch">Manager</label>
        <div className={styles.inputWrapper}>
            <input
                id="managerSearch"
                type="text"
                className={styles.input}
                placeholder={props.placeholder}
                onFocus={requestEmployees}
                onBlur={(e) => handleBlur(e)}
                onInput={updateFiltered}
                ref={inputEl}
            />
            <div className={styles.arrow}>
                <ArrowIcon />
            </div>
        </div>

        {showList && (
            <div className={styles.entriesWrapper}>
                {props.filteredEmployees.map((employee, k) => {
                    return <div
                            key={k}
                            className={styles.entry}>
                            <ManagerEntry
                                onSelectEntry={selectEntry}
                                person={employee}
                                selected={employee.selected}
                            />
                        </div>
                })}
            </div>
        )}
        {requestInProgress &&
            <div>Loading...</div>
        }
    </div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerForm);