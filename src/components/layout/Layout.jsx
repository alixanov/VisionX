import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { gsap } from 'gsap';
import { Sidebar } from '../../components/';
import '../styles/fonts.css';

// Styled Components
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
  position: 'relative',
  zIndex: 10,
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    paddingBottom: '80px',
    padding: '15px',
  },
}));

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  // Мозаика фона
  useEffect(() => {
    const cells = [];
    const cellCount = isMobile ? 15 : 30;
    const container = document.createElement('div');
    container.className = 'mosaic';
    document.querySelector('#layout-container').prepend(container);

    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const size = Math.random() * 15 + 5;
      cell.style.width = `${size}px`;
      cell.style.height = `${size}px`;
      // Ограничиваем появление клеток, чтобы не попадали в правые 220px (где Sidebar)
      cell.style.left = `${Math.random() * (isMobile ? 100 : 80)}%`;
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

  return (
    <LayoutContainer id="layout-container">
      <CssBaseline />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Sidebar />
    </LayoutContainer>
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

export default MainLayout;