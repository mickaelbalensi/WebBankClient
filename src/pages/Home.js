import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <Page title="home" style={{ backgroundImage:`url(${"/static/illustrations/homee.png"})`, backgroundposition: "center", backgroundRepeat:"no-repeat",backgroundSize:"cover",
               width: '100vw',
               height: '100vh'}}>
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h1" paragraph  sx={{ color: 'white' }}>
           LevBank
          </Typography>

          <Typography variant="h2" sx={{ color: 'white' }}>
           All begin with a LevCoin
          </Typography>

          <Box
            component="img"
            src="/static/illustrations/home1.png"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          <Button to="/register" size="large" variant="contained" component={RouterLink}>
            Sign-in for Free
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}