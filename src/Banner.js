import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


const Banner = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
            <Typography variant="h6" sx={{ my: 2 }}>
                AROMA AROUND
            </Typography>
        </Toolbar>
    </Box>
  );
};

export default Banner;
