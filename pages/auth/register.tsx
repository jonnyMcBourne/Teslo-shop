import React, { FC } from "react";
import Nextlink from "next/link";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Box } from "@mui/system";
import { AuthLayout } from "../../components/layout";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";

interface Props{

}

type formData = {email:string, password:string,name:string,lastName:string}

const RegisterPage:FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  console.log('ERRORS',errors);

  const onRegister = async ({email,lastName,name,password}:formData)=>{
    try {
      const{data}= await tesloApi.post('/user/register',{name,lastName,email,password});
      const {token,user} = data
      console.log('TOKEN:',token,'USER:',user);
    } catch (error) {
      console.log('ERROR',error);
    }
  }
  
  return (
    <AuthLayout title="register">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create a new account
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onRegister)} >
          <Grid item xs={12}>
            <TextField {...register('name',{required:'this field is required' })} label="name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField {...register('lastName',{required:'this field is required' })} label="last name" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField {...register('email',{required:'this field is required' })} label="email" variant="filled" fullWidth type="email" />
          </Grid>
          <Grid item xs={12}>
            <TextField
            {...register('password',{required:'this field is required',minLength:{value:6,message:'password must be at least 6 characters'} })}
              label="password"
              variant="filled"
              fullWidth
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              className="circular-btn"
              size="large"
            >
              Sumbit
            </Button>
          </Grid>

          </form>
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