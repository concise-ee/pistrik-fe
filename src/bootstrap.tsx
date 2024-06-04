import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {CssBaseline, StyledEngineProvider, ThemeProvider} from '@mui/material';
import theme from './muiTheme';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>
);
