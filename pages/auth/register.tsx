import React, { FC } from "react";
import Nextlink from "next/link";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import { AuthLayout } from "../../components/layout";

interface Props{

}

const RegisterPage:FC<Props> = () => {
  return (
    <AuthLayout title="register">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create a new account
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="last name" variant="filled" fullWidth />
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
          <Grid item xs={12} display="flex" justifyContent="end">
            <Nextlink href="/auth/login" passHref>
              <Link underline="always">Already have an account?</Link>
            </Nextlink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;