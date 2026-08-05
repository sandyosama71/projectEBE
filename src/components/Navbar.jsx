import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
function Navbar() {
    const navigate = useNavigate();
const { setToken } = useContext(AuthContext);
const handleLogout = () => {
  localStorage.removeItem("token");
  setToken(null);
  navigate("/");
};
return (
  <AppBar position="fixed">
   <Toolbar>
     <Typography variant="h6" sx={{ flexGrow: 1 }}>
       React Dashboard
      </Typography>
    <Button color="inherit"  component={Link}
  to="/dashboard">
  Dashboard
</Button>
        <Button color="inherit"  component={Link}
        to="/products">
        Products
        </Button>
        <Button color="inherit" onClick={handleLogout}>
  Logout
</Button>
   </Toolbar>
  </AppBar>
);

}
export default Navbar;