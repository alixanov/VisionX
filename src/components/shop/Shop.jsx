import React, { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  useMediaQuery,
  CssBaseline,
  TextField,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { gsap } from 'gsap';
import Tilt from 'react-parallax-tilt';
import { visionxProducts } from '../data/visionxProducts';
import CloseIcon from '@mui/icons-material/Close';
import PaymentIcon from '@mui/icons-material/Payment';
import SecurityIcon from '@mui/icons-material/Security';

// Styled Components
const ShopContainer = styled(Box)(({ theme }) => ({
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
  zIndex: 2,
  [theme.breakpoints.down('lg')]: {
    padding: '35px 15px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '15px 8px',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  width: '100%',
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '1000px',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '800px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const ShopTitle = styled(Typography)(({ theme }) => ({
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

const ShopSubtitle = styled(Typography)(({ theme }) => ({
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

const FeaturesList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '32px',
  fontSize: '1rem',
  color: '#fff',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const ProductGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  color: '#fff',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0, 242, 96, 0.4)',
    '&:before': { opacity: 1 },
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '350px',
    margin: '0 auto',
  },
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '12px 12px 0 0',
  [theme.breakpoints.down('sm')]: {
    height: '180px',
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.5rem',
  color: '#fff',
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.2rem',
  color: '#00F260',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const ProductTags = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
}));

const StockStatus = styled(Typography)(({ stock }) => ({
  fontSize: '0.9rem',
  color: stock === 'available' ? '#00F260' : '#ff4d4d',
  marginBottom: '16px',
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  color: '#fff',
  padding: '10px 20px',
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
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 16px',
    fontSize: '0.9rem',
  },
}));

const CheckoutOverlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100%',
  maxHeight: '80vh',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(12px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px 16px 0 0',
  boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.3)',
  color: '#fff',
  padding: '24px',
  zIndex: 1000,
  overflowY: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
  },
}));

const OverlayBackdrop = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
});

const CheckoutTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '2rem',
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const CartItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  },
}));

const TotalPrice = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.5rem',
  color: '#00F260',
  margin: '16px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

const PaymentMethods = styled(Box)({
  display: 'flex',
  gap: '16px',
  marginBottom: '16px',
});

const SecurityBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '0.9rem',
  color: 'rgba(255, 255, 255, 0.8)',
  marginTop: '16px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const PayButton = styled(Button)(({ theme }) => ({
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
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.8)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '10px 20px',
    fontSize: '0.9rem',
  },
}));

const ErrorMessage = styled(Typography)({
  color: '#ff4d4d',
  fontSize: '0.9rem',
  marginTop: '8px',
});

const SuccessMessage = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.5rem',
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  margin: '16px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

// CSS для мозаики, анимаций и конфетти
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
  .confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    background: linear-gradient(45deg, #00F260, #0575E6, #A100FF);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1001;
  }
  @keyframes wave {
    0% { transform: translateY(0); opacity: 0.3; }
    50% { transform: translateY(-20px); opacity: 0.5; }
    100% { transform: translateY(0); opacity: 0.3; }
  }
