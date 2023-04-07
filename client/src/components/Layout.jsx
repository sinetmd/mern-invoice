import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* We use Outlet component to render child component based on the route matches*/}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
