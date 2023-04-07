import { Box, Button, Grid, Link, Typography, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import "../styles/homepage.css";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "12rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "9rem",
  },
}));

const CreateAccountButton = styled(Button)({
  borderColor: "#000000",
  boerRadius: "25px",
  border: "3px solid",
  "&:hover": {
    borderColor: "#07f011",
    boxShadow: "none",
    border: "2px solid",
  },
});

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="masthead main-bg-image">
        <Grid>
          <Grid item md={12} lg={12} sm={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <StyledTypography
                variant="h1"
                align="center"
                sx={{ textTransform: "uppercase", mt: "13rem" }}
                className="homepage-header"
              >
                MEARN Invoice
              </StyledTypography>
              <Typography
                align="center"
                variant="h4"
                component="div"
                gutterBottom
                sx={{ color: "rgba(255, 255, 255, 0.6)" }}
              >
                Whatever business you run, Creating Invoices, Receipts and
                Quotations is made easy with our app.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                mt: 5,
              }}
            >
              <CreateAccountButton
                variant="container"
                color="success"
                size="large"
                sx={{ fontSize: "1.5em", borderRadius: "25px" }}
                onClick={() => navigate("/register")}
              >
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{
                    textDecoration: "none",
                    color: "white",
                    fontSize: "2rem",
                  }}
                >
                  Create Account
                </Link>
              </CreateAccountButton>
            </Box>
          </Grid>
        </Grid>
      </header>
    </>
  );
};

export default HomePage;
