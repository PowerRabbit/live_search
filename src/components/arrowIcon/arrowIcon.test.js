import React from 'react';
import { render } from '@testing-library/react';
import ArrowIcon from './arrowIcon.component';

describe('ArrowIcon', () => {
    test('It renders', () => {
        render(<ArrowIcon />);
        expect(document.querySelector('svg')).toBeInTheDocument();
    });
});


