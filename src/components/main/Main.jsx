import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, Button } from '@mui/material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { techNewsData } from '../data/AiData';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Main container
const MainContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  color: '#fff',
  fontFamily: 'Space Grotesk, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  marginRight: '220px',
  paddingBottom: '150px',
  marginTop: -40,

  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    paddingBottom: '150px',
  },
  [theme.breakpoints.down('sm')]: {
    paddingBottom: '50px',
    marginTop:-180,
  },
}));

// Hero section
const HeroSection = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  padding: '20px',
  [theme.breakpoints.down('md')]: {
    minHeight: '80vh',
    padding: '15px',
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '70vh',
    padding: '10px',
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '4rem',
  background: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: '16px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: 'rgba(255, 255, 255, 0.7)',
  maxWidth: '600px',
  marginBottom: '32px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
    maxWidth: '90%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    maxWidth: '95%',
    marginBottom: '20px',
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  color: '#fff',
  padding: '12px 32px',
  fontSize: '1.2rem',
  borderRadius: '12px',
  textTransform: 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(0, 242, 96, 0.5)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '10px 24px',
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px 20px',
    fontSize: '0.9rem',
  },
}));

const CloudBanner = styled(Box)(({ theme }) => ({
  position: 'absolute',
  padding: '16px',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '2px solid transparent',
  borderImage: 'linear-gradient(45deg, #00F260, #0575e6, #A100FF) 1',
  borderRadius: '20px',
  color: '#fff',
  fontSize: '1rem',
  opacity: 0,
  transform: 'translateY(20px)',
  zIndex: 3,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(10px) scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '12px',
    fontSize: '0.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
    padding: '8px',
    display: 'none',
  },
}));

// News section
const NewsSection = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  maxWidth: '100%',
  width: '100%',
  margin: '0 auto',
  marginTop: "-190px",
  [theme.breakpoints.down('lg')]: {
    maxWidth: '900px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '40px 15px',
    maxWidth: '700px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
    maxWidth: '100%',
  },
}));

const NewsCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: '550px',
  background: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  boxSizing: 'border-box',
  margin: '0 auto',
  transition: 'transform 0.3s ease, border 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.02)',
    border: '2px solid #00F260',
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '450px',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '400px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const NewsImage = styled(CardMedia)(({ theme }) => ({
  width: '50%',
  height: '200px',
  borderRadius: '8px',
  [theme.breakpoints.down('lg')]: {
    height: '180px',
  },
  [theme.breakpoints.down('md')]: {
    height: '160px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '120px',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
  padding: '8px',
  [theme.breakpoints.down('sm')]: {
    gap: '4px',
    padding: '4px',
  },
}));

// Futuristic section
const FuturisticSection = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  background: 'rgba(255, 255, 255, 0.05)',
  position: 'relative',
  [theme.breakpoints.down('lg')]: {
    padding: '50px 15px',
  },
  [theme.breakpoints.down('md')]: {
    padding: '40px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
  },
}));

const AvatarBubble = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '50px',
  height: '50px',
  background: 'linear-gradient(45deg, #00F260, #0575E6)',
  borderRadius: '50%',
  opacity: '0.7',
  pointerEvents: 'none',
  willChange: 'transform, opacity',
  [theme.breakpoints.down('md')]: {
    width: '40px',
    height: '40px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '30px',
    height: '30px',
  },
}));

// Banner section
const BannerSection = styled(Box)(({ theme }) => ({
  padding: '60px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '900px',
    padding: '50px 15px',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '700px',
    padding: '40px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 10px',
    maxWidth: '100%',
  },
}));

const BannerCard = styled(Box)(({ theme }) => ({
  minWidth: '300px',
  height: '200px',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 242, 96, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  margin: '0 16px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  zIndex: 2,
  willChange: 'transform',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 12px 32px rgba(0, 242, 96, 0.4)',
  },
  [theme.breakpoints.down('lg')]: {
    minWidth: '280px',
    height: '180px',
  },
  [theme.breakpoints.down('md')]: {
    minWidth: '250px',
    height: '150px',
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
    margin: '8px 0',
    height: '120px',
  },
}));

const BannerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  overflowX: 'auto',
  padding: '16px 0',
  scrollSnapType: 'x mandatory',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));



