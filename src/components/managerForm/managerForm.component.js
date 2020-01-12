import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateEmployees, updateFilteredEmployees } from '../../actions/app.action';
import { getEmployeesData } from '../../services/communication.service';
import styles from './managerForm.module.css';
import ManagerEntry from '../managerEntry/managerEntry.component';
import ArrowIcon from '../arrowIcon/arrowIcon.component';
import { KEYS } from '../../services/utils.service';


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

const stopEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
}

const getSelectedIndex = (arr) => {
    const len = arr.length;
    for (let i = 0; i < len; i += 1) {
        if (arr[i].selected) {
            return i;
        }
    }
    return 0;
}

function ManagerForm(props) {
    const [requestInProgress, setRequestInProgress] = useState(false);
    const [showList, setShowList] = useState(false);
    const [doNotClose, setDoNotClose] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const componentEl = useRef(null);
    const inputEl = useRef(null);
    const wrapperEl = useRef(null);
    const entryHeight = 87;

    const updateScrollPosition = (i) => {
        wrapperEl.current.scroll(0, entryHeight*i);
    };

    const handleKeyboard = (e, filteredEmployees) => {
        let selectedIndex;
        let newIndex;

        if (!filteredEmployees.length) {
            return;
        }

        switch(e.key) {
            case KEYS.ARROW_UP:
            case KEYS.LEGACY_ARROW_UP:
                stopEvent(e);
                selectedIndex = getSelectedIndex(filteredEmployees);
                newIndex = selectedIndex === 0 ? selectedIndex : selectedIndex - 1;
            break;
            case KEYS.ARROW_DOWN:
            case KEYS.LEGACY_ARROW_DOWN:
                stopEvent(e);
                selectedIndex = getSelectedIndex(filteredEmployees);
                newIndex = selectedIndex === (filteredEmployees.length - 1) ? selectedIndex : selectedIndex + 1;
            break;
            case KEYS.ENTER:
                stopEvent(e);
                selectedIndex = getSelectedIndex(filteredEmployees);
                selectEntry(filteredEmployees[selectedIndex])
                return;
            default:
                return;
        }

        if (newIndex !== selectedIndex) {
            filteredEmployees[selectedIndex].selected = false;
            filteredEmployees[newIndex].selected = true;
            props.updateFilteredEmployees(filteredEmployees);
            updateScrollPosition(newIndex);
        }

    }

    const open = () => {
        setShowList(true);
        setInputFocused(true);
    }

    const close = () => {
        setDoNotClose(false);
        setShowList(false);
    }

    const handleGlobalMouseup = (e) => {
        setDoNotClose(false);
        window.removeEventListener('mouseup', handleGlobalMouseup);
    };

    const handleGlobalMousedown = (e) => {
        if (!e.path.includes(componentEl.current)) {
            window.removeEventListener('mousedown', handleGlobalMousedown);
        } else {
            setDoNotClose(true);
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
        props.updateFilteredEmployees([]);
        if (!inputFocused) {
            close();
        }
    }

    const updateFiltered = (_e, employees = props.employees) => {
        const value = inputEl.current.value.toLowerCase().replace(/[^\w]/g, '');

        if (employees.length) {
            let filteredValues = employees;
            if (value) {
                filteredValues = employees.filter(data => data.fullText.indexOf(value) > -1);
            }
            filteredValues = filteredValues.map(v => {
                v.selected = false;
                return v;
            });
            if (filteredValues.length) {
                filteredValues[0].selected = true;
            }
            props.updateFilteredEmployees(filteredValues);
        }
    }

    const requestEmployees = (employees) => {
        window.removeEventListener('mousedown', handleGlobalMousedown);
        window.addEventListener('mousedown', handleGlobalMousedown);
        if (!employees.length) {
            if (!requestInProgress) {
                setRequestInProgress(true);
                getEmployeesData().then(data => {
                    const _employees = data.map(addFullText).sort(sortEmployees);
                    props.updateEmployees(_employees);
                    setRequestInProgress(false);
                    open();
                    updateFiltered(null, _employees);
                }).catch(handleError);
            }
        } else {
            open();
        }
    };

    const handleBlur = () => {
        setInputFocused(false);
        if (!doNotClose) {
            close();
        }
    }

    return <div ref={componentEl}>
        <label className={styles.label} htmlFor="managerSearch">Manager</label>
        <div className={styles.inputWrapper}>
            <input
                id="managerSearch"
                type="text"
                className={styles.input}
                placeholder={props.placeholder}
                onFocus={() => requestEmployees(props.employees)}
                onBlur={(e) => handleBlur(e)}
                onInput={updateFiltered}
                onKeyDown={(e) => handleKeyboard(e, Array.from(props.filteredEmployees))}
                ref={inputEl}
            />
            <div className={styles.arrow}>
                <ArrowIcon />
            </div>
        </div>

        {showList && props.filteredEmployees.length > 0 && (
            <div className={styles.entriesWrapper} ref={wrapperEl}>
                {props.filteredEmployees.map((employee, k) => {
                    const className = employee.selected ? `${styles.entry} ${styles.selected}` : styles.entry
                    return <div
                            key={k}
                            className={className}>
                            <ManagerEntry
                                onSelectEntry={selectEntry}
                                person={employee}
                            />
                            {employee.selected}
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