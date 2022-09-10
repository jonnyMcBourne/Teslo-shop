import { Box, Typography } from '@mui/material'
import React from 'react'
import ShopLayout from '../components/layout/ShopLayout'

const Custom404 = () => {
  return (
    <ShopLayout title="Page not found" pageDescription="nothing to display">
      <Box
        display='flex'
        sx={{
            flexDirection:{xs:'column',sm:'row'}
        }}
        justifyContent="center"
        alignItems="center"
        height='calc(100vh - 200px)'
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          We could not find any page 
        </Typography>
      </Box>
    </ShopLayout>
  );
}

export default Custom404