import React from "react";
import Nextlink from 'next/link'
import { Grid, Typography, TextField, Button,Link } from "@mui/material";
import { Box } from "@mui/system";
import { AuthLayout } from "../../components/layout";

export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Login
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="email" variant="filled" fullWidth type="email" />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="password"
              variant="filled"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              color="secondary"
              className="circular-btn"
              size="large"
            >
              Sumbit
            </Button>
          </Grid>
          <Grid item xs={12} display='flex' justifyContent='end' >
             <Nextlink href='/auth/register' passHref >
                 <Link underline="always">
                    create a new account
                 </Link>
             </Nextlink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
