import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import App from './App';

const mockStore = configureMockStore();
const store = mockStore({
    app: {
        employees: [],
        filteredEmployees: []
    }
});

describe('App', () => {
    test('renders learn react link', () => {
        act(() => {
            render(
                <Provider store={store}>
                    <App />
                </Provider>
            );
        });

        const live_search = document.querySelector('.live_search');
        expect(live_search).toBeInTheDocument();
    });
});