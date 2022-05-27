
import { FC } from "react"
import { GetServerSideProps, GetStaticPaths } from 'next'
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import { getAllProductSlugs, getOneProductBySlug } from "../../database"
import ShopLayout from "../../components/layout/ShopLayout"
import { ProductsSlideShow } from "../../components/products"
import SizeSelector from "../../components/products/SizeSelector"
import ItemCounter from "../../components/ui/ItemCounter"

import { IProduct } from "../../interfaces"


interface Props{
  product:IProduct
}
const slug:FC<Props> = ({product}) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductsSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/** titles */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="h2"
            >{`$${product.price}`}</Typography>
            {/** quatity */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Quantity</Typography>{" "}
            </Box>
            <ItemCounter />
            <SizeSelector sizes={product.sizes} selectedSize='L' />
            <Button fullWidth color="secondary" className="circular-btn">
              Agregar Al carrito
            </Button>
            {/**Add to the cart */}
            <Chip
              label="Product Not Available"
              color="error"
              variant="outlined"
            />
            {/** Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2"> Description</Typography>
              <Typography variant="body2"> {product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </ShopLayout>
  );
}

export default slug

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
/**
  
 export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const {slug=''}= ctx.params as  {slug:string};
 
   const product= await getOneProductBySlug(slug);
   if(!product){
     return {
       redirect:{
         destination:'/',
         permanent:false
       }
     }
   }
   return {
     props: {
     product    
     }
   }
 }

 */

 // You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

 
 export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const slugs = await  getAllProductSlugs();
   const paths = slugs.map(({slug})=>({params:{slug}}))
   return {
     paths:paths,
     fallback: "blocking",
   };
 }

 // You should use getStaticProps when:
 //- The data required to render the page is available at build time ahead of a user’s request.
 //- The data comes from a headless CMS.
 //- The data can be publicly cached (not user-specific).
 //- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
 import { GetStaticProps } from 'next'
 
 export const getStaticProps: GetStaticProps = async ({params}) => {
  const {slug=''}= params as {slug:string};
  const product = await getOneProductBySlug(slug)

  if(!product){
    return{
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }

 
   return {
     props: {
       product
     },
     revalidate: 60*60*24
   }
 }