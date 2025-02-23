import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useProxyDiContainer } from '../index';

const TestComponent = () => {
  const container = useProxyDiContainer();
  return <div data-testid="container">{container ? 'initialized' : 'null'}</div>;
};

describe('useProxyDiContainer', () => {
  it('should initialize the container', async () => {
    render(<TestComponent />);
    await waitFor(() => expect(screen.getByTestId('container').textContent).toBe('initialized'));
  });
});
