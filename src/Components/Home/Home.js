import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; // Import your CSS file
import YouTubeIcon from '@mui/icons-material/YouTube';
import NumbersTwoToneIcon from '@mui/icons-material/NumbersTwoTone';
import ArticleTwoToneIcon from '@mui/icons-material/ArticleTwoTone';
import SortByAlphaTwoToneIcon from '@mui/icons-material/SortByAlphaTwoTone';
import FilterTwoToneIcon from '@mui/icons-material/FilterTwoTone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalculateTwoToneIcon from '@mui/icons-material/CalculateTwoTone';
import CalculateSharpIcon from '@mui/icons-material/CalculateSharp';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import PlaylistAddCheckTwoToneIcon from '@mui/icons-material/PlaylistAddCheckTwoTone';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import SpaceDashboardTwoToneIcon from '@mui/icons-material/SpaceDashboardTwoTone';
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import QrCode2TwoToneIcon from '@mui/icons-material/QrCode2TwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import AspectRatioTwoToneIcon from '@mui/icons-material/AspectRatioTwoTone';
import FolderZipTwoToneIcon from '@mui/icons-material/FolderZipTwoTone';
import AddReactionTwoToneIcon from '@mui/icons-material/AddReactionTwoTone';

function Home() {
  return (
    <Container className="home-container">
      <h2 className="section-title">Toolifyco All Tools</h2>
      <Row className="justify-content-center text-center mb-4">
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/WordCounter">
            <NumbersTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-word-counter" />
          </Link>
          <span>Word Counter</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/YouTubeThumbnailDownloader">
            <YouTubeIcon sx={{ fontSize: 80 }} className="icon icon-youtube" />
          </Link>
          <span>YouTube Thumbnail Downloader</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/ArticleWriter">
            <ArticleTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-article-writer" />
          </Link>
          <span>Article Writer</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/CaseConverter">
            <SortByAlphaTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-case-converter" />
          </Link>
          <span>Case Converter</span>
        </Col>
      </Row>

      {/* Row 2 */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/JpgToPngConverter">
            <FilterTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-jpg-to-png" />
          </Link>
          <span>Jpg To Png Converter</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/PngToJpgConverter">
            <FilterTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-png-to-jpg" />
          </Link>
          <span>Png To Jpg Converter</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/PasswordGenerator">
            <LockOutlinedIcon sx={{ fontSize: 80 }} className="icon icon-password-generator" />
          </Link>
          <span>Strong Password Generator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/TodoList">
            <PlaylistAddCheckTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Todo-List" />
          </Link>
          <span>Todo List</span>
        </Col>
      </Row>

      {/* Row 3 */}

      <Row className="justify-content-center text-center mb-4">
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/Flashcards">
            <SpaceDashboardTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Flash-cards" />
          </Link>
          <span>Flash cards</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/BudgetPlanner ">
            <CalendarTodayTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Budget-Planner" />
          </Link>
          <span>Budget Planner</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/QuizMaker ">
            <QuizTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Quiz-Maker" />
          </Link>
          <span>Quiz Maker</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/WorkoutPlanner ">
            <FitnessCenterTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Workout-Planner" />
          </Link>
          <span>Workout Planner</span>
        </Col>
      </Row>

      {/* row 4 */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/ColorPaletteGenerator">
            <BorderColorTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-ColorPaletteGenerator" />
          </Link>
          <span>Color Palette Generator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/QRCodeGenerator">
            <QrCode2TwoToneIcon sx={{ fontSize: 80 }} className="icon icon-QRCodeGenerator" />
          </Link>
          <span>QR Code Generator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/EmailSignatureGenerator">
            <EmailTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-EmailTwoToneIcon" />
          </Link>
          <span>Email Signature Generator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/ImageResizer">
            <AspectRatioTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-AspectRatioTwoToneIcon" />
          </Link>
          <span>Image Resizer</span>
        </Col>
     
      </Row>


      <Row className="justify-content-center text-center mb-4">

        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/FileCompressor">
            <FolderZipTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-FolderZipTwoToneIcon" />
          </Link>
          <span>File Compressor</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/MemeGenerator">
            <AddReactionTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-AddReactionTwoToneIcon" />
          </Link>
          <span>Meme Generator</span>
        </Col>
        
      </Row>


      {/* Row 5 */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs="12" className="mb-3">
          <h2 className="section-title">Toolifyco Calculator Tools</h2>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/AgeCalculator">
            <CalculateIcon sx={{ fontSize: 80 }} className="icon icon-age-calculator" />
          </Link>
          <span>Age Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/BMICalculator">
            <AccessibilityNewIcon sx={{ fontSize: 80 }} className="icon icon-bmi-calculator" />
          </Link>
          <span>BMI Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/InvestmentCalculator">
            <PaidOutlinedIcon sx={{ fontSize: 80 }} className="icon icon-investment-calculator" />
          </Link>
          <span>Investment Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/MortgageCalculator">
            <HouseOutlinedIcon sx={{ fontSize: 80 }} className="icon icon-mortgage-calculator" />
          </Link>
          <span>Mortgage Calculator</span>
        </Col>
      </Row>

      {/* Row 6 */}
      <Row className="justify-content-center text-center mb-4">
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/PaypalFeeCalculator">
            <CalculateTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-paypal-fee-calculator" />
          </Link>
          <span>Paypal Fee Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/StripeFeeCalculator">
            <CalculateSharpIcon sx={{ fontSize: 80 }} className="icon icon-stripe-fee-calculator" />
          </Link>
          <span>Stripe Fee Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/SavingsCalculator">
            <AccountBalanceWalletTwoToneIcon sx={{ fontSize: 80 }} className="icon icon-Savings-Calculator" />
          </Link>
          <span>Savings Calculator</span>
        </Col>
        <Col xs="auto" className="d-flex flex-column align-items-center icon-container">
          <Link to="/Dropcalculator">
            <LocalShippingOutlinedIcon sx={{ fontSize: 80 }} className="icon icon-dropship-fee-calculator" />
          </Link>
          <span>Dropship Profit Calculator</span>
        </Col>
      </Row>


    </Container>
  );
}

export default Home;




