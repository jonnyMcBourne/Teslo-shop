import Nextlink from 'next/link'

import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import ShopLayout from "../../components/layout/ShopLayout";

const SummaryPage = () => {
  return (
    <ShopLayout title="Summary" pageDescription="summary of purshase">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2"> Summary (3) Products</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Adress</Typography>
                <Nextlink href="/checkout/address" passHref>
                  <Link underline="always">Edit </Link>
                </Nextlink>
              </Box>
              <Typography>Jonathan Hernandez Oliva</Typography>
              <Typography>9025 Alcosta boulevard</Typography>
              <Typography>94583 San Ramon CA</Typography>
              <Typography>United States</Typography>
              <Typography>9257911068</Typography>
              <Divider sx={{ mt: 1 }} />
              <Box display="flex" justifyContent="end">
                <Nextlink href="/cart" passHref>
                  <Link underline="always">Edit </Link>
                </Nextlink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Go to the Payment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
