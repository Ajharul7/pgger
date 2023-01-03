import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import validator from "validator";
import { regexPassword } from "../utils";
import "../styles/signup.css";
import { ReactComponent as Sign } from "../asset/signup.svg";
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
  Face as FaceIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { AccountCircleOutlined as AddMe } from "@mui/icons-material";
import theme from "../styles/theme";

function Signup() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phoneno: "",
    repeatPassword: "",
    showPassword: false,
    showRepeatPassword: false,
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: "",
    address: "",
    phoneno: "",
    repeatPassword: false,
    fetchError: false,
    fetchErrorMsg: "",
  });

  const handleChange = (fieldName) => (event) => {
    const currValue = event.target.value;
    switch (fieldName) {
      case "email":
        validator.isEmail(currValue)
          ? setErrors({ ...errors, email: false })
          : setErrors({ ...errors, email: true });
        break;

      case "name":
        validator.isUppercase(currValue)
          ? setErrors({ ...errors, name: false })
          : setErrors({ ...errors, name: true });
        break;

      case "address":
        validator.isUppercase(currValue)
          ? setErrors({ ...errors, address: false })
          : setErrors({ ...errors, address: true });
        break;

      case "phoneno":
        validator.isInt(currValue)
          ? setErrors({ ...errors, phoneno: false })
          : setErrors({ ...errors, phoneno: true });
        break;

      case "password":
        regexPassword.test(currValue)
          ? setErrors({ ...errors, password: false })
          : setErrors({ ...errors, password: true });
        break;

      case "repeatPassword":
        currValue === values.password
          ? setErrors({ ...errors, repeatPassword: false })
          : setErrors({ ...errors, repeatPassword: true });
        break;
    }
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const handleShowPassword = (showPasswordField) => {
    setValues({
      ...values,
      [showPasswordField]: !values[showPasswordField],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.name,
          address: values.address,
          phoneno: values.phoneno,
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
      window.location.href = "/";
      // this is just a visual feedback for user for this demo
      // this will not be an error, rather we will show a different UI or redirect user to dashboard
      // ideally we also want a way to confirm their email or identity
      setErrors({
        ...errors,
        fetchError: true,
        fetchErrorMsg: data.msg,
      });
      setValues({
        email: "",
        password: "",
        name: "",
        address: "",
        phoneno: "",
        repeatPassword: "",
        showPassword: false,
        showRepeatPassword: false,
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
      <Sign className="svgg2" />
      <Container
        sx={{
          // marginTop: "calc(100vh - 47.5%)",
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
            fontSize: "12.5px",
          },
        }}
        maxWidth="sm"
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
              "@media screen and (max-width: 600px)": {
                paddingTop: "30px",
              },
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: theme.palette.primary.main,
                boxShadow: "0px 0px 8px rgba(131,153,167,0.99)",
                "@media screen and (max-width: 600px)": {
                  width: 45,
                  height: 45,
                },
              }}
            >
              <AddMe
                sx={{
                  fontSize: 70,
                  "@media screen and (max-width: 600px)": {
                    fontSize: 38,
                  },
                }}
              />
            </Avatar>
            <h2>Register a new account</h2>
          </Container>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            noValidate
            spacing={3}
            sx={{
              bgcolor: "#f5f5f6",
              padding: "40px",
              "@media screen and (max-width: 600px)": {
                padding: "20px",
              },
            }}
          >
            <TextField
              variant="filled"
              type="string"
              label="Full Name"
              value={values.name}
              onChange={handleChange("name")}
              InputProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              // error={errors.email}
              // helperText={errors.email && "Please insert a valid email address"}
            />
            {/*  email main */}
            <TextField
              variant="filled"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange("email")}
              error={errors.email}
              helperText={errors.email && "Please insert a valid email address"}
              InputProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
            />
            <TextField
              variant="filled"
              type="string"
              label="Phone Number"
              value={values.phoneno}
              onChange={handleChange("phoneno")}
              InputProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              // error={errors.email}
              // helperText={errors.email && "Please insert a valid email address"}
            />
            <TextField
              variant="filled"
              type="string"
              label="Address"
              value={values.address}
              onChange={handleChange("address")}
              InputProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                },
              }}
              // error={errors.email}
              // helperText={errors.email && "Please insert a valid email address"}
            />
            <FormControl variant="filled">
              <InputLabel
                htmlFor="password-field"
                sx={{
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                }}
              >
                Password
              </InputLabel>
              <FilledInput
                sx={{
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                }}
                id="password-field"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("showPassword")}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />

              <FormHelperText
                error={errors.password}
                sx={{
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "11px",
                  },
                }}
              >
                Password must be at least 8 characters, have one symbol, 1
                uppercase letter, 1 lowercase and 1 digit
              </FormHelperText>
            </FormControl>

            <FormControl variant="filled">
              <InputLabel
                htmlFor="password-repeat-field"
                sx={{
                  fontFamily: "Poppins",
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                }}
              >
                Repeat password
              </InputLabel>
              <FilledInput
                sx={{
                  "@media screen and (max-width: 600px)": {
                    fontSize: "13px",
                  },
                }}
                id="password-repeat-field"
                type={values.showRepeatPassword ? "text" : "password"}
                value={values.repeatPassword}
                onChange={handleChange("repeatPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword("showRepeatPassword")}
                      edge="end"
                    >
                      {values.showRepeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.repeatPassword && (
                <FormHelperText
                  error={errors.repeatPassword}
                  sx={{
                    fontFamily: "Poppins",
                    "@media screen and (max-width: 600px)": {
                      fontSize: "11px",
                    },
                  }}
                >
                  Password must be the same as above
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                sx={{
                  minWidth: "70%",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                }}
                disabled={
                  !values.address ||
                  !values.name ||
                  !values.phoneno ||
                  !values.email
                }
              >
                Sign me up!
              </Button>
            </Box>
            {errors.fetchError && (
              <FormHelperText error>{errors.fetchErrorMsg}</FormHelperText>
            )}
            <Divider />
            <Typography
              paragraph
              align="center"
              sx={{
                fontFamily: "Poppins",
                fontSize: "15px",
                "@media screen and (max-width: 600px)": {
                  fontSize: "13px",
                },
              }}
            >
              Already have an account?{" "}
              <Link component={RouterLink} to="/">
                Login here
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default Signup;
