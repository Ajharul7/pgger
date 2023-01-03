import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import validator from "validator";
import { regexPassword } from "../utils";
import "../styles/login.css";
import { ReactComponent as Join } from "../asset/join.svg";
import { ReactComponent as Join1 } from "../asset/join1.svg";
import { ReactComponent as Wave } from "../asset/wave.svg";

import {
  Paper,
  Container,
  Link,
  Stack,
  Button,
  Box,
  Divider,
  Avatar,
  Typography,
  TextField,
  FilledInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  Block,
  Face as FaceIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import theme from "../styles/theme";

function Login({}) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    fetchError: false,
    fetchErrorMsg: "",
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    let isCorrectValue =
      fieldName === "email"
        ? validator.isEmail(currValue)
        : regexPassword.test(currValue);

    isCorrectValue
      ? setErrors({ ...errors, [fieldName]: false })
      : setErrors({ ...errors, [fieldName]: true });

    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        return setErrors({
          ...errors,
          fetchError: true,
          fetchErrorMsg: error.msg,
        });
      }

      const data = await res.json();
      console.log({ data });
      window.location.href = "/";
      // this is just a visual feedback for user for this demo
      // this will not be an error, rather we will show a different UI or redirect user to dashboard
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      });
      setValues({
        email: "",
        password: "",
        showPassword: false,
      });
      return;
    } catch (error) {
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg:
          "There was a problem with our server, please try again later",
      });
    }
  };

  return (
    <>
      <Wave className="wave" />

      <Join className="svgg" />
      <Container
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          webkitTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
          fontFamily: "Poppins",
          "@media screen and (max-width: 600px)": {
            position: "fixed",
            top: "50%",
            left: "50%",
            webkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
          },
        }}
        maxWidth="xs"
      >
        <Paper elevation={6}>
          <Container
            maxWidth="sm"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "20px",
              "@media screen and (max-width: 600px)": {},
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: "0px 0px 8px rgba(131,153,167,0.99)",
              }}
            >
              <FaceIcon sx={{ fontSize: 70 }} />
            </Avatar>
            <h2>Login</h2>
          </Container>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            noValidate
            spacing={6}
            sx={{
              bgcolor: "#f5f5f6",
              padding: "40px",
              "@media screen and (max-width: 600px)": {
                padding: "31px",
              },
            }}
            className="box"
          >
            <TextField
              variant="filled"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
              helperText={errors.email && "Please insert a valid email address"}
              InputProps={{ style: { fontFamily: "Poppins" } }}
              InputLabelProps={{ style: { fontFamily: "Poppins" } }}
            />

            <FormControl variant="filled">
              <InputLabel
                htmlFor="password-field"
                sx={{ fontFamily: "Poppins" }}
              >
                Password
              </InputLabel>
              <FilledInput
                id="password-field"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="large"
                type="submit"
                disabled={errors.email || errors.password}
                sx={{
                  minWidth: "70%",
                  fontFamily: "Poppins",
                  fontWeight: "900",
                }}
              >
                Login
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Typography
              paragraph
              align="center"
              sx={{ fontFamily: "Poppins", fontSize: "15px" }}
            >
              Don't have an account yet?{" "}
              <Link component={RouterLink} to="/signup">
                Sign up here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
