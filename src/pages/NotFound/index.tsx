import { Grid, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React from 'react';

const NotFound = () => {
  return (
    <Grid
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        width: '100%',
      }}>
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{ paddingRight: 2, marginRight: 2, borderRight: '1px solid #203020' }}
          variant="h5">
          404
        </Typography>
        <Typography variant="h5">Страница не найдена</Typography>
      </Box>
    </Grid>
  );
};

export default NotFound;
