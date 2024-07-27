import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(card) {
    const cardInfo = card.card
  return (
    <Card sx={{ minHeight: 360, minWidth:210 , maxWidth: 345, padding: '3px' }}>
        <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
                {cardInfo.title}
            </Typography>
        </CardContent>
        <CardMedia
            component="img"
            image={cardInfo.imgSrc}
            title="green iguana"
            sx={{
            objectFit: 'contain',
            maxHeight: '100%' // 避免圖片過大
            }}
        />

    </Card>
  );
}
