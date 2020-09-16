
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Alert from "./Alert";
import classes from './Alert.module.scss';


describe("Alert", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Alert />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        