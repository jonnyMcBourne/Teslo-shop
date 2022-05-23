import { Chip, Grid, Typography,Link } from "@mui/material";
import ShopLayout from "../../components/layout/ShopLayout"
import  {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import NextLink from "next/link";



const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "full name", width: 300 },
  {
    field: "paid",
    headerName: "Paid",
    description: "Show information if its already paid or not",
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Not paid" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Order",
    description: "Go to the order details",
    width: 400,
    renderCell: (params: GridValueGetterParams) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">{`Go to the order ${params.row.id}`}</Link>
        </NextLink>
      );
    },
  },
];

const row = [
  {
    id: 1,
    paid: true,
    fullname: "Jonathan Hernandez",

  },
  {
    id: 2,
    paid: false,
    fullname: "Massimo Hernandez",

  },
  {
    id: 3,
    paid: false,
    fullname: "McBourne Hernandez",

  },
  { id: 4, paid: true, fullname: "Senoron", order: `http:localhost:300/kjaks` },
];

const History = () => {
  return (
      <ShopLayout title="History of Orders" pageDescription="history of orders" >
          <Typography>Orders Records</Typography>
          <Grid container >
              <Grid item xs={12} sx={{height:650, width:'100%'}} >
                  <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  />

              </Grid>
          </Grid>
      </ShopLayout>
  )
}

export default History;