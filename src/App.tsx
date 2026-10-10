import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import NotFound from './pages/NotFound';
import './styles/globals.css';
import './components/Navbar.css';

/** First tab stop: jumps past the nav to the page body. Hidden until focused. */
const SkipLink = () => {
  const { t } = useTranslation();
  return (
    <a href="#main" className="skip-link">
      {t('nav.skipToContent')}
    </a>
  );
};

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app-container">
            <div className="aurora" aria-hidden="true" />
            <SkipLink />
            <Navbar />
            <main id="main" className="main-content" tabIndex={-1}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Pre-rename link target; kept so old references still land. */}
                  <Route path="/pixelfarm" element={<Navigate to="/pixel-wrangler" replace />} />
                  <Route path="/:slug" element={<ProjectPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
