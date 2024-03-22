import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { TodoProvider } from './contexts/TodoContext/TodoContext.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <TodoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodoProvider>
);
