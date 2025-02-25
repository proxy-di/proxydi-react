import { useContext } from 'react';
import { ProxyDiContext } from './ProxyDiContext';
import { ProxyDiContainer } from 'proxydi';

/**
 * Returns the ProxyDi container instance provided by the context if you need it by some reason
 *
 * @returns {ProxyDiContainer} The ProxyDi container instance provided by the context.
 */
export const useProxyDiContainer = (): ProxyDiContainer => {
  const container = useContext(ProxyDiContext);
  return container!;
};
