import React, { ReactNode, useEffect, useState } from 'react';
import { ProxyDiContainer } from 'proxydi';
import { ProxyDiContext } from './ProxyDiContext';
import { useProxyDiContainer } from './useProxyDiContainer';

interface ProxyDiProviderProps {
  children: ReactNode;
  container?: ProxyDiContainer;
}

export const ProxyDiProvider: React.FC<ProxyDiProviderProps> = ({
  children,
  container,
}) => {
  const [proyDiContainer, setProxyDiContainer] = useState<
    ProxyDiContainer | undefined
  >(container ? container : undefined);

  const parentContainer = useProxyDiContainer();

  useEffect(() => {
    let instance: ProxyDiContainer | undefined;

    if (!container) {
      instance = parentContainer
        ? parentContainer.createChildContainer()
        : new ProxyDiContainer();
      setProxyDiContainer(instance);
    }

    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, []);

  return (
    <ProxyDiContext.Provider value={proyDiContainer}>
      {children}
    </ProxyDiContext.Provider>
  );
};
