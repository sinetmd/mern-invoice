import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Button, Typography, Stack } from "@mui/material";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const VerifiedPage = () => {
  useTitle("Verify User - MEARN Invoice");

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing="2"
      height="94vh"
    >
      <FaCheckCircle className="verified" />
      <Typography variant="h2" gutterBottom>
        Account Verified
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        Your Account has been verified and is ready for user.
      </Typography>

      <Typography variant="h5" component="div" gutterBottom>
        An Email to confirm the same has been sent
      </Typography>

      <Button startIcon={<LockOpenIcon />} endIcon={<LockOpenIcon />}>
        <Typography
          variant="h6"
          component={Link}
          to="/login"
          sx={{ textDecoration: "none" }}
          gutterBottom
        >
          Please login to use our service
        </Typography>
      </Button>
    </Stack>
  );
};

export default VerifiedPage;
