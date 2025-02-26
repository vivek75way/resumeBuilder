import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState, forwardRef } from "react";

// Use forwardRef to allow refs to be passed to the component
const PasswordInput = forwardRef(({ label, error, helperText, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      inputRef={ref} // Attach ref properly
      label={label}
      type={showPassword ? "text" : "password"}
      error={Boolean(error)}
      helperText={helperText}
      fullWidth
      sx={{ mt: 2 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default PasswordInput;
