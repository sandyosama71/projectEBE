import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getProducts,
  deleteProduct,
   addProduct,
    updateProduct,
} from "../services/ProductsServices";

import {
  Toolbar,
  Typography,
  Alert,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useReducer } from "react";
import { productReducer } from "../reducer/ProductReducer";
import { useForm } from "react-hook-form";


function Products() {
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();
 const [products, dispatch] = useReducer(productReducer, []);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
const [open, setOpen] = useState(false);
const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) {
          dispatch({
  type: "SET_PRODUCTS",
  payload: data,
});
          setStatus("success");
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);
  const handleDelete = async (id) => {
  try {
    await deleteProduct(id);

    dispatch({
      type: "DELETE_PRODUCT",
      payload: id,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const handleOpen = () => {
 ;
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
    setEditingProduct(null);
  reset({
    name: "",
    price: "",
    category: "",
    image: "",
  });
};
const onSubmit = async (data) => {
  try {
    if (editingProduct) {
      const updatedProduct = await updateProduct(
        editingProduct.id,
        data
      );

      dispatch({
        type: "EDIT_PRODUCT",
        payload: updatedProduct,
      });
    } else {
      const newProduct = await addProduct(data);

      dispatch({
        type: "ADD_PRODUCT",
        payload: newProduct,
      });
    }

    reset();
    setEditingProduct(null);
    handleClose();
  } catch (error) {
    console.log(error.message);
  }
};

const handleEdit = (product) => {
  setEditingProduct(product);
  setOpen(true);

  reset({
    name: product.name,
    price: product.price,
    category: product.category,
    image: product.image,
  });
};

  return (
    <>
      <Navbar />
      <Toolbar />

      <Typography
        variant="h4"
        
       
        sx={{ my: 3, fontWeight: "bold" ,  display: "flex",
    justifyContent: "center", }}
      >
        Products
      </Typography>

      {status === "loading" && (
        <Typography textAlign="center">
          Loading Products...
        </Typography>
      )}

      {status === "error" && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
       
      {status === "success" && (
        <>
            <Button
  variant="contained"
  onClick={handleOpen}
  sx={{ mb: 3 }}
>
  Add Product
</Button>
        <Grid container spacing={3} sx={{ px: 3 }}>
          {products.map((product) => (
            <Grid
              key={product.id}
              size={{ xs: 12, sm: 6, md: 4 }}
            >
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    product.image ||
                    "https://picsum.photos/300/200"
                  }
                  alt={product.name}
                />

                <CardContent>
                  <Typography variant="h6">
                    {product.name}
                  </Typography>

                  <Typography color="text.secondary">
                    {product.category}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    {product.price} EGP
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button variant="contained"
                  
                   onClick={() => handleEdit(product)}>
                    Edit
                  </Button>

                 <Button
  variant="contained"
  color="error"
  onClick={() => handleDelete(product.id)}
>
  Delete
</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>)   }
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
  <DialogTitle>
  {editingProduct ? "Edit Product" : "Add Product"}
</DialogTitle>

  <DialogContent>
   <TextField
  label="Product Name"
  fullWidth
  margin="normal"
  {...register("name", {
    required: "Product name is required",
  })}
/>

{errors.name && (
  <Typography color="error" variant="body2">
    {errors.name.message}
  </Typography>
)}
<TextField
  label="Price"
  type="number"
  fullWidth
  margin="normal"
  {...register("price", {
    required: "Price is required",
  })}
/>

{errors.price && (
  <Typography color="error" variant="body2">
    {errors.price.message}
  </Typography>
)}
<TextField
  label="Category"
  fullWidth
  margin="normal"
  {...register("category", {
    required: "Category is required",
  })}
/>

{errors.category && (
  <Typography color="error" variant="body2">
    {errors.category.message}
  </Typography>
)}
<TextField
  label="Image URL"
  fullWidth
  margin="normal"
  {...register("image", {
    required: "Image is required",
  })}
/>

{errors.image && (
  <Typography color="error" variant="body2">
    {errors.image.message}
  </Typography>
)}
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>

    <Button type="submit" variant="contained">
      Save
    </Button>
  </DialogActions>
  </form>
</Dialog>
    </>
  );
}

export default Products;