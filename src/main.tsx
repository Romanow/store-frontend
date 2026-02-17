import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './app/router/AppRouter';
import { store } from './app/providers/store';

const theme = createTheme({
  palette: {
    primary: { main: '#0b5d7a' },
    secondary: { main: '#ff6b35' },
    background: { default: '#f2f5f7' }
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif'
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
