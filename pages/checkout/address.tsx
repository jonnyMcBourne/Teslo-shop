import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import ShopLayout from "../../components/layout/ShopLayout"
import { AuthContext, CartContext } from "../../context";

const Adress = () => {
  const { isLoggedIn }=useContext(AuthContext);
  const {cartSummary} = useContext(CartContext)
  const router=useRouter()
  
  useEffect(()=>{
    if(!isLoggedIn){
      router.push('/auth/login?p=/chechout/summary')
    }
    if(cartSummary.quantityOfIttems <= 0){
      console.log('quantity',cartSummary.quantityOfIttems);
      router.replace('/cart/empty')
    }
  },[cartSummary.quantityOfIttems,isLoggedIn])

  return (
    <ShopLayout title="Check out" pageDescription="check payment ">
      <Typography variant="h1" component="h1">
        Adress
      </Typography>

      <Grid container spacing={2} sx={{mt:5}} >
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Adress" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Adress 2" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="zip code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="city" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>country</InputLabel>
            <Select variant="filled" label="country" value={1}>
              <MenuItem value={1}>Mexico</MenuItem>
              <MenuItem value={2}>Costa Rica</MenuItem>
              <MenuItem value={3}>El Salvador</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="cellphone" variant="filled" fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ mt:5 }} display='flex' justifyContent='center'>
          <Button color='secondary'className="circular-btn" size='large' >
              Check Order
          </Button>

      </Box>
    </ShopLayout>
  );
}

{
  /**
   * MAKING VALIDATION OF LOGGED IN BEFORE DISPLAY THE PAGE
   * 
    // You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const { token='' } = req.cookies
  let userId ='';
  let isValidToken = false;
  
  try {
    userId = await jwt.isValidToken(token);
    isValidToken =true;

  } catch (error) {
    isValidToken = false;
  }

  if(!isValidToken){
    return {
      redirect:{
        destination:'/auth/login?p=/checkout/address',
        permanent:false
      }
  }
}

  return {
    props: {
      
    }
  }
}
   
   */
}


export default Adress