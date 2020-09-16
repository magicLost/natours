
import React from 'react';
import {
    render,
    fireEvent,
    cleanup,
    waitForElement,
    } from '@testing-library/react';
import { configure } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Footer from "./Footer";
import classes from './Footer.module.scss';
describe("Footer", () => {
    let _render = null;
    
    describe("Render and props test", () => {
    
        beforeEach(() => {
        
            _render = render(<Footer />);
        
        });
        afterEach(cleanup)
    
        describe("", () => {
    
            test("", () => {
            
                
            
            });
    
        });
    
    });
});
        