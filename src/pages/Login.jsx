import {
  Box,
  Alert,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {login} from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function Login() {
  const [loginError, setLoginError] = useState("");
    const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
const navigate = useNavigate();
const onSubmit = async (data) => {
  try {
    const response = await login(data);
    localStorage.setItem("token", response.token);
    navigate("/dashboard");
  } catch (error) {
   setLoginError(error.message);
  }
  

};
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
     
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            
            mb={3}
            fontWeight="bold"
            sx={{ p: 2 }}
          >
            Login
          </Typography>
            {loginError && (
    <Alert severity="error" sx={{ mb: 2 }}>
      {loginError}
    </Alert>
  )}
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
             
               {...register("email", {
                required: "Email is required",
                  pattern: {
    value: /^\S+@\S+\.\S+$/,
    message: "Please enter a valid email",
  },
})}
            />
            {errors.email && (
  <Typography color="error" variant="body2">
    {errors.email.message}
  </Typography>
)}
            <TextField
              label="Password"
              type="password"
              fullWidth
             
              {...register("password", {
               required: "Password is required",
                 minLength: {
                 value: 6,
                message: "Password must be at least 6 characters",},
})}
            />

            {errors.password && (
  <Typography color="error" variant="body2">
    {errors.password.message}
  </Typography>
)}

            <Button
              variant="contained"
                type="submit"
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;