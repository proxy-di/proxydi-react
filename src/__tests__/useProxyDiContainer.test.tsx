import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useProxyDiContainer } from '../index';
import { ProxyDiProvider } from '../ProxyDiProvider';
import { ProxyDiContainer } from 'proxydi';

const Test = () => {
  const container = useProxyDiContainer();
  return (
    <div data-testid="container">{container ? 'initialized' : 'null'}</div>
  );
};

describe('useProxyDiContainer', () => {
  it('should use given container', async () => {
    const container = new ProxyDiContainer();
    render(
      <ProxyDiProvider container={container}>
        <Test />
      </ProxyDiProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('container').textContent).toBe('initialized'),
    );
  });

  it('should create own container', async () => {
    render(
      <ProxyDiProvider>
        <Test />
      </ProxyDiProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('container').textContent).toBe('initialized'),
    );
  });
});
