import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip } from "@mui/material";
import { techNewsData } from "../AiData";

// Контейнер ленты
const FeedContainer = styled(Box)({
  maxWidth: "100%",
  margin: "auto",
  padding: "20px",
});

// Карточка новости с белым фоном
const NewsCard = styled(Card)({
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
  overflow: "hidden",
  width: "600px",
});

// Контейнер изображений (2 картинки сверху)
const ImageContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "10px",
});

// Стилизация изображения
const NewsImage = styled(CardMedia)({
  width: "50%",
  height: 320,
  borderRadius: "8px",
});

const Main = () => {
  return (
    <FeedContainer>
      <Grid container spacing={2}>
        {techNewsData.map((news) => (
          <Grid item xs={12} sm={6} key={news.id}> {/* 2 карточки в ряд, 1 на мобильных */}
            <NewsCard>
              {/* Две картинки сверху */}
              <ImageContainer>
                <NewsImage image={news.images[0]} alt="Новость" />
                <NewsImage image={news.images[1]} alt="Новость" />
              </ImageContainer>

              {/* Описание снизу */}
              <CardContent>
                <Typography variant="h5" color="black">{news.title}</Typography>
                <Typography variant="body2" color="gray">{news.description}</Typography>
                <Box mt={1} display="flex" gap={1}>
                  {news.tags.map((tag, index) => (
                    <Chip key={index} label={tag} sx={{ background: "rgba(0, 242, 96, 0.3)", color: "black" }} />
                  ))}
                </Box>
                <Typography variant="caption" color="gray" mt={2}>
                  {new Date(news.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </NewsCard>
          </Grid>
        ))}
      </Grid>
    </FeedContainer>
  );
};

export default Main;
