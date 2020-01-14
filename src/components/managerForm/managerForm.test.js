import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { act } from "react-dom/test-utils";
import ManagerForm from './managerForm.component';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import thunk from 'redux-thunk';
import ManagerEntry from '../managerEntry/managerEntry.component';

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe('managerForm', () => {
    test('It renders', () => {

        const store = mockStore({
            app: {
                employees: [],
                filteredEmployees: []
            }
        });

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

    describe('State gets updated', () => {
        const employeesList = [
            {
                firstName: 'FirstOne',
                lastName: 'LastOne',
                email: 'fo@aaa.com',
                fullText: 'firstonelastone',
                abbr: 'FL',
                selected: false
            },
            {
                firstName: 'FirstTwo',
                lastName: 'LastTwo',
                email: 'ft@aaa.com',
                fullText: 'firsttwolasttwo',
                abbr: 'FL',
                selected: false
            },
            {
                firstName: 'FirstThree',
                lastName: 'LastThree',
                email: 'ft@aaa.com',
                fullText: 'firstthreelastthree',
                abbr: 'FL',
                selected: false
            }
        ];
        const store = mockStore({
            app: {
                employees: employeesList,
                filteredEmployees: []
            }
        });

        test('The filteredEmployees list is updated', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ManagerForm />
                </Provider>
            );

            act(() => {
                const input = wrapper.find('input');
                input.props().onFocus();
            });
            expect(store.getActions()[0].filteredEmployees).toEqual(employeesList);
        });

        test('The filteredEmployees list is changed when the value is entered', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ManagerForm />
                </Provider>
            );

            act(() => {
                const input = wrapper.find('input');
                input.instance().value = 'FirstTwo';
                input.props().onInput();
            });

            expect(store.getActions()[1].filteredEmployees).toEqual([employeesList[1]]);
        });
    });

    describe('Renders entries', () => {
        const filteredEmployees = [
            {
                firstName: 'FirstOne',
                lastName: 'LastOne',
                email: 'fo@aaa.com',
                fullText: 'firstonelastone',
                abbr: 'FL',
                selected: false
            },
            {
                firstName: 'FirstTwo',
                lastName: 'LastTwo',
                email: 'ft@aaa.com',
                fullText: 'firsttwolasttwo',
                abbr: 'FL',
                selected: false
            },
            {
                firstName: 'FirstThree',
                lastName: 'LastThree',
                email: 'ft@aaa.com',
                fullText: 'firstthreelastthree',
                abbr: 'FL',
                selected: false
            }
        ];
        const store = mockStore({
            app: {
                employees: Array.from(filteredEmployees),
                filteredEmployees: filteredEmployees
            }
        });

        test('Text is rendered', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ManagerForm />
                </Provider>
            );

            act(() => {
                const input = wrapper.find('input');
                input.props().onFocus();
            });

            expect(wrapper.text().includes('FLFirstOne LastOnefo@aaa.comFLFirstTwo LastTwoft@aaa.comFLFirstThree LastThreeft@aaa.com')).toBe(true);
        });

        test('There is at least one ManagerEntry', () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ManagerForm />
                </Provider>
            );

            expect(wrapper.contains(ManagerEntry)).toBe(true);
        });
    });
});


