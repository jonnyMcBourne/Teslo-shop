import { Card, CardActions, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import ShopLayout from '../components/layout/ShopLayout'
import { initialData } from '../database/products'


const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Teslo-Shop Home"}
      pageDescription={"Find the best products of Aguascalientes "}
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>
      <Typography variant="h2" component="h2" sx={{mb:1}} >
        All Products
      </Typography>
      <Grid container spacing={4}>
        {initialData.products.map(product =>(<Grid item xs={6} sm={4} key={product.slug}>  
        <Card>
          <CardActions>
            <CardMedia 
            component='img' 
            image={`products/${product.images[0]}`} 
            alt={product.title}
             />
          </CardActions>
        </Card>
        </Grid>  ))}
      </Grid>
    </ShopLayout>
  );
}

export default Home
