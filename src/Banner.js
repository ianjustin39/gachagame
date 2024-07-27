import React from 'react';
import { Box, Typography } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        // padding: '50px 20px',
        height: '300px',  // 固定高度
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        精油抓周
      </Typography>
      <Typography variant="h6" component="p">
        Aroma Around
      </Typography>
    </Box>
  );
};

export default Banner;
