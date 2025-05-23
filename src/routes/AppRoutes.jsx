import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Register, Account, Layout, ChatAi, InfoProduct, Shop } from '../components';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Создаем тему с Orbitron как основным шрифтом
const theme = createTheme({
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Space Grotesk", sans-serif',
        },
      },
    },
  },
});

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/app" element={<Layout />}>
          <Route path="main" element={<Main />} />
          <Route path="account" element={<Account />} />
          <Route path="chatai" element={<ChatAi />} />
          <Route path="shop" element={<Shop />} />
        </Route>
        <Route path="info-product/:id" element={<InfoProduct />} />
        {/* Прямой доступ к чату без авторизации */}
        <Route path="/chatai" element={<ChatAi />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;