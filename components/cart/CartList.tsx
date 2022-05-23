import { FC } from "react"
import NextLink from 'next/link'
import { Grid, Typography,Link, CardActionArea, CardMedia, Button } from "@mui/material"
import { initialData } from "../../database/products"
import { Box } from "@mui/system"
import ItemCounter from "../ui/ItemCounter"


const productsInCart = [
    initialData.products[0],
     initialData.products[1],
      initialData.products[2]
]
interface Props{
  editable:boolean
}
const CartList:FC<Props> = ({editable=false}) => {

  return (
    <>
      {productsInCart.map((product) => (
        <Grid container key={product.slug} spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            {/**TODO take it to the product page */}
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  ></CardMedia>
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body2">
                Size: <strong> M </strong>{" "}
              </Typography>
              {/**condicional */}
              {editable ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">3</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {editable && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default CartList