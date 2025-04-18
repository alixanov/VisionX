import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import {Sidebar} from '../../components/';
import '../styles/fonts.css';

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #181f38 0%, #0d1224 100%)',
  position: 'relative',
  fontFamily: 'Orbitron, sans-serif',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '20px',
  marginRight: '220px',
  minHeight: 'calc(100vh - 40px)',
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    paddingBottom: '80px',
    padding: '15px',
  },
}));

const MainLayout = () => {
  return (
    <LayoutContainer>
      <CssBaseline />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Sidebar />
    </LayoutContainer>
  );
};

export default MainLayout;