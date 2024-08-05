import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthRequired from "./components/AuthRequired";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import Navbar from "./components/navbar";
import { ROLES } from "./config/roles";
import { customTheme } from "./customTheme";
import LoginPage from "./features/auth/pages/LoginPage";
import PasswordResetPage from "./features/auth/pages/PasswordResetPage";
import PasswordResetRequestPage from "./features/auth/pages/PasswordResetRequestPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ResendEmailTokenPage from "./features/auth/pages/ResendEmailTokenPage";
import VerifiedPage from "./features/auth/pages/VerifiedPage";
import useTitle from "./hooks/useTitle";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import UsersListPage from "./features/users/pages/UsersListPage";
import ProfilePage from "./features/users/pages/ProfilePage";
import EditProfileForm from "./features/users/pages/EditProfileForm";
import CustomersPage from "./features/customers/pages/CustomersPage";
import CustomerCreateForm from "./features/customers/pages/CustomerCreateForm";
import SingleCustomer from "./features/customers/pages/SingleCustomer";
import CustomerEditForm from "./features/customers/pages/CustomerEditForm";

export const App = () => {
  useTitle("MERN Invoice - Home");

  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact index element={<HomePage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="auth/verify" element={<VerifiedPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/resend" element={<ResendEmailTokenPage />} />
          <Route
            exact
            path="/reset_password_request"
            element={<PasswordResetRequestPage />}
          />
          <Route
            exact
            path="auth/reset_password"
            element={<PasswordResetPage />}
          />

          {/* Private Routes - Users */}
          {/* for this route you are not allowed if you are not signed in */}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
            <Route exact path="/dashboard" element={<DashboardPage />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/edit-profile" element={<EditProfileForm />} />

            {/* customers */}
            <Route exact path="/customers" element={<CustomersPage />} />
            <Route
              exact
              path="/create-customer"
              element={<CustomerCreateForm />}
            />
            <Route
              exact
              path="/single-customer/:custId"
              element={<SingleCustomer />}
            />
            <Route
              path="/edit-customer/:custId"
              element={<CustomerEditForm />}
            />
          </Route>

          {/* Private Routes - Admins */}
          <Route element={<AuthRequired allowedRoles={[ROLES.Admin]} />}>
            <Route exact path="/users" element={<UsersListPage />} />
          </Route>

          {/* this must be at the end of routes */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="dark" />
    </ThemeProvider>
  );
};
