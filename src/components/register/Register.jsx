import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Card, TextField, Button, Typography, CircularProgress } from '@mui/material';
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
    opacity: '0.9',
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
      border: 'none',
      borderRadius: '8px',
    },
  },
});

const StyledButton = styled(Button)({
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)',
  },
});

const ErrorMessage = styled(Typography)({
  color: '#ff4d4d',
  fontSize: '0.9rem',
  textAlign: 'center',
  marginTop: '8px',
});

const Register = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cells = [];
    const cellCount = 50;
    const container = document.createElement('div');
    container.className = 'mosaic';
    document.querySelector('#page-container')?.prepend(container);

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

  useEffect(() => {
    gsap.to('.cloud-1', { y: -20, opacity: 1, duration: 2, repeat: -1, yoyo: true });
    gsap.to('.cloud-2', { y: -15, opacity: 1, duration: 2.5, repeat: -1, yoyo: true, delay: 0.5 });
    gsap.to('.cloud-3', { y: -10, opacity: 1, duration: 2, repeat: -1, yoyo: true, delay: 1 });
    gsap.to('.cloud-4', { y: -25, opacity: 1, duration: 2.2, repeat: -1, yoyo: true, delay: 0.8 });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // Clear error on input
  };

  const validateForm = () => {
    if (!isLoginMode) {
      if (!formData.firstName.trim()) return 'First name is required';
      if (!formData.lastName.trim()) return 'Last name is required';
    }
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.username.trim()) return 'Username is required';
    if (!formData.password.trim()) return 'Password is required';
    if (!isLoginMode && formData.password.length < 6) return 'Password must be at least 6 characters';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Invalid email format';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Save user data
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        username: formData.username.trim(),
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      console.log('Saved userData:', userData); // Debugging

      if (!isLoginMode) {
        // After registration, switch to login mode
        setIsLoginMode(true);
        setFormData((prev) => ({ ...prev, password: '' }));
      } else {
        // After login, navigate to account
        navigate('/app/account');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer id="page-container">
      <Tilt>
        <BannerBox>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {isLoginMode ? 'Welcome Back to VisionX' : 'Connect. Think. Be Heard. Welcome to VisionX.'}
          </Typography>
        </BannerBox>
      </Tilt>

      <FormCard>
        <Typography variant="h6" align="center" gutterBottom>
          {isLoginMode ? 'Login' : 'Register'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <StyledTextField
                fullWidth
                name="firstName"
                label="First Name"
                variant="outlined"
                margin="dense"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
              />
              <StyledTextField
                fullWidth
                name="lastName"
                label="Last Name"
                variant="outlined"
                margin="dense"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
              />
            </>
          )}
          <StyledTextField
            fullWidth
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            margin="dense"
            required
            value={formData.email}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <StyledTextField
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            margin="dense"
            required
            value={formData.username}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          <StyledTextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="dense"
            required
            value={formData.password}
            onChange={handleInputChange}
            InputLabelProps={{ style: { color: '#fff' } }}
            InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #00f260, #0575e6)',
              color: '#fff',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isLoginMode ? (
              'Login'
            ) : (
              'Create Your Identity'
            )}
          </StyledButton>
        </form>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ActionLink
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setFormData((prev) => ({ ...prev, password: '' }));
              setError('');
            }}
            tabIndex="0"
          >
            {isLoginMode ? 'Need an account? Register' : 'Already have an account? Login'}
          </ActionLink>
          {isLoginMode && (
            <ActionLink component={Link} to="/app/main" tabIndex="0">
              Start Exploring
            </ActionLink>
          )}
        </Box>
      </FormCard>

      <CloudBanner className="cloud-1" sx={{ top: '20%', left: '10%' }}>
        💡 {isLoginMode ? 'Welcome back!' : 'Join our community of thinkers'}
      </CloudBanner>
      <CloudBanner className="cloud-2" sx={{ top: '40%', right: '10%' }}>
        🚀 {isLoginMode ? 'Continue your journey' : 'Start your journey today'}
      </CloudBanner>
      <CloudBanner className="cloud-3" sx={{ top: '60%', left: '15%' }}>
        🧠 {isLoginMode ? 'Your ideas are waiting' : 'Unlock your potential'}
      </CloudBanner>
      <CloudBanner className="cloud-4" sx={{ top: '30%', right: '15%' }}>
        🌟 {isLoginMode ? 'Great to see you again' : 'Create your future'}
      </CloudBanner>

      <Box sx={{ position: 'fixed', bottom: '20px', display: 'flex', gap: '16px' }}>
        <NavIcon title="Chat" tabIndex="0">💬</NavIcon>
        <NavIcon title="Channel" tabIndex="0">📡</NavIcon>
        <NavIcon title="AI Integration" tabIndex="0">🤖</NavIcon>
        <NavIcon title="Avatar" tabIndex="0">👤</NavIcon>
      </Box>
    </PageContainer>
  );
};

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
  
  *:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5) !important;
  }
  
  button:focus, a:focus, [tabindex="0"]:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8) !important;
  }
`;
document.head.appendChild(styles);

export default Register;