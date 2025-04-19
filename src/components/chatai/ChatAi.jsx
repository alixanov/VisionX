import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Avatar,
  Chip,
  Tooltip,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PushPinIcon from '@mui/icons-material/PushPin';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ScienceIcon from '@mui/icons-material/Science';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

// OpenAI API key (NOTE: In production, this should NEVER be exposed in client-side code)
const OPENAI_API_KEY = "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";

const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '95vh',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: 'Inter, sans-serif',
  color: '#fff',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
    opacity: 0.05,
    zIndex: 0,
    pointerEvents: 'none',
  },
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 20px',
  background: 'rgba(16, 18, 27, 0.4)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  zIndex: 5,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  [theme.breakpoints.down('sm')]: {
    padding: '10px 12px',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 700,
  background: 'linear-gradient(45deg, #00F260, #0575E6, #A100FF)',
  backgroundSize: '200% 200%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradientShift 5s ease infinite',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const StatusIndicator = styled(Box)(({ status, theme }) => ({
  padding: '4px 12px',
  background: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.9rem',
  '& .status-dot': {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background:
      status === 'online'
        ? '#00F260'
        : status === 'typing'
          ? '#0575E6'
          : status === 'offline'
            ? '#ff5252'
            : '#888',
    boxShadow:
      status === 'online'
        ? '0 0 10px #00F260'
        : status === 'typing'
          ? '0 0 10px #0575E6'
          : status === 'offline'
            ? '0 0 10px #ff5252'
            : 'none',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '3px 8px',
    fontSize: '0.75rem',
    '& .status-dot': {
      width: '8px',
      height: '8px',
    },
  },
}));

const MessagesArea = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  position: 'relative',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(0, 242, 96, 0.5)',
    borderRadius: '3px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    gap: '16px',
  },
}));

const MessageBubble = styled(Paper, {
  shouldForwardProp: (prop) => !['isuser', 'ispinned'].includes(prop),
})(({ isuser, ispinned, theme }) => ({
  padding: '16px',
  maxWidth: '80%',
  width: 'fit-content',
  alignSelf: isuser ? 'flex-end' : 'flex-start',
  background: isuser ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: isuser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
  boxShadow: ispinned
    ? `0 4px 20px ${isuser ? 'rgba(0, 242, 96, 0.3)' : 'rgba(161, 0, 255, 0.3)'}, 0 0 0 1px ${isuser ? 'rgba(0, 242, 96, 0.5)' : 'rgba(161, 0, 255, 0.5)'
    }`
    : `0 4px 20px rgba(0, 0, 0, 0.1)`,
  border: ispinned ? `1px solid ${isuser ? '#00F260' : '#A100FF'}` : '1px solid rgba(0, 0, 0, 0.1)',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 6px 24px ${isuser ? 'rgba(0, 242, 96, 0.25)' : 'rgba(161, 0, 255, 0.25)'}`,
  },
  '&:hover .message-actions': {
    opacity: 1,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    maxWidth: '90%',
  },
}));

const MessageActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-12px',
  right: '10px',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  padding: '2px',
  display: 'flex',
  gap: '2px',
  opacity: 0,
  transition: 'opacity 0.2s ease',
  zIndex: 2,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    top: '-10px',
    right: '5px',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  padding: '4px',
  color: 'rgba(0, 0, 0, 0.7)',
  '&:hover': {
    color: '#00F260',
    background: 'rgba(0, 242, 96, 0.1)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '2px',
    '& svg': {
      fontSize: '0.9rem',
    },
  },
}));

const MessageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
  gap: '10px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '6px',
    gap: '6px',
  },
}));

const MessageAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'isai',
})(({ isai, theme }) => ({
  width: 32,
  height: 32,
  background: isai
    ? 'linear-gradient(135deg, #A100FF, #0575E6)'
    : 'linear-gradient(135deg, #00F260, #0575E6)',
  boxShadow: isai ? '0 0 15px rgba(161, 0, 255, 0.5)' : '0 0 15px rgba(0, 242, 96, 0.5)',
  [theme.breakpoints.down('sm')]: {
    width: 28,
    height: 28,
  },
}));

const MessageName = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isai',
})(({ isai, theme }) => ({
  fontWeight: 600,
  fontSize: '0.9rem',
  color: isai ? '#A100FF' : '#00F260',
  textShadow: isai ? '0 0 10px rgba(161, 0, 255, 0.5)' : '0 0 10px rgba(0, 242, 96, 0.5)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  color: 'rgba(0, 0, 0, 0.6)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.65rem',
  },
}));

const MessageText = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.5,
  wordBreak: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.85rem',
  },
}));

const MessageFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '8px',
  [theme.breakpoints.down('sm')]: {
    marginTop: '6px',
  },
}));

const MessageChip = styled(Chip)(({ theme }) => ({
  height: '24px',
  fontSize: '0.7rem',
  background: 'rgba(5, 117, 230, 0.1)',
  border: '1px solid rgba(5, 117, 230, 0.2)',
  color: '#0575E6',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '20px',
    fontSize: '0.65rem',
    '& .MuiChip-label': {
      padding: '0 6px',
    },
  },
}));

const InputArea = styled(Box)(({ theme }) => ({
  padding: '20px',
  background: 'rgba(16, 18, 27, 0.4)',
  backdropFilter: 'blur(20px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  display: 'flex',
  alignItems: 'flex-end',
  gap: '12px',
  position: 'relative',
  zIndex: 5,
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)',
  [theme.breakpoints.down('sm')]: {
    padding: '12px',
    gap: '8px',
  },
}));

const InputTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiInputBase-root': {
    background: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '20px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '0.95rem',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover, &.Mui-focused': {
      boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 242, 96, 0.5)',
      border: '1px solid rgba(0, 242, 96, 0.5)',
    },
  },
  '& .MuiInputBase-input': {
    padding: '0',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiInputBase-root': {
      padding: '8px 12px',
      fontSize: '0.85rem',
    },
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  background: 'linear-gradient(135deg, #00F260, #0575E6)',
  color: '#fff',
  borderRadius: '50%',
  boxShadow: '0 4px 15px rgba(0, 242, 96, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 242, 96, 0.6)',
  },
  '&:active': {
    transform: 'translateY(1px)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '40px',
    height: '40px',
  },
}));

const ModeButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ isActive, theme }) => ({
  width: '36px',
  height: '36px',
  background: isActive ? 'linear-gradient(135deg, #A100FF, #0575E6)' : 'rgba(16, 18, 27, 0.6)',
  color: '#fff',
  borderRadius: '50%',
  boxShadow: isActive ? '0 0 15px rgba(161, 0, 255, 0.5)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #A100FF, #0575E6)',
    boxShadow: '0 0 15px rgba(161, 0, 255, 0.5)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '32px',
    height: '32px',
  },
}));

const ModeSelector = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  padding: '6px 12px',
  background: 'rgba(16, 18, 27, 0.6)',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: '4px 8px',
    gap: '6px',
  },
}));

const AnimatedBubble = styled(Box)(({ size, color, theme }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: `radial-gradient(circle at 30% 30%, ${color}, transparent)`,
  filter: 'blur(8px)',
  opacity: 0.4,
  pointerEvents: 'none',
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: '#ff4d4d',
  textAlign: 'center',
  margin: '8px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const initialMessages = [
  {
    id: 1,
    text: "Welcome to VisionX Assistant! How can I help you today with your projects or ideas?",
    isUser: false,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    tags: ['Greeting'],
    isPinned: false,
  },
];

const ChatAi = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const messagesEndRef = useRef(null);
  const messagesAreaRef = useRef(null);
  const bubbleRefs = useRef([]);
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeMode, setActiveMode] = useState('assistant');
  const [anchorEl, setAnchorEl] = useState(null);
  const [error, setError] = useState('');
  const open = Boolean(anchorEl);

  let userData;
  try {
    const storedData = localStorage.getItem('userData');
    console.log('Stored userData in ChatAi:', storedData);
    userData = storedData ? JSON.parse(storedData) : {};
  } catch (err) {
    console.error('Error parsing userData:', err);
    userData = {};
  }

  useEffect(() => {
    if (!userData.email && !userData.username) {
      console.warn('No user data found, redirecting to /app/register');
      navigate('/app/register');
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (bubbleRefs.current.length > 0) {
      bubbleRefs.current.forEach((bubble) => {
        if (!bubble) return;
        gsap.to(bubble, {
          x: `random(-100, 100)`,
          y: `random(-100, 100)`,
          duration: `random(20, 40)`,
          opacity: `random(0.2, 0.5)`,
          scale: `random(0.8, 1.2)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePin = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg))
    );
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleChangeMode = (mode) => {
    setActiveMode(mode);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: `Chat cleared. What can I help you with in ${activeMode} mode?`,
        isUser: false,
        timestamp: new Date().toISOString(),
        tags: ['New Chat'],
        isPinned: false,
      },
    ]);
    handleMenuClose();
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const newUserMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true,
      timestamp: new Date().toISOString(),
      isPinned: false,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputText('');
    setIsTyping(true);
    setError('');

    const systemPrompts = {
      assistant:
        'You are a helpful assistant for VisionX, a platform for tech enthusiasts. Provide clear, concise, and friendly answers to general questions, focusing on AI, tech, and innovation.',
      coder:
        'You are a coding expert for VisionX. Provide detailed, accurate programming advice, including code snippets when relevant. Focus on modern frameworks like React, Node.js, and best practices.',
      designer:
        'You are a UI/UX design expert for VisionX. Offer creative design suggestions, focusing on modern trends like dark mode, glass-morphism, and responsive layouts. Provide actionable advice.',
      innovator:
        'You are an innovation consultant for VisionX. Think outside the box and suggest bold, creative ideas to revolutionize tech projects or user experiences.',
    };

    try {
      // Direct call to OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: systemPrompts[activeMode]
            },
            {
              role: "user",
              content: inputText
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const aiResponseText = data.choices[0].message.content;

      const aiResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        isUser: false,
        timestamp: new Date().toISOString(),
        tags: getRandomTags(),
        isPinned: false,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error getting AI response:', err);
      const errorMessage = err.message || 'Failed to get AI response. Please try again.';
      setError(errorMessage);

      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: `⚠️ ${errorMessage}`,
        isUser: false,
        timestamp: new Date().toISOString(),
        tags: ['Error'],
        isPinned: false,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const getRandomTags = () => {
    const allTags = ['AI', 'Design', 'Code', 'UX/UI', 'Innovation', 'Tech', 'Advice', 'Explanation'];
    const numTags = Math.floor(Math.random() * 2) + 1;
    const shuffled = [...allTags].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numTags);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatContainer>
      <AnimatedBubble
        ref={(el) => (bubbleRefs.current[0] = el)}
        size="300px"
        color="rgba(0, 242, 96, 0.2)"
        sx={{ top: '10%', right: '5%' }}
      />
      <AnimatedBubble
        ref={(el) => (bubbleRefs.current[1] = el)}
        size="400px"
        color="rgba(161, 0, 255, 0.15)"
        sx={{ bottom: '20%', left: '5%' }}
      />
      <AnimatedBubble
        ref={(el) => (bubbleRefs.current[2] = el)}
        size="250px"
        color="rgba(5, 117, 230, 0.2)"
        sx={{ top: '40%', left: '15%' }}
      />

      <Header>
        <Logo variant="h1">
          <ScienceIcon sx={{ fontSize: 28 }} /> VisionX Assistant
        </Logo>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StatusIndicator status={isTyping ? 'typing' : 'online'}>
            <Box className="status-dot" />
            {isTyping ? 'Thinking...' : 'Online'}
          </StatusIndicator>
          <IconButton
            onClick={handleMenuClick}
            sx={{ color: 'white', '&:hover': { color: '#00F260' } }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                background: 'rgba(16, 18, 27, 0.8)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                minWidth: '180px',
              },
            }}
          >
            <MenuItem onClick={handleClearChat} sx={{ fontSize: '0.9rem' }}>
              <RefreshIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              Clear Chat
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.9rem' }}>
              <BookmarkIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
              Save Chat
            </MenuItem>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '0.9rem' }}>
              <Box component="span" sx={{ mr: 1, fontSize: '1.2rem' }}>
                🌙
              </Box>
              Dark Theme
            </MenuItem>
          </Menu>
        </Box>
      </Header>

      <MessagesArea ref={messagesAreaRef}>
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            isuser={message.isUser}
            ispinned={message.isPinned}
            elevation={message.isPinned ? 8 : 3}
          >
            <MessageActions className="message-actions">
              <Tooltip title={message.isPinned ? 'Unpin' : 'Pin'}>
                <ActionButton size="small" onClick={() => handlePin(message.id)}>
                  <PushPinIcon fontSize="small" color={message.isPinned ? 'primary' : 'inherit'} />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Copy">
                <ActionButton size="small" onClick={() => handleCopy(message.text)}>
                  <ContentCopyIcon fontSize="small" />
                </ActionButton>
              </Tooltip>
              <Tooltip title="Delete">
                <ActionButton size="small" onClick={() => handleDelete(message.id)}>
                  <DeleteOutlineIcon fontSize="small" />
                </ActionButton>
              </Tooltip>
            </MessageActions>
            <MessageHeader>
              <MessageAvatar isai={!message.isUser}>
                {message.isUser ? (userData.firstName ? userData.firstName.charAt(0).toUpperCase() : 'U') : 'AI'}
              </MessageAvatar>
              <Box>
                <MessageName isai={!message.isUser}>
                  {message.isUser ? (userData.firstName || 'You') : 'VisionX AI'}
                </MessageName>
                <MessageTime>{formatTime(message.timestamp)}</MessageTime>
              </Box>
            </MessageHeader>
            <MessageText>{message.text}</MessageText>
            {message.tags && (
              <MessageFooter>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {message.tags.map((tag, index) => (
                    <MessageChip key={index} label={tag} size="small" />
                  ))}
                </Box>
              </MessageFooter>
            )}
          </MessageBubble>
        ))}
        {isTyping && (
          <MessageBubble isuser={false} ispinned={false}>
            <MessageHeader>
              <MessageAvatar isai>AI</MessageAvatar>
              <Box>
                <MessageName isai>VisionX AI</MessageName>
                <MessageTime>{formatTime(new Date().toISOString())}</MessageTime>
              </Box>
            </MessageHeader>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={16} thickness={5} sx={{ color: '#A100FF' }} />
              <MessageText>Thinking...</MessageText>
            </Box>
          </MessageBubble>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div ref={messagesEndRef} />
      </MessagesArea>

      <InputArea>
        <ModeSelector>
          <Tooltip title="Assistant Mode">
            <ModeButton isActive={activeMode === 'assistant'} onClick={() => handleChangeMode('assistant')}>
              <EmojiObjectsIcon fontSize={isMobile ? 'small' : 'medium'} />
            </ModeButton>
          </Tooltip>
          <Tooltip title="Coder Mode">
            <ModeButton isActive={activeMode === 'coder'} onClick={() => handleChangeMode('coder')}>
              <CodeIcon fontSize={isMobile ? 'small' : 'medium'} />
            </ModeButton>
          </Tooltip>
          <Tooltip title="Designer Mode">
            <ModeButton isActive={activeMode === 'designer'} onClick={() => handleChangeMode('designer')}>
              <BrushIcon fontSize={isMobile ? 'small' : 'medium'} />
            </ModeButton>
          </Tooltip>
        </ModeSelector>
        <InputTextField
          placeholder={isMobile ? 'Message...' : 'Ask me anything about AI, design, coding...'}
          multiline
          maxRows={4}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Voice Input">
            <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              <MicIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Message">
            {inputText.trim() === '' ? (
              <span>
                <SendButton disabled>
                  <SendIcon fontSize={isMobile ? 'small' : 'medium'} />
                </SendButton>
              </span>
            ) : (
              <SendButton onClick={handleSendMessage}>
                <SendIcon fontSize={isMobile ? 'small' : 'medium'} />
              </SendButton>
            )}
          </Tooltip>
        </Box>
      </InputArea>
    </ChatContainer>
  );
};

export default ChatAi;