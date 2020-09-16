
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import NLoginForm from "./NLoginForm";
import classes from './NLoginForm.module.scss';


describe("NLoginForm", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<NLoginForm />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        