import NextLink from 'next/link'
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Typography,Link } from "@mui/material";
import ShopLayout from "../../components/layout/ShopLayout"


export const EmptyCart = () => {
  return (
    <ShopLayout title="Empty Cart" pageDescription="no products in cart">
      <Box
        display="flex"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography marginLeft={2}>
            You have not Added any Product to your Cart
          </Typography>
        <NextLink href="/" passHref>
          <Link typography="h4" color="secondary">
            Go Back
          </Link>
        </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
}

export default EmptyCart