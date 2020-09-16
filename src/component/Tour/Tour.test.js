
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Tour from "./Tour";
import classes from './Tour.module.scss';


describe("Tour", () => {

    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Tour />);
        
        });

        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });

});

        