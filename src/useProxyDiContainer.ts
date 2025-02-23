import { useState, useEffect } from 'react';
import { ProxyDiContainer } from 'proxydi';

export function useProxyDiContainer(): ProxyDiContainer | null {
  const [container, setContainer] = useState<ProxyDiContainer | null>(null);

  useEffect(() => {
    const instance = new ProxyDiContainer();
    setContainer(instance);

    // Cleanup if necessary
    return () => {
      // if (instance.dispose) instance.dispose();
    };
  }, []);

  return container;
}
