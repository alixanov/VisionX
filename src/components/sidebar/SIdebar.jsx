import React, { useRef, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, useMediaQuery, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import { gsap } from 'gsap';
import InfoProduct from '../info/InfoProduct';

// Styled Components
const SidebarContainer = styled(Box)(({ theme, showProduct }) => ({
  position: 'fixed',
  right: 0,
  top: 0,
  width: showProduct ? '400px' : '220px', // Expand for InfoProduct
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'start',
  padding: showProduct ? '20px' : '20px 10px',
  background: 'rgba(24, 31, 56, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '-4px 0 15px rgba(0, 242, 96, 0.2)',
  borderLeft: '2px solid #00f260',
  overflowY: 'auto',
  zIndex: 1000,
  transition: 'all 0.3s ease',
  opacity: 0,
  transform: 'translateX(20px)',

  [theme.breakpoints.down('lg')]: {
    width: showProduct ? '350px' : '200px',
    padding: showProduct ? '15px' : '15px 8px',
  },

  [theme.breakpoints.down('md')]: {
    width: showProduct ? '300px' : '180px',
    padding: showProduct ? '12px' : '12px 8px',
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: showProduct ? '100vh' : '70px', // Full-screen overlay for InfoProduct
    flexDirection: showProduct ? 'column' : 'row',
    bottom: showProduct ? 'auto' : 0,
    top: showProduct ? 0 : 'auto',
    right: 'auto',
    left: 0,
    justifyContent: showProduct ? 'start' : 'space-around',
    alignItems: showProduct ? 'center' : 'center',
    background: showProduct ? 'rgba(24, 31, 56, 0.95)' : 'white',
    borderTop: showProduct ? 'none' : '2px solid #00f260',
    borderLeft: 'none',
    padding: showProduct ? '20px' : '5px 10px',
    gap: showProduct ? '20px' : '12px',
    transform: showProduct ? 'translateY(0)' : 'translateY(20px)',
    boxShadow: showProduct ? '0 0 20px rgba(0, 242, 96, 0.3)' : '0 -2px 10px rgba(0, 242, 96, 0.15)',
  },

  [theme.breakpoints.down('xs')]: {
    height: showProduct ? '100vh' : '60px',
    padding: showProduct ? '15px' : '5px 8px',
    gap: showProduct ? '15px' : '8px',
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

const ProductContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  padding: '16px',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '2px solid transparent',
    borderImage: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF) 1',
    borderRadius: '12px',
    opacity: 0.7,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: '#fff',
  background: 'rgba(255, 255, 255, 0.1)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    top: '15px',
    right: '15px',
  },
}));

// Main content wrapper with proper spacing for mobile footer
const ContentWrapper = styled(Box)(({ theme }) => ({
  paddingBottom: 0,
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '70px', // Space for the mobile footer
  },
  [theme.breakpoints.down('xs')]: {
    paddingBottom: '60px', // Adjusted for smaller screens
  },
}));

// Sidebar Component
const Sidebar = () => {
  const sidebarRef = useRef(null);
  const productRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { id } = useParams();
  const location = useLocation();

  // Check for userData in localStorage
  const userData = localStorage.getItem('userData');
  const isLoggedIn = userData ? !!JSON.parse(userData).email : false;
  const accountPath = isLoggedIn ? '/app/account' : '/';
  const accountLabel = isLoggedIn ? 'Account' : 'Register';

  // Show InfoProduct if URL matches /app/shop/info-product/:id
  const showProduct = location.pathname.startsWith('/app/shop/info-product');

  useEffect(() => {
    // Initialize sidebar animation
    if (sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { opacity: 0, x: isMobile && !showProduct ? 0 : 20, y: isMobile && !showProduct ? 20 : 0 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
        }
      );
    }

    // Initialize product animation if showing product
    if (showProduct && productRef.current) {
      gsap.fromTo(
        productRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }

    // Add padding to body when mobile footer is present
    if (isMobile && !showProduct) {
      document.body.style.paddingBottom = '70px';
    } else {
      document.body.style.paddingBottom = '0';
    }

    // Cleanup function
    return () => {
      document.body.style.paddingBottom = '0';
    };
  }, [isMobile, showProduct]);

  return (
    <>
      <SidebarContainer ref={sidebarRef} showProduct={showProduct}>
        {!showProduct && (
          <>
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
              to={accountPath}
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-label={`Go to ${accountLabel.toLowerCase()} page`}
            >
              <AccountCircleIcon fontSize="inherit" />
              <span>{accountLabel}</span>
            </SidebarButton>

            <SidebarButton
              component={NavLink}
              to="/app/chatai"
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-label="Go to chat page"
            >
              <ReviewsIcon fontSize="inherit" />
              <span>Chat</span>
            </SidebarButton>

            <SidebarButton
              component={NavLink}
              to="/app/shop"
              className={({ isActive }) => (isActive ? 'active' : '')}
              aria-label="Go to shop page"
            >
              <LocalMallIcon fontSize="inherit" />
              <span>Shop</span>
            </SidebarButton>
          </>
        )}

        {showProduct && (
          <ProductContainer ref={productRef}>
            <CloseButton component={NavLink} to="/app/shop" aria-label="Close product details">
              <CloseIcon />
            </CloseButton>
            <InfoProduct id={id} />
          </ProductContainer>
        )}
      </SidebarContainer>

      {/* Adding a content wrapper with padding for mobile view */}
      {isMobile && !showProduct && <ContentWrapper />}
    </>
  );
};

export default Sidebar;