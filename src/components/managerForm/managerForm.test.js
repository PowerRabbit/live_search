import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import ManagerForm from './managerForm.component';

const mockStore = configureMockStore();
const store = mockStore({
    app: {
        employees: [],
        filteredEmployees: []
    }
});

describe('managerForm', () => {
    test('It renders', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <ManagerForm />
                </Provider>
            );
        });

        const label = document.querySelector('label');
        expect(label.textContent).toEqual('Manager');
    });
});


