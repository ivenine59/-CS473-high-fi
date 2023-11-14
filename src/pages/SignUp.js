import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { alpha, createTheme, getContrastRatio, ThemeProvider } from '@mui/material/styles';
import { Navigate, useNavigate } from 'react-router';
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore } from '../firebase';






const blackBase = '#000000';
const blackMain = alpha(blackBase, 0.9);

const theme = createTheme({
  palette: {
    black: {
      main: blackMain,
      light: alpha(blackBase, 0.5),
      dark: alpha(blackBase, 0.9),
      contrastText: getContrastRatio(blackMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();



export default function SignUp() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSignUp = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const docRef = await addDoc(collection(firestore, "Accounts"), {
      userEmail: email,
      sum_rating: 0,
      num_rating: 0,
      received_sum_rating: 0,
      received_num_rating: 0,
      point: 0,
      rank: 0,
      percent_rank: 0,
      rank2: 0,
      percent_rank2: 0,
    });
    console.log("회원 가입 성공", userCredential);
    alert("회원가입이 완료되었습니다.");
    navigate("/login");
  } catch (error) {
    console.error("회원 가입 실패", error.message);
    alert("회원가입에 실패하였습니다.");
  }
};

  let navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#000' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
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
              onChange={(event)=>setEmail(event.target.value)}

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
              onChange={(event)=>setPassword(event.target.value)}
              placeholder='Password should be more than 6 characters'
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              color="black"
              onClick={()=>handleSignUp()}
            >
            Sign Up
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              color="black"
              onClick={()=>navigate("/login")}
            >
              Already have an account? Login
            </Button>

          </Box>

      </Container>
    </ThemeProvider>
  );
}

