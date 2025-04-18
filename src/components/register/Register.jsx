import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, TextField, Button, Typography } from '@mui/material';
import Tilt from 'react-parallax-tilt';
import { gsap } from 'gsap';

// Styled Components
const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '& *:focus': {
    outline: 'none !important',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5) !important',
  },
});

const FormCard = styled(Card)({
  padding: '24px',
  width: '100%',
  maxWidth: '320px',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  color: '#fff',
});

const BannerBox = styled(Box)({
  textAlign: 'center',
  marginBottom: '32px',
  background: 'linear-gradient(45deg, #00f260, #0575e6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    opacity: 0.9,
  },
});

const CloudBanner = styled(Box)({
  position: 'absolute',
  padding: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  color: '#fff',
  fontSize: '14px',
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(20px)',
});

const NavIcon = styled(Box)({
  position: 'absolute',
  width: '48px',
  height: '48px',
  background: 'linear-gradient(45deg, #00f260, #0575e6)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.2)',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)',
  },
});

const ActionLink = styled(Typography)({
  color: '#00f260',
  fontSize: '14px',
  cursor: 'pointer',
  position: 'relative',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#0575e6',
  },
  '&:focus': {
    outline: 'none',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '1px',
    bottom: '-2px',
    left: '0',
    background: 'linear-gradient(45deg, #00f260, #0575e6)',
    transition: 'width 0.3s ease',
  },
  '&:hover:after': {
    width: '100%',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      border: 'none', // Единый бордер
      borderRadius: '8px', // Радиус при фокусе
    },
  },
});




const StyledButton = styled(Button)({
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)',
  },
});

const Register = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const navigate = useNavigate();

  // Мозаика фона
  useEffect(() => {
    const cells = [];
    const cellCount = 50;
    const container = document.createElement('div');
    container.className = 'mosaic';
    document.querySelector('#page-container').prepend(container);

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.style.width = `${Math.random() * 20 + 10}px`;
      cell.style.height = cell.style.width;
      cell.style.left = `${Math.random() * 100}%`;
      cell.style.top = `${Math.random() * 100}%`;
      container.appendChild(cell);
      cells.push(cell);
    }

    gsap.to(cells, {
      x: () => Math.random() * 100 - 50,
      y: () => Math.random() * 100 - 50,
      opacity: () => Math.random() * 0.5 + 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    document.addEventListener('mousemove', (e) => {
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          gsap.to(cell, {
            x: dx * 0.2,
            y: dy * 0.2,
            opacity: 0.8,
            duration: 0.3,
          });
        }
      });
    });

    return () => container.remove();
  }, []);

  // Анимация облаков
  useEffect(() => {
    gsap.to('.cloud-1', { y: -20, opacity: 1, duration: 2, repeat: -1, yoyo: true });
    gsap.to('.cloud-2', { y: -15, opacity: 1, duration: 2.5, repeat: -1, yoyo: true, delay: 0.5 });
    gsap.to('.cloud-3', { y: -10, opacity: 1, duration: 2, repeat: -1, yoyo: true, delay: 1 });
    gsap.to('.cloud-4', { y: -25, opacity: 1, duration: 2.2, repeat: -1, yoyo: true, delay: 0.8 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/main');
  };

  return (
    <PageContainer id="page-container">
      {/* Заголовок */}
      <Tilt>
        <BannerBox>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Connect. Think. Be Heard. Welcome to VisionX.
          </Typography>
        </BannerBox>
      </Tilt>

      {/* Форма */}
      <FormCard>
        <Typography variant="h6" align="center" gutterBottom>
          {isLoginMode ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {!isLoginMode &&
            <>
              <StyledTextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="dense"
                required
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
              />
              <StyledTextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="dense"
                required
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
              />
            </>
          }
          <StyledTextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="dense"
            required
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <StyledTextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="dense"
            required
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <StyledTextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            required
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #00f260, #0575e6)',
              color: '#fff',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            {isLoginMode ? 'Login' : 'Create Your Identity'}
          </StyledButton>
        </form>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ActionLink
            onClick={() => setIsLoginMode(!isLoginMode)}
            tabIndex="0"
          >
            {isLoginMode ? 'Register' : 'Login'}
          </ActionLink>
          <ActionLink
            component={Link}
            to="/app/main"
            tabIndex="0"
          >
            Start Exploring
          </ActionLink>
        </Box>
      </FormCard>

      {/* Облака-баннеры */}
      <CloudBanner className="cloud-1" sx={{ top: '20%', left: '10%' }}>
        💡 Более 2M+ мыслей уже здесь.
      </CloudBanner>
      <CloudBanner className="cloud-2" sx={{ top: '40%', right: '10%' }}>
        🚀 Объединяйся с ИИ для роста идей.
      </CloudBanner>
      <CloudBanner className="cloud-3" sx={{ top: '60%', left: '15%' }}>
        🧠 ИИ = Социальный интеллект.
      </CloudBanner>
      <CloudBanner className="cloud-4" sx={{ top: '30%', right: '15%' }}>
        🌟 Создай будущее с VisionX.
      </CloudBanner>

      {/* Футуристичная навигация */}
      <Box sx={{ position: 'fixed', bottom: '20px', display: 'flex', gap: '16px' }}>
        <NavIcon title="Chat" tabIndex="0">💬</NavIcon>
        <NavIcon title="Channel" tabIndex="0">📡</NavIcon>
        <NavIcon title="AI Integration" tabIndex="0">🤖</NavIcon>
        <NavIcon title="Avatar" tabIndex="0">👤</NavIcon>
      </Box>
    </PageContainer>
  );
};

// CSS для мозаики
const styles = document.createElement('style');
styles.innerHTML = `
  .mosaic {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  .cell {
    position: absolute;
    background: linear-gradient(45deg, #00f260, #0575e6);
    opacity: 0.3;
    border-radius: 4px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  
  /* Убираем стандартный outline и заменяем на белый */
  *:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5) !important;
  }
  
  /* Для кнопок и интерактивных элементов */
  button:focus, a:focus, [tabindex="0"]:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8) !important;
  }
`;
document.head.appendChild(styles);

export default Register;