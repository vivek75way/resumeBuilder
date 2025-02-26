import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // ✅ Added missing import
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/reducers/authReducer";
import { useLoginMutation } from "../services/api";
import PasswordInput from "./PasswordInput"; // ✅ Ensure this component correctly handles `register`

// ✅ Validation Schema
const loginValidation = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 characters required")
    .max(16, "Maximum 16 characters allowed"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginValidation),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginMutation(data).unwrap();

      console.log(response);
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      const { accessToken, refreshToken, user } = response.data;

      if (!accessToken || !refreshToken || !user?.id) {
        throw new Error("Invalid credentials or missing user data.");
      }

      // ✅ Dispatch user data to Redux store
      dispatch(loginUser({ accessToken, refreshToken, user }));

      // ✅ Store tokens securely
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("userId", user.id);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed! Check your credentials.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: "url('https://source.unsplash.com/random?resume')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth="xs">
        <Card
          sx={{
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
              />
              <PasswordInput
                label="Password"
                {...register("password")} // ✅ Corrected input usage
                error={!!errors.password}
                helperText={errors.password?.message}
                fullWidth
                sx={{ mt: 2 }}
                variant="outlined"
              />
              <Button
                type="submit"
                variant="contained"
                disabled={!isValid}
                fullWidth
                sx={{ my: 2, py: 1.5, fontWeight: "bold" }}
              >
                Login
              </Button>
              <Typography align="center">
                Don't have an account? <NavLink to="/signup">Sign up</NavLink>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
