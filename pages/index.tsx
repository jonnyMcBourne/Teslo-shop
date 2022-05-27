import type { NextPage } from 'next'
import {Typography } from '@mui/material'
import ShopLayout from '../components/layout/ShopLayout'
import ProductList from '../components/products/ProductList'
import { useProducts } from '../hooks'
import { IProduct } from '../interfaces'
import { Loading } from '../components/ui'




interface DataProducts{
    products:IProduct[]
}

const Home: NextPage = () => {

  const { data, isError, isLoading } = useProducts<DataProducts>("/products");
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

      {
        isLoading? <Loading/> : <ProductList products={data?.products||[]} />
      }
    </ShopLayout>
  ); 
}

export default Home
