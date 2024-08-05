import { Container, Grid, Stack, Typography } from "@mui/material";
import CustomerSvg from "../../../images/add_customer.svg";
import "../../../styles/custom-button.css";

const CustomerSVG = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Grid item>
          <Stack alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Sadly, you have no customers yet. To get started click on 👉👉👉
            </Typography>
            <img
              src={CustomerSvg}
              alt="customer logo"
              className="customer-svg"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomerSVG;
