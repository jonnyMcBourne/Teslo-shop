import { Box, CircularProgress, Typography } from '@mui/material';
import React, { FC } from 'react';
interface Props{

}
export const Loading:FC<Props> = () =>{
return (

    <Box
      display="flex"
     flexDirection='column'
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
    >
      <Typography variant="h5" component="h5">
      Loading ...
      </Typography>
      <CircularProgress thickness={2} />
    </Box>

);
}
export default Loading 