import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';

// components
import Page from '../components/Page';
import './style.css'
// import im1 from 'media/carte.jpg'
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
    <body>
        <header>
            <nav>
                <ul>
                    <li id="logo"><a href="#">Lev coin Bank</a> </li>
                    <li><a href="#language">Language</a> </li>
                    <li><a href="#booking">Bank</a> </li>
                    <li><a href="#contact">Contact us</a> </li>
                </ul>
            </nav>

            <div id= "principalImage" >
                <h1>Lev Coin Bank</h1>
                <div id="firstLine"> </div>
                <h3>Best Crypto in the World</h3>
            </div>

        </header>
        <section id="presentation">
            <div id="textIntro">
            <h2>A unique Bank for a unique client</h2>
            <p> Crypto Bank is a blockchain, database and AI&ML based innovative FinTech solution - based on WEB 3.0 and enabling the banked and unbanked to transition into a crypto and fiat lifestyle with ease and simplicity
                Crypto Bank plans to provide a host of features for retail and private banking including trading platforms, fiat-crypto conversion, ATM services, global money transfers, payments, special trading through database and AI&ML, credit facilities and insurance with a large number of innovations that are constantly updated
                Crypto Bank shall implement a robust AML compliance framework to follow the highest level of regulatory and compliance obligations with improved and upgraded blockchain deposit algorithm</p>
            </div>
            <Button to="/register" size="large" variant="contained" component={RouterLink}>
              Sign-in for Free
            </Button>
            {/* <div id="benefits">
                <div class="imageBenefits">
                    <h4>Lowest  Transaction</h4>
                    <a><img src="C:\Users\asus\VSCodeProjects\Web-Virtual-Bank\client\src\pages\media\carte.png" alt="map"/></a>
                </div>
                <div class="imageBenefits">
                    <h4>B2B   Transactions</h4>
                    <a><img src="./media/chambre.JPG" alt="map"/></a>
                </div>
                <div class="imageBenefits">
                    <h4>Premium Crypto Bank</h4>
                    <a><img src="./media/repas.JPG" alt="map"/></a>
                </div>

            </div> */}
        </section>

       

    </body>
  );
}