
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Header from "./Header";
import classes from './Header.module.scss';
describe("Header", () => {
    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Header />);
        
        });

        afterEach(cleanup)
    
        describe("Initial", () => {
    
            test("Must show two buttons - Login and Sign up, All Tours anchor and logo img", () => {
            
                const login_buttons = _render.getAllByText('Login');
                const signup_buttons = _render.getAllByText('Sign up');

                const allToursAnchors = _render.getAllByText('All tours');

                const logoImgs = _render.getAllByAltText('Natours logo');

                const userImgs = _render.queryAllByAltText('User photo');

                expect(login_buttons).toHaveLength(1);
                expect(signup_buttons).toHaveLength(1);
                expect(allToursAnchors).toHaveLength(1);
                expect(logoImgs).toHaveLength(1);

                expect(userImgs).toHaveLength(0);
            
            });
    
        });
    
    });
});
        