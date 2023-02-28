import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
// contexts
import { StateContextProvider } from './context';
//
import App from './App';
import './index.css';

const newLocal = document.getElementById('root');
const root = ReactDOM.createRoot(newLocal);

root.render(
  <ThirdwebProvider activeChain={ChainId.Goerli}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
