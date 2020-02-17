import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders Add Task', () => {
  const { getByText } = render(<App />);
  const addTaskElement = getByText(/Add Task/i);
  expect(addTaskElement).toBeInTheDocument();
});
