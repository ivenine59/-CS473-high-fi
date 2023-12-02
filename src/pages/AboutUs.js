import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Chip } from '@mui/material';

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
          <Typography variant="h6">
            Discussing online is difficult in today's internet-connected society due to a lack of motivation and malicious behavior such as personal attacks. We introduce HDR, a discussion platform that enables active and focused discussion through a rating system evaluated by users. HDR stands out from other discussion platforms with its user-driven relative tier system, where the ratings given by fellow users directly impact the loggedInUser's tier.
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            HDR's tier system is divided into 2, reputation and contribution tier. Reputation tier shows the quality of user comments and contributions shows how many times user rated other users. Below is a breakdown of the different tiers in the top percent.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Diamond" size="small" sx={{ backgroundColor: '#0F4C81', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 5%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Platinum" size="small" sx={{ backgroundColor: '#0EC492', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 15%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Gold" size="small" sx={{ backgroundColor: '#FFD700', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 30%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Silver" size="small" sx={{ backgroundColor: '#B0C4DE', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 50%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Bronze" size="small" sx={{ backgroundColor: '#CD7F32', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 80%</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Chip label="Iron" size="small" sx={{ backgroundColor: '#43464B', color: '#FFF', ml: 1, marginRight: 1 }} />
                <Typography variant="body1" sx={{ marginLeft: 'auto' }}>Top 100%</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}