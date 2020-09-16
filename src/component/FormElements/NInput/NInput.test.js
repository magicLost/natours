
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import NInput from "./NInput";
import classes from './NInput.module.scss';


describe("NInput", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<NInput />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        