import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import PasswordInput from "./PasswordInput"; 

// Validation Schema
const signupValidation = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(5).max(16).required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function SignupForm() {
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signupValidation),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Signup</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{ mt: 2 }}
            />
            <PasswordInput
              fullWidth
              label="Password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{ mt: 2 }}
            />
            <PasswordInput
              fullWidth
              label="Confirm Password"
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
              sx={{ mt: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={!isValid} sx={{ my: 2 }}>
              Signup
            </Button>
            <Typography>
              Already have an account? <NavLink to="/login">Sign in</NavLink>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
