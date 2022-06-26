import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import App from './App';
import './index.scss';

ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

reportWebVitals();
