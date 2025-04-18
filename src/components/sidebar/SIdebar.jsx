import React, { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, useMediaQuery } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { gsap } from 'gsap';

// Styled Components
const SidebarContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: 0,
  top: 0,
  width: '220px',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  padding: '20px 10px',
  background: 'rgba(24, 31, 56, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '-4px 0 15px rgba(0, 242, 96, 0.2)',
  borderLeft: '2px solid #00f260',
  overflow: 'hidden',
  zIndex: 1000,
  transition: 'all 0.3s ease',
  opacity: 0,
  transform: 'translateX(20px)',

  [theme.breakpoints.down('lg')]: {
    width: '200px',
    padding: '15px 8px',
  },

  [theme.breakpoints.down('md')]: {
    width: '180px',
    padding: '12px 8px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '70px',
    flexDirection: 'row',
    bottom: 0,
    top: 'auto',
    right: 'auto',
    left: 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    borderTop: '2px solid #00f260',
    borderLeft: 'none',
    padding: '5px 10px',
    gap: '12px',
    transform: 'translateY(20px)',
    boxShadow: '0 -2px 10px rgba(0, 242, 96, 0.15)',
  },

  [theme.breakpoints.down('xs')]: {
    height: '60px',
    padding: '5px 8px',
    gap: '8px',
  },
}));

const SidebarButton = styled(Button)(({ theme }) => ({
  width: '90%',
  marginBottom: '16px',
  textTransform: 'none',
  color: '#11172b',
  background: 'white',
  borderRadius: '8px',
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: 'bold',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  willChange: 'transform, background, box-shadow',

  '& svg': {
    marginRight: '8px',
    fontSize: '1.5rem',
    color: '#11172b',
  },

  '&:hover, &.active': {
    background: 'linear-gradient(45deg, #00f260, #0575e6)',
    boxShadow: '0 0 15px rgba(0, 242, 96, 0.5)',
    transform: 'scale(1.05)',
    color: '#fff',

    '& svg': {
      color: '#fff',
    },
  },

  [theme.breakpoints.down('lg')]: {
    padding: '8px 14px',
    fontSize: '0.95rem',

    '& svg': {
      fontSize: '1.4rem',
    },
  },

  [theme.breakpoints.down('md')]: {
    padding: '7px 12px',
    fontSize: '0.9rem',

    '& svg': {
      fontSize: '1.3rem',
    },
  },

  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: '50px',
    minWidth: '50px',
    marginBottom: 0,
    padding: '6px',
    flexDirection: 'column',
    fontSize: '0px', // Скрываем текст
    background: 'transparent',

    '& svg': {
      marginRight: 0,
      marginBottom: '0px',
      fontSize: '1.6rem',
    },

    '&:hover, &.active': {
      background: 'transparent',
      boxShadow: 'none',
      transform: 'scale(1.1)',

      '& svg': {
        color: '#00f260',
      },
    },
  },

  [theme.breakpoints.down('xs')]: {
    height: '45px',
    minWidth: '45px',
    padding: '5px',

    '& svg': {
      fontSize: '1.4rem',
    },
  },
}));

// Sidebar Component
const Sidebar = () => {
  const sidebarRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    gsap.fromTo(
      sidebarRef.current,
      { opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, [isMobile]);

  return (
    <SidebarContainer ref={sidebarRef}>
      <SidebarButton
        component={NavLink}
        to="/app/main"
        className={({ isActive }) => (isActive ? 'active' : '')}
        end
        aria-label="Go to main page"
      >
        <HomeIcon fontSize="inherit" />
        <span>Start</span>
      </SidebarButton>

      <SidebarButton
        component={NavLink}
        to="/app/account"
        className={({ isActive }) => (isActive ? 'active' : '')}
        aria-label="Go to account page"
      >
        <AccountCircleIcon fontSize="inherit" />
        <span>Account</span>
      </SidebarButton>

      <SidebarButton
        component={NavLink}
        to="/"
        className={({ isActive }) => (isActive ? 'active' : '')}
        aria-label="Go to register page"
      >
        <PersonAddIcon fontSize="inherit" />
        <span>Register</span>
      </SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;