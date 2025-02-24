import { useContext } from 'react';
import { ProxyDiContext } from './ProxyDiContext';
import { ProxyDiContainer } from 'proxydi';

export const useProxyDiContainer = (): ProxyDiContainer => {
  const container = useContext(ProxyDiContext);

  return container!;
};
