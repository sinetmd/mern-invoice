import { Box, Typography } from "@mui/material";
import useAuthUser from "../hooks/useAuthUser";

const DashboardPage = () => {

  const { isAdmin } = useAuthUser();

  return (
    <Box sx={{ display: "flex", marginLeft: "250px", mt: 10 }}>
      <Typography variant="h3">
        {isAdmin ? "Dashboard Page" : "This Dashboard page is only allowed to admin."} 
        
      </Typography>
    </Box>
  );
};

export default DashboardPage;
