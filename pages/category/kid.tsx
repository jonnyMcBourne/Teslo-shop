import React, { FC } from "react";
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layout/ShopLayout";
import ProductList from "../../components/products/ProductList";
import { Loading } from "../../components/ui";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";

interface Props {}
interface DataProducts {
  products: IProduct[];
}

export const Kids: FC<Props> = () => {
            const { data, isError, isLoading } = useProducts<DataProducts>("/products/?gender=kid");
  return (
    <>
      <ShopLayout
        title={"Teslo-Shop Kid"}
        pageDescription={"Find the best products of Aguascalientes "}
      >
        <Typography variant="h1" component="h1">
          Kids
        </Typography>
        <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
          Kids Clothing
        </Typography>

        {isLoading ? (
          <Loading />
        ) : (
          <ProductList products={data?.products || []} />
        )}
      </ShopLayout>
    </>
  );
};
export default Kids;
