import React from 'react'
import Navbaritem from './Components/Navbaritem'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import YouTubeThumbnailDownloader from './Components/YouTubeThumbnailDownloader/YouTubeThumbnailDownloader';
import WordCounter from './Components/WordCounter/WordCounter'
import ArticleWriter from './Components/ArticleWriter/ArticleWriter'
import CaseConverter from './Components/CaseConverter/CaseConverter'
import JpgToPngConverter from './Components/JpgToPngConverter/JpgToPngConverter'
import PngToJpgConverter from './Components/PngToJpgConverter/PngToJpgConverter'
import AgeCalculator from './Components/AgeCalculator/AgeCalculator'
import BMICalculator from './Components/BMICalculator/BMICalculator'
import InvestmentCalculator from './Components/InvestmentCalculator/InvestmentCalculator'
import MortgageCalculator from './Components/MortgageCalculator/MortgageCalculator'
import PasswordGenerator from './Components/PasswordGenerator/PasswordGenerator'
import PaypalFeeCalculator from './Components/PayPalFeeCalculator/PayPalFeeCalculator'
import StripeFeeCalculator from './Components/StripeFeeCalculator/StripeFeeCalculator'
import Privacy from './Components/Privacypolicy/Privacy';
import About from './Components/About us/About';
import Blog from './Components/Blog/Blog';
import SavingsCalculator from './Components/SavingsCalculator/SavingsCalculator';
import TodoList from './Components/TodoList/TodoList';
import BudgetPlanner from './Components/BudgetPlanner/BudgetPlanner';
import Flashcards from './Components/Flashcards/Flashcards';
import QuizMaker from './Components/QuizMaker/QuizMaker';
import WorkoutPlanner from './Components/WorkoutPlanner/WorkoutPlanner';
import ColorPaletteGenerator from './Components/ColorPaletteGenerator/ColorPaletteGenerator';
import Dropcalculator from './Dropshipfeecalculator/Dropcalculator';
import QRCodeGenerator from './Components/QRCodeGenerator/QRCodeGenerator';
import EmailSignatureGenerator from './Components/EmailSignatureGenerator/EmailSignatureGenerator';
import ImageResizer from './Components/ImageResizer/ImageResizer';
import FileCompressor from './Components/FileCompressor/FileCompressor';
import MemeGenerator  from './Components/MemeGenerator/MemeGenerator';
function App() {
  return (
    <div>
      <Router>
        <Navbaritem />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/YouTubeThumbnailDownloader" element={<YouTubeThumbnailDownloader />} />
          <Route path="/WordCounter" element={<WordCounter />} />
          <Route path="/ArticleWriter" element={<ArticleWriter />} />
          <Route path="/CaseConverter" element={<CaseConverter />} />
          <Route path="/JpgToPngConverter" element={<JpgToPngConverter />} />
          <Route path="/PngToJpgConverter" element={<PngToJpgConverter />} />
          <Route path="/AgeCalculator" element={<AgeCalculator />} />
          <Route path="/BMICalculator" element={<BMICalculator />} />
          <Route path="/InvestmentCalculator" element={<InvestmentCalculator />} />
          <Route path="/MortgageCalculator" element={<MortgageCalculator />} />
          <Route path="/PasswordGenerator" element={<PasswordGenerator />} />
          <Route path="/PaypalFeeCalculator" element={<PaypalFeeCalculator />} />
          <Route path="/StripeFeeCalculator" element={<StripeFeeCalculator />} />
          <Route path="/SavingsCalculator" element={<SavingsCalculator />} />
          <Route path="/TodoList" element={<TodoList />} />
          <Route path="/BudgetPlanner" element={<BudgetPlanner />} />
          <Route path="/Flashcards" element={<Flashcards />} />
          <Route path="/QuizMaker" element={<QuizMaker />} />
          <Route path="/WorkoutPlanner" element={<WorkoutPlanner />} />
          <Route path="/ColorPaletteGenerator" element={<ColorPaletteGenerator />} />
          <Route path="/Dropcalculator" element={<Dropcalculator />} />
          <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
          <Route path="/EmailSignatureGenerator" element={<EmailSignatureGenerator />} />
          <Route path="/ImageResizer" element={<ImageResizer />} />
          <Route path="/FileCompressor" element={<FileCompressor />} />
          <Route path="/MemeGenerator" element={<MemeGenerator />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App

