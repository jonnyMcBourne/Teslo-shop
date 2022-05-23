import Nextlink from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import ShopLayout from "../../components/layout/ShopLayout";
import { FC } from "react";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
interface Props {}

export const OrderPage: FC<Props> = ({}) => {
  return (
    <ShopLayout title="Order 1234" pageDescription="Purchase Order">
      <Chip
        sx={{ my: 2 }}
        label="pending of payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="Payed"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
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
                <h1>Pay</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Payed"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};
export default OrderPage;