const Main = () => {
  useEffect(() => {
    // Cloud animations
    gsap.to('.cloud-1', {
      y: -15,
      opacity: 1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      delay: 0.5,
      ease: 'sine.inOut',
    });

    // Banner animations
    const banners = gsap.utils.toArray('.banner-card');
    if (window.innerWidth > 600) {
      gsap.to(banners, {
        xPercent: -100 * (banners.length - 1),
        ease: 'none',
        duration: 12,
        repeat: -1,
        modifiers: {
          xPercent: gsap.utils.wrap(-100 * (banners.length - 1), 0),
        },
      });
    }

    gsap.to('.banner-card', {
      scrollTrigger: {
        trigger: '.banner-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
    });

    // Avatar bubble animations
    const bubbles = gsap.utils.toArray('.avatar-bubble');
    gsap.to(bubbles, {
      x: () => Math.random() * 120 - 60,
      y: () => Math.random() * 120 - 60,
      scale: () => Math.random() * 0.4 + 0.6,
      opacity: 0.6,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.2,
      delay: 0.3,
    });

    // Avatar animation on scroll
    gsap.to('.ai-avatar', {
      scrollTrigger: {
        trigger: '.futuristic-section',
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: true,
      },
      opacity: 1,
      x: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Footer animation
    gsap.from('.footer-section', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer-section',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    // Responsive adjustments
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        gsap.killTweensOf(banners);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MainContainer id="main-container">
      {/* Hero Block */}
      <HeroSection>
        <HeroTitle variant="h1">Dive into Digital Reality</HeroTitle>
        <HeroSubtitle variant="h5">
          Explore the technologies of the future. Connect with the VisionX community.
        </HeroSubtitle>
        <JoinButton component={Link} to="/">
          Join Now
        </JoinButton>
        <CloudBanner className="cloud-1" sx={{ top: '20%', left: '10%' }}>
          Welcome to the metaverse
        </CloudBanner>
      </HeroSection>

      {/* News Grid */}
      <NewsSection>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: '#00F260',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Latest Innovations
        </Typography>
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} wrap="wrap" justifyContent="center">
          {techNewsData.map((news) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={news.id}>
              <Link to={`/info-product/${news.id}`} style={{ textDecoration: 'none' }}>
                <NewsCard>
                  <ImageContainer>
                    <NewsImage image={news.images[0]} alt={news.title} />
                    <NewsImage image={news.images[1]} alt={news.title} />
                  </ImageContainer>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Chip
                        label={news.tags[0] || 'Tech'}
                        sx={{
                          background: 'linear-gradient(45deg, #00F260, #0575E6)',
                          color: '#fff',
                          fontSize: '0.8rem',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#000',
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(0, 0, 0, 0.7)',
                        fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                      }}
                    >
                      {news.description}
                    </Typography>
                    <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                      {news.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          sx={{
                            background: 'rgba(0, 242, 96, 0.2)',
                            color: '#00F260',
                            border: '1px solid #00F260',
                            fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          }}
                        />
                      ))}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'rgba(0, 0, 0, 0.5)', mt: 2, display: 'block' }}
                    >
                      {new Date(news.date).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </NewsCard>
              </Link>
            </Grid>
          ))}
        </Grid>
      </NewsSection>

      {/* Futuristic block */}
      <FuturisticSection className="futuristic-section">
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#A100FF',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Live in the Rhythm of Innovation
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Box
            sx={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: { xs: '12px', sm: '16px' },
              borderRadius: '12px',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#00F260',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              }}
            >
              SOL/USD: $142.35 (+2.3%)
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', gap: { xs: 1, sm: 2 }, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {['AI Robotics', 'Smart Homes', 'AR/VR Design'].map((item, index) => (
              <Chip
                key={index}
                label={item}
                sx={{
                  background: 'linear-gradient(45deg, #00F260, #0575E6)',
                  color: '#fff',
                  padding: { xs: '4px 8px', sm: '8px 16px' },
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                }}
              />
            ))}
          </Box>
          <Box
            className="ai-avatar"
            sx={{ opacity: 0, transform: 'translateX(100px)', textAlign: 'center' }}
          >
            <Typography
              variant="h6"
              sx={{
                color: '#A100FF',
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              }}
            >
              Hello! Ready to create the future?
            </Typography>
          </Box>
        </Box>
        {[...Array(2)].map((_, i) => (
          <AvatarBubble
            key={i}
            className="avatar-bubble"
            sx={{ top: `${20 + i * 25}%`, left: `${10 + i * 25}%` }}
          />
        ))}
      </FuturisticSection>

      {/* Banner section */}
      <BannerSection className="banner-section">
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            color: '#0575E6',
            mb: 4,
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          }}
        >
          Inspiration Starts Here
        </Typography>
        <BannerContainer>
          {['Your idea is waiting', 'Be part of innovation', 'Create. Share. Inspire.'].map(
            (text, index) => (
              <BannerCard key={index} className="banner-card">
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
                  }}
                >
                  {text}
                </Typography>
              </BannerCard>
            )
          )}
        </BannerContainer>
      </BannerSection>

      {/* Footer */}
      {/* <FooterSection className="footer-section">
        <Typography
          variant="body2"
          sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
        >
          © 2025 VisionX. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <FooterLink>Twitter</FooterLink>
          <FooterLink>Discord</FooterLink>
          <FooterLink>Contact: info@visionx.com</FooterLink>
        </Box>
      </FooterSection> */}
    </MainContainer>
  );
};

// CSS for logo
const styles = document.createElement('style');
styles.innerHTML = `
  .visionx-logo {
    font-family: 'Orbitron', sans-serif;
    font-size: 2rem;
    background: linear-gradient(45deg, #00F260, #0575E6, #A100FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 5s ease infinite;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @media (max-width: 600px) {
    .visionx-logo {
      font-size: 1.5rem;
    }
  }
`;
document.head.appendChild(styles);

export default Main;