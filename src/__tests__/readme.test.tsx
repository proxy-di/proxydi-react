import React, { Component, ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProxyDiProvider, useProxyDi } from '../index';
import { ProxyDiContainer } from 'proxydi';
import App from './mock/App';
import { MyService } from './mock/MyService';

describe('Mock app', () => {
  it('App gets rendered and get data from dependency', async () => {
    const initAppDependencies = (container: ProxyDiContainer) => {
      container.register(MyService, 'My-Service');
    };

    render(
      <ProxyDiProvider init={initAppDependencies}>
        <App />
      </ProxyDiProvider>,
    );

    expect(await screen.findByText('Test data')).toBeInTheDocument();
  });
});
