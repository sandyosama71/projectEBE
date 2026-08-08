import Navbar from "../components/Navbar";
import { Toolbar } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../services/ProductsServices";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log(data);
        setProducts(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <>
      <Navbar />
      <Toolbar />

      <Typography variant="h3"  sx={{ textAlign: "center" }}
      >
      Dashboard
    </Typography>

      <TableContainer
  component={Paper}
  sx={{
    mx: 3,
    width: "auto",
    borderRadius: 2,
    overflow: "hidden",
  }}
>
        <Table>
        <TableHead>
  <TableRow>
   

    <TableCell sx={{ fontWeight: "bold" }}>
      Name
    </TableCell>

    <TableCell sx={{ fontWeight: "bold" }}>
      Category
    </TableCell>

    <TableCell sx={{ fontWeight: "bold" }}>
      Price
    </TableCell>
  </TableRow>
</TableHead>

          <TableBody>
            {products.map((product) => (
             <TableRow
  key={product.id}
  sx={{
    "&:hover": {
      backgroundColor: "action.hover",
    },
  }}
>
               
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price} EGP</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Dashboard;