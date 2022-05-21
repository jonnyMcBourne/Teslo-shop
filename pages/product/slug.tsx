
import { Box, Button, Chip, Grid, Typography } from "@mui/material"
import ShopLayout from "../../components/layout/ShopLayout"
import { ProductsSlideShow } from "../../components/products"
import SizeSelector from "../../components/products/SizeSelector"
import ItemCounter from "../../components/ui/ItemCounter"
import { initialData } from "../../database/products"
const product = initialData.products[0]
const slug = () => {
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