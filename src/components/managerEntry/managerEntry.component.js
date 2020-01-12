import React from 'react';
import styles from './managerEntry.module.css';

function ManagerEntry(props) {
    const person = props.person;
    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>{person.abbr}</div>
            <div className={styles.text_block}>
                <div className={styles.name}>
                    {person.firstName} {person.lastName}
                </div>
                <div className={styles.email}>
                    {person.email}
                </div>
            </div>
        </div>
    );
}

export default ManagerEntry;