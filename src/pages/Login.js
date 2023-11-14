import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  alpha,
  createTheme,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";

const blackBase = "#000000";
const blackMain = alpha(blackBase, 0.9);

const theme = createTheme({
  palette: {
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {

  let navigate = useNavigate();

  const { login, loggedInUser, loggedInEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(loggedInUser!= null){
      navigate("/");
    }
  }, []);



  const handleLogIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 성공", userCredential.user.uid);
      // alert("로그인에 성공했습니다.")
      login(userCredential.user.uid, email);
      navigate("/");
    } catch (error) {
      console.error("로그인 실패", error.message);
      alert("로그인에 실패했습니다. 이메일이나 비밀번호를 확인해주세요.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#000" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1 }}
            color="black"
            onClick={() => handleLogIn()}
          >
            Log In
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 1, mb: 1 }}
            color="black"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
