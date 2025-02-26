import React from 'react';
import { useProxyDi } from '../../index';
import { MyService } from './MyService';

const App = () => {
  const myService = useProxyDi<MyService>('My-Service');

  return (
    <div>
      <h1>Data from MyService:</h1>
      <p>{myService.getData()}</p>
    </div>
  );
};

export default App;
