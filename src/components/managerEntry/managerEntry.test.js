import React from 'react';
import { render } from '@testing-library/react';
import ManagerEntry from './managerEntry.component';

describe('ManagerEntry', () => {
    const person = {
        firstName: 'John',
        lastName: 'Doe'
    };
    test('It renders', () => {
        const doSelect = jest.fn();
        const { getByText } = render(<ManagerEntry person={person} onSelectEntry={doSelect} />);
        const entry = getByText(/John Doe/);
        expect(entry).toBeInTheDocument();
    });
});