`;
document.head.appendChild(styles);

const Shop = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const cardRefs = useRef([]);
  const overlayRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [error, setError] = useState('');

  // Load user data from localStorage
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setFormData({
        email: userData.email || '',
        name: `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
      });
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  }, []);

  // Мозаика фона
  useEffect(() => {
    const cells = [];
    const cellCount = isMobile ? 15 : 30;
    const container = document.createElement('div');
    container.className = 'mosaic';
    const shopContainer = document.querySelector('#shop-container');
    if (shopContainer) {
      shopContainer.prepend(container);
    }

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const size = Math.random() * 15 + 5;
      cell.style.width = `${size}px`;
      cell.style.height = `${size}px`;
      cell.style.left = `${Math.random() * 100}%`;
      cell.style.top = `${Math.random() * 100}%`;
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
  }, [isMobile]);

  // Анимация карточек
  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      }
    );
  }, []);

  // Анимация открытия/закрытия overlay
  useEffect(() => {
    if (checkoutOpen) {
      gsap.fromTo(
        overlayRef.current,
        { y: '100%' },
        { y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [checkoutOpen]);

  // Конфетти при успешной оплате
  useEffect(() => {
    if (paymentStatus === 'success') {
      const confettiCount = 50;
      const confettiContainer = document.createElement('div');
      document.body.appendChild(confettiContainer);

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confettiContainer.appendChild(confetti);
        gsap.to(confetti, {
          x: () => Math.random() * window.innerWidth - window.innerWidth / 2,
          y: () => Math.random() * window.innerHeight - window.innerHeight / 2,
          scale: Math.random() * 0.5 + 0.5,
          rotation: () => Math.random() * 360,
          opacity: 0,
          duration: 2,
          ease: 'power1.out',
          delay: Math.random() * 0.5,
          onComplete: () => confetti.remove(),
        });
      }

      return () => confettiContainer.remove();
    }
  }, [paymentStatus]);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCheckoutOpen(true);
    console.log(`Added to cart: ${product.name}`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handlePayment = async (payButtonRef) => {
    if (!formData.email || !formData.name) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Invalid email format');
      return;
    }

    setPaymentStatus('loading');
    setError('');

    // Анимация "взрыва" кнопки
    gsap.to(payButtonRef, {
      scale: 1.2,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(payButtonRef, { scale: 1, opacity: 1, duration: 0.1 });
      },
    });

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPaymentStatus('success');
      setCart([]); // Clear cart on success
    } catch (err) {
      setPaymentStatus('error');
      setError('Payment failed. Please try again.');
    }
  };

  const calculateTotal = () => {
    return cart
      .reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0)
      .toFixed(2);
  };

  const CheckoutPanel = ({ onClose }) => {
    const payButtonRef = useRef(null);

    return (
      <>
        <OverlayBackdrop onClick={onClose} />
        <CheckoutOverlay ref={overlayRef}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <CheckoutTitle>🧾 VisionX Checkout</CheckoutTitle>
            <IconButton onClick={onClose} sx={{ color: '#fff' }} aria-label="Close checkout">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
            Вы почти у цели. Устройства из будущего ждут вас! Подтвердите заказ и получите доступ к самой передовой технологии уже сегодня.
          </Typography>

          {cart.length === 0 && paymentStatus !== 'success' && (
            <Typography color="rgba(255, 255, 255, 0.8)">Your cart is empty.</Typography>
          )}

          {cart.map((item) => (
            <CartItem key={item.product.id}>
              <Typography sx={{ flex: 1 }}>
                {item.product.name} (x{item.quantity})
              </Typography>
              <Typography>
                ${(item.product.priceUSD * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                onClick={() => handleRemoveFromCart(item.product.id)}
                sx={{ color: '#ff4d4d' }}
                aria-label={`Remove ${item.product.name}`}
              >
                <CloseIcon />
              </IconButton>
            </CartItem>
          ))}

          {cart.length > 0 && (
            <TotalPrice>Total: ${calculateTotal()}</TotalPrice>
          )}

          {paymentStatus !== 'success' && cart.length > 0 && (
            <>
              <TextField
                fullWidth
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                margin="dense"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="dense"
                InputLabelProps={{ style: { color: '#fff' } }}
                InputProps={{ style: { color: '#fff', borderColor: 'rgba(255, 255, 255, 0.2)' } }}
                sx={{ mb: 2 }}
              />
              <PaymentMethods>
                <PaymentIcon sx={{ color: '#00F260' }} />
                <Typography>VisionX Pay / Google Pay / Crypto</Typography>
              </PaymentMethods>
              <PayButton
                ref={payButtonRef}
                onClick={() => handlePayment(payButtonRef.current)}
                disabled={paymentStatus === 'loading'}
              >
                {paymentStatus === 'loading' ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Pay Now'
                )}
              </PayButton>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}

          {paymentStatus === 'success' && (
            <SuccessMessage>Thanks for your order!</SuccessMessage>
          )}

          <SecurityBadge>
            <SecurityIcon fontSize="small" sx={{ color: '#00F260' }} />
            <Typography>Protected by VisionX Protocol</Typography>
          </SecurityBadge>
        </CheckoutOverlay>
      </>
    );
  };

  return (
    <ShopContainer id="shop-container">
      <CssBaseline />
      <Box className="wave-overlay" />
      <ContentWrapper>
        <ShopTitle variant="h1">🛒 VisionX Tech Shop</ShopTitle>
        <ShopSubtitle>
          Где технологии становятся личными
          <br />
          Добро пожаловать в магазин VisionX — здесь ты можешь приобрести не просто гаджеты, а кусочек будущего.
          <br />
          Каждое устройство в каталоге отобрано за инновации, дизайн и потенциал изменить твой день.
        </ShopSubtitle>
        <FeaturesList>
          <Typography>💡 Прямые поставки от брендов нового поколения</Typography>
          <Typography>🧠 Устройства с AI, VR и IoT интеграцией</Typography>
          <Typography>🌌 Уникальный дизайн в стиле VisionX Universe</Typography>
          <Typography>🔐 Безопасная оплата и быстрая доставка</Typography>
        </FeaturesList>
        <ProductGrid>
          {visionxProducts.map((product, index) => (
            <Tilt key={product.id} tiltMaxAngleX={10} tiltMaxAngleY={10}>
              <ProductCard ref={(el) => (cardRefs.current[index] = el)}>
                <ProductImage src={product.image} alt={product.name} />
                <CardContent>
                  <ProductName>{product.name}</ProductName>
                  <ProductDescription>{product.description}</ProductDescription>
                  <ProductPrice>${product.priceUSD.toFixed(2)}</ProductPrice>
                  <ProductTags>
                    {product.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          fontFamily: 'Orbitron, sans-serif',
                          '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                        }}
                      />
                    ))}
                  </ProductTags>
                  <StockStatus stock={product.stock}>
                    {product.stock === 'available' ? 'In Stock' : 'Low Stock'}
                  </StockStatus>
                  <AddToCartButton
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 'low-stock'}
                  >
                    Add to Cart
                  </AddToCartButton>
                </CardContent>
              </ProductCard>
            </Tilt>
          ))}
        </ProductGrid>
      </ContentWrapper>
      {checkoutOpen && <CheckoutPanel onClose={() => setCheckoutOpen(false)} />}
    </ShopContainer>
  );
};

export default Shop;