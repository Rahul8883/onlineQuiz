import React from 'react';
import { shallow } from 'enzyme';
import Login from '../component/Login';
// import '../setUpTest'
const Enzyme = require('enzyme');
// this is where we reference the adapter package we installed
// earlier
const EnzymeAdapter = require('enzyme-adapter-react-16');
// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Login Component', () => {
    it('Test  without throwing an error', () => {
        expect(shallow(< Login/>).exists()).toBe(true)
    })

    it('Test an email input', () => {
        expect(shallow( < Login/> ).find('#email').length).toEqual(1)
    })
    it('Test a password input', () => {
        expect(shallow( < Login/> ).find('#password').length).toEqual(1)
    })
    describe('Email input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow( < Login /> );
            wrapper.find('#email').simulate('change', {
                target: {
                    name: 'email',
                    value: 'rr582619@gmail.com.com'
                }
            });
            expect(wrapper.state('email')).toEqual('rr582619@gmail.com.com');
        })
    })


    describe('Test Password input', () => {
        it('should respond to change event and change the state of the Login Component', () => {
            const wrapper = shallow( < Login /> );
            wrapper.find('#password').simulate('change', {
                target: {
                    name: 'password',
                    value: 'rahul@700'
                }
            });
            expect(wrapper.state('password')).toEqual('rahul@700');
        })
    })
})