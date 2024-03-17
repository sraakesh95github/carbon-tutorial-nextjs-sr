'use client';

// import LandingPage from './home/page';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignalIntegrityVerification from './landing/page';
import ResultsPage from './results/page';

export default function Page() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignalIntegrityVerification />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}
