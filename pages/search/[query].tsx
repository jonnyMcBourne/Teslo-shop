import type { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layout/ShopLayout";
import ProductList from "../../components/products/ProductList";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";
import { Loading } from "../../components/ui";
import {
  getAllProducts,
  getProductsByQuery,
  searchProducts,
} from "../../database";
import { FC } from "react";

interface Props {
  products: IProduct[];
  productsFound: boolean;
  query: string;
}

const SearchPage: FC<Props> = ({ products, productsFound, query }) => {
  console.log("foundproductsfrontend", productsFound);
  return (
    <ShopLayout
      title={"Teslo-Shop search"}
      pageDescription={"Find the best products of Aguascalientes "}
    >
      {productsFound ? (
        <>
          <Typography variant="h1" component="h1">
            {query.toString()}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            Find what you are looking for
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h1" component="h1">
            {`No products found with: ${query}`}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            there are some products you may be interested in
          </Typography>
        </>
      )}

      <ProductList products={products || []} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };
  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await getProductsByQuery(query);
  const productsFound = products?.length !== 0;
  console.log("foundproducts", productsFound,products);
  if (!productsFound) {
    products = await getAllProducts();
  }
  return {
    props: {
      products,
      productsFound,
      query,
    },
  };
};
export default SearchPage;
