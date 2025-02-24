import { ProxyDiContainer } from 'proxydi';
import { createContext } from 'react';

export const ProxyDiContext = createContext<ProxyDiContainer | undefined>(
  undefined,
);
