import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Typography, Chip, Button, CardMedia, CssBaseline, useMediaQuery } from '@mui/material';
import { gsap } from 'gsap';
import { techNewsData } from '../data/AiData';

// Styled Components
const InfoProductContainer = styled(Box)(({ theme }) => ({
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
  zIndex: 2,
  padding: '40px 20px',
  [theme.breakpoints.down('lg')]: {
    padding: '35px 15px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
    paddingBottom: '150px',
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

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '2.5rem',
  background: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '16px',
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

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  color: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '24px',
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

const ProductContent = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.7)',
  lineHeight: '1.6',
  marginBottom: '24px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '0.95rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '0.75rem',
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: '500px',
  borderRadius: '12px',
  marginBottom: '16px',
  objectFit: 'cover',
  [theme.breakpoints.down('lg')]: {
    height: '280px',
  },
  [theme.breakpoints.down('md')]: {
    height: '250px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '180px',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  color: '#fff',
  padding: '10px 24px',
  fontSize: '1rem',
  borderRadius: '12px',
  textTransform: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(0, 242, 96, 0.5)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '8px 20px',
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '6px 16px',
    fontSize: '0.85rem',
  },
}));

// CSS для мозаики
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
`;
document.head.appendChild(styles);

const InfoProduct = () => {
  const { id } = useParams();
  const product = techNewsData.find((item) => item.id === parseInt(id));
  const isMobile = useMediaQuery('(max-width:600px)');

  // Мозаика фона
  useEffect(() => {
    const cells = [];
    const cellCount = isMobile ? 15 : 30;
    const container = document.createElement('div');
    container.className = 'mosaic';
    const infoContainer = document.querySelector('#info-product-container');
    if (infoContainer) {
      infoContainer.prepend(container);
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

    // Плавное появление клеток
    gsap.fromTo(
      cells,
      { opacity: 0, scale: 0 },
      {
        opacity: () => Math.random() * 0.5 + 0.2,
        scale: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );

    // Анимация движения клеток
    gsap.to(cells, {
      x: () => Math.random() * 80 - 40,
      y: () => Math.random() * 80 - 40,
      opacity: () => Math.random() * 0.5 + 0.2,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    // Реакция на движение мыши
    const handleMouseMove = (e) => {
      cells.forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 80) {
          gsap.to(cell, {
            x: dx * 0.15,
            y: dy * 0.15,
            opacity: 0.7,
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

  // Анимация контента
  useEffect(() => {
    gsap.fromTo(
      '.product-content',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        delay: 0.3,
      }
    );
  }, []);

  if (!product) {
    return (
      <InfoProductContainer id="info-product-container">
        <CssBaseline />
        <ContentWrapper className="product-content">
          <Typography variant="h5" sx={{ color: '#fff' }}>
            Product not found
          </Typography>
          <BackButton component={Link} to="/app/main" sx={{ mt: 2 }}>
            Back to Main
          </BackButton>
        </ContentWrapper>
      </InfoProductContainer>
    );
  }

  return (
    <InfoProductContainer id="info-product-container">
      <CssBaseline />
      <ContentWrapper className="product-content">
        <ProductTitle variant="h1">{product.title}</ProductTitle>
        <ProductDescription variant="h6">{product.description}</ProductDescription>
        {product.images.map((image, index) => (
          <ProductImage key={index} image={image} alt={product.title} />
        ))}
        <ProductContent>{product.content}</ProductContent>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
          {product.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{
                background: 'rgba(0, 242, 96, 0.2)',
                color: '#00F260',
                border: '1px solid #00F260',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
              }}
            />
          ))}
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            mb: 3,
            display: 'block',
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
          }}
        >
          {new Date(product.date).toLocaleDateString()}
        </Typography>
        <BackButton component={Link} to="/app/main">
          Back to Main
        </BackButton>
      </ContentWrapper>
    </InfoProductContainer>
  );
};

export default InfoProduct;