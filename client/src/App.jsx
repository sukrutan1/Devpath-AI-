import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GlowOrbs from './components/GlowOrbs';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Predict from './pages/Predict';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* The only scrollable container in the app */}
      <div id="main-scroll-container" className="dark w-full h-full overflow-y-auto overflow-x-hidden flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
        <GlowOrbs />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
