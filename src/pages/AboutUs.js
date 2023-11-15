import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function AboutUs() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            We are BusanGuys
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            {'who support rate system for better discussion.'}
          </Typography>
          <Typography variant="h6">Discussing online is difficult in today's internet-connected society due to lack of motivation and malicious behavior such as personal attacks. We introduce HDR, a discussion platform that enables active and focused discussion through a rating system evaluated by users. HDR stands out from other discussion platforms with its user-driven relative tier system, where the ratings given by fellow users directly impact the author's tier.</Typography>
        </Container>
        </Box>
    </ThemeProvider>
  );
}