import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customTheme } from "./customTheme";
import useTitle from "./hooks/useTitle";
import HomePage from "./pages/HomePage";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import RegisterPage from "./features/auth/pages/RegisterPage";
import VerifiedPage from "./features/auth/pages/VerifiedPage";
import LoginPage from "./features/auth/pages/LoginPage";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar";
import ResendEmailTokenPage from "./features/auth/pages/ResendEmailTokenPage";
import PasswordResetRequestPage from "./features/auth/pages/PasswordResetRequestPage";
import PasswordResetPage from "./features/auth/pages/PasswordResetPage";
import UsersListPage from "./features/users/pages/UsersListPage";
import AuthRequired from "./components/AuthRequired";
import DashboardPage from "./pages/DashboardPage";
import { ROLES } from "./config/roles";

export const App = () => {
  useTitle("MERN Invoice - Home");

  const { user } = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="auth/verify" element={<VerifiedPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resend" element={<ResendEmailTokenPage />} />
          <Route
            path="/reset_password_request"
            element={<PasswordResetRequestPage />}
          />
          <Route path="auth/reset_password" element={<PasswordResetPage />} />

          {/* Private Routes - Users */}
          {/* for this route you are not allowed if you are not signed in */}
          <Route element={<AuthRequired allowedRoles={[ROLES.User]} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          {/* Private Routes - Admins */}
          <Route element={<AuthRequired allowedRoles={[ROLES.Admin]} />}>
            <Route path="/users" element={<UsersListPage />} />
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
