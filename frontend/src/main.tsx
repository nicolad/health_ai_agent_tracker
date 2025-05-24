import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base.css';
import AppLayout from '@/layouts/AppLayout';
import SimpleRouter from '@/router/SimpleRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppLayout>
      <SimpleRouter />
    </AppLayout>
  </React.StrictMode>
);
