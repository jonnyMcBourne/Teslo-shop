import { Card, CardActions, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import ShopLayout from '../components/layout/ShopLayout'
import ProductList from '../components/products/ProductList'
import { initialData } from '../database/products'
import { IProduct } from '../interfaces'


const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Teslo-Shop Home"}
      pageDescription={"Find the best products of Aguascalientes "}
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        All Products
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  ); 
}

export default Home
