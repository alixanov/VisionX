import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, CardContent, useMediaQuery, CssBaseline, Button } from '@mui/material';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

// Styled Components
const AccountContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(135deg, #181f38 0%, #0d1224 100%)',
  color: '#fff',
  fontFamily: 'Space Grotesk, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px 20px',
  marginRight: '220px',
  zIndex: 2,
  [theme.breakpoints.down('lg')]: {
    
    padding: '35px 15px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '30px 15px',
    marginRight: 0,
    
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
    paddingBottom: '150px',
    justifyContent: "center",

  },
  [theme.breakpoints.down('xs')]: {
    padding: '15px 8px',
    paddingBottom: '150px',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '800px',
  width: '100%',
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '700px',

  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '600px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    
  },
}));

const AvatarContainer = styled(Box)(({ theme }) => ({
  width: '180px',
  height: '180px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: '32px',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '2px solid rgba(0, 242, 96, 0.5)',
    animation: 'pulse-ring 2s infinite ease-in-out',
  },
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 0 30px rgba(0, 242, 96, 0.7)',
  },
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    width: '140px',
    height: '140px',
    '&:before': { width: '160px', height: '160px' },
  },
  [theme.breakpoints.down('xs')]: {
    width: '120px',
    height: '120px',
    '&:before': { width: '140px', height: '140px' },
  },
}));

const AvatarImage = styled(Box)(({ theme }) => ({
  width: '90%',
  height: '90%',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
  color: '#fff',
  fontFamily: 'Orbitron, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '0',
    width: '100%',
    height: '50%',
    background: 'rgba(0, 242, 96, 0.3)',
    transform: 'skewY(-45deg)',
    animation: 'scan 3s infinite linear',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.5rem',
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  color: '#fff',
  padding: '16px',
  width: '100%',
  maxWidth: '300px',
  textAlign: 'center', // Changed to center text
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    border: '2px solid transparent',
    borderImage: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF) 1',
    borderRadius: '12px',
    opacity: '0.7',
  },
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 242, 96, 0.4)',
    '&:before': { opacity: '1' },
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '250px',
    padding: '12px',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '200px',
    padding: '10px',
  },
}));

const ProfileField = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontFamily: 'Orbitron, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  color: '#fff',
  textAlign: 'center', // Center text
  '& span': {
    display: 'inline-block',
    opacity: '0',
    transform: 'translateX(-20px)',
  },
  '&:hover:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to right, transparent, rgba(0, 242, 96, 0.3), transparent)',
    animation: 'scan-field 1s linear',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.8rem',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  marginTop: '24px',
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '8px',
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1rem',
  textTransform: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 16px rgba(0, 242, 96, 0.5)',
    background: 'linear-gradient(45deg, #0575E6, #A100FF)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '8px 16px',
    fontSize: '0.8rem',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '2.5rem',
  background: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '16px',
  textAlign: 'center',
  [theme.breakpoints.down('lg')]: {
    fontSize: '2.3rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1.3rem',
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '24px',
  textAlign: 'center',
  lineHeight: '1.6',
  [theme.breakpoints.down('lg')]: {
    fontSize: '1.1rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.85rem',
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#ff4d4d',
  textAlign: 'center',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

// CSS для мозаики, волн и анимаций
const styles = document.createElement('style');
styles.innerHTML = `
  .mosaic {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1;
  }
  .cell {
    position: absolute;
    background: linear-gradient(45deg, #00F260, #0575E6, #A100FF);
    opacity: 0.3;
    border-radius: 4px;
    will-change: transform, opacity;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  .wave-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 242, 96, 0.1) 0%,
      transparent 30%,
      rgba(5, 117, 230, 0.1) 70%,
      transparent 100%
    );
    animation: wave 8s infinite ease-in-out;
    z-index: 1;
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.5; }
  }
  @keyframes scan {
    0% { transform: translateY(-100%) skewY(-45deg); }
    100% { transform: translateY(100%) skewY(-45deg); }
  }
  @keyframes scan-field {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes wave {
    0% { transform: translateY(0); opacity: 0.3; }
    50% { transform: translateY(-20px); opacity: 0.5; }
    100% { transform: translateY(0); opacity: 0.3; }
  }
`;
document.head.appendChild(styles);

const Account = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const avatarRef = useRef(null);
  const fieldRefs = useRef([]);

  // Загрузка данных с логированием
  let userData;
  try {
    const storedData = localStorage.getItem('userData');
    console.log('Stored userData:', storedData);
    userData = storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error parsing userData:', error);
    userData = {};
  }

  // Проверка авторизации
  useEffect(() => {
    if (!userData.email && !userData.username) {
      console.warn('No user data found, redirecting to /app/register');
      navigate('/app/register');
    }
  }, [navigate]);

  // Мозаика фона
  useEffect(() => {
    const cells = [];
    const cellCount = isMobile ? 15 : 30;
    const container = document.createElement('div');
    container.className = 'mosaic';
    const accountContainer = document.querySelector('#account-container');
    if (accountContainer) {
      accountContainer.prepend(container);
    }

    const username = userData.username || 'USER';
    const textWidth = username.length * 10;
    const centerX = isMobile ? 50 : 40;
    const centerY = 20;

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const size = Math.random() * 15 + 5;
      cell.style.width = `${size}px`;
      cell.style.height = `${size}px`;
      const charIndex = Math.floor(i / (cellCount / username.length));
      const x = centerX + (charIndex - username.length / 2) * 10;
      const y = centerY + (Math.random() - 0.5) * 10;
      cell.style.left = `${x}%`;
      cell.style.top = `${y}%`;
      container.appendChild(cell);
      cells.push(cell);
    }

    gsap.fromTo(
      cells,
      { opacity: 0, scale: 0 },
      {
        opacity: 0.5,
        scale: 1,
        duration: 1,
        stagger: 0.02,
        ease: 'power2.out',
        onComplete: () => {
          gsap.to(cells, {
            left: () => `${Math.random() * (isMobile ? 100 : 80)}%`,
            top: () => `${Math.random() * 100}%`,
            opacity: () => Math.random() * 0.5 + 0.2,
            duration: 1.5,
            stagger: 0.02,
            ease: 'power2.out',
          });
        },
      }
    );

    gsap.to(cells, {
      x: () => Math.random() * 100 - 50,
      y: () => Math.random() * 100 - 50,
      opacity: () => Math.random() * 0.5 + 0.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
      delay: 2.5,
    });

    const handleMouseMove = (e) => {
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          gsap.to(cell, {
            x: dx * 0.4,
            y: dy * 0.4,
            opacity: 0.9,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      container.remove();
    };
  }, [isMobile, userData.username]);

  // Анимация контента
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(avatarRef.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
      .fromTo(
        '.account-content > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        '.profile-field span',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' },
        '-=0.5'
      );
  }, []);

  // Генерация инициалов для аватара
  const getAvatarInitials = () => {
    const first = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : '';
    const last = userData.lastName ? userData.lastName.charAt(0).toUpperCase() : '';
    return first + last || userData.username?.charAt(0).toUpperCase() || 'U';
  };

  // Обработчик выхода
  const handleLogout = () => {
    console.log('Logging out, clearing userData');
    localStorage.removeItem('userData');
    navigate('/');
  };

  // Проверка наличия данных
  const hasUserData = userData.firstName || userData.lastName || userData.username || userData.email;

  return (
    <AccountContainer id="account-container">
      <CssBaseline />
      <Box className="wave-overlay" />
      <ContentWrapper className="account-content">
        <AvatarContainer ref={avatarRef}>
          <AvatarImage>{getAvatarInitials()}</AvatarImage>
        </AvatarContainer>
        <WelcomeTitle variant="h1">
          Welcome to VisionX, {userData.firstName || 'Explorer'}!
        </WelcomeTitle>
        {!hasUserData && (
          <ErrorMessage>
            No user data found. Please register or log in.
          </ErrorMessage>
        )}
        <WelcomeText>
          Here begins your technological journey. In this space, you can:
          <br />
          🔍 Stay updated with the latest tech news
          <br />
          💬 Chat with AI for personalized recommendations
          <br />
          🧠 Manage your profile, interests, and settings
          <br />
          📁 Save favorite articles, projects, and innovations
        </WelcomeText>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
            gap: '16px',
            width: '100%',
            maxWidth: '650px',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '0 auto', // Центрирует весь контейнер
            '@media (max-width: 600px)': { marginLeft: '45px' }, // Только для мобильных устройств
          }}
        >

          {[
            { label: 'First Name', value: userData.firstName || 'Not provided' },
            { label: 'Last Name', value: userData.lastName || 'Not provided' },
            { label: 'Username', value: userData.username || 'Not provided' },
            { label: 'Email', value: userData.email || 'Not provided' },
          ].map((item, index) => (
            <ProfileCard key={index}>
              <CardContent>
                <ProfileField className="profile-field">
                  <span>{item.label}: {item.value}</span>
                </ProfileField>
              </CardContent>
            </ProfileCard>
          ))}
        </Box>


        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ContentWrapper>
    </AccountContainer>
  );
};

export default Account;