import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, useMediaQuery } from '@mui/material';
import gsap from 'gsap';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
    borderTop: '2px solid #00f260',
    borderLeft: 'none',
    padding: '5px 10px',
  },
}));

const SidebarButton = styled(Button)(({ theme }) => ({
  width: '90%',
  marginBottom: '12px',
  textTransform: 'none',
  color: '#11172b',
  background: 'white',
  borderRadius: '8px',
  padding: '10px 16px',
  display: 'flex',
  justifyContent: 'flex-start',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  '& svg': {
    marginRight: '8px',
  },

  '&:hover, &.active': {
    background: 'linear-gradient(45deg, #00f260, #0575e6)',
    boxShadow: '0 0 15px rgba(0, 242, 96, 0.5)',
    transform: 'scale(1.05)',
    color: '#fff',
  },

  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: '50px',
    marginBottom: 0,
    padding: '8px 12px',
    flexDirection: 'column',
    fontSize: '0.7rem',
    '& svg': {
      marginRight: 0,
      marginBottom: '4px',
      fontSize: '1.2rem',
    },
  },
}));

// GSAP Animation
const Sidebar = () => {
  const sidebarRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!sidebarRef.current) return;

    const cells = [];
    const cellCount = isMobile ? 15 : 30;
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '0';
    container.style.overflow = 'hidden';
    sidebarRef.current.appendChild(container);

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.style.position = 'absolute';
      cell.style.width = `${Math.random() * (isMobile ? 10 : 15) + 5}px`;
      cell.style.height = cell.style.width;
      cell.style.left = `${Math.random() * 100}%`;
      cell.style.top = `${Math.random() * 100}%`;
      cell.style.background = 'linear-gradient(45deg, #00f260, #0575e6)';
      cell.style.opacity = '0.3';
      cell.style.borderRadius = '4px';
      cell.style.transition = 'all 0.3s ease';
      container.appendChild(cell);
      cells.push(cell);
    }

    const animation = gsap.to(cells, {
      x: () => Math.random() * (isMobile ? 20 : 50) - (isMobile ? 10 : 25),
      y: () => Math.random() * (isMobile ? 20 : 50) - (isMobile ? 10 : 25),
      opacity: () => Math.random() * 0.6 + 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    return () => {
      animation.kill();
      container.remove();
    };
  }, [isMobile]);

  return (
    <SidebarContainer ref={sidebarRef}>
      <SidebarButton
        component={NavLink}
        to="/app/main"
        activeClassName="active"
        exact
      >
        <HomeIcon fontSize="medium" />
        <span>Start</span>
      </SidebarButton>

      <SidebarButton
        component={NavLink}
        to="/app/account"
        activeClassName="active"
      >
        <AccountCircleIcon fontSize="medium" />
        <span>Account</span>
      </SidebarButton>

      <SidebarButton
        component={NavLink}
        to="/"
        activeClassName="active"
      >
        <PersonAddIcon fontSize="medium" />
        <span>Register</span>
      </SidebarButton>
    </SidebarContainer>
  );
};

export default Sidebar;