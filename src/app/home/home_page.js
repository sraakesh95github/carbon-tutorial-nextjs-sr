'use client';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignalIntegrityVerification from '../landing/page';
import ResultsPage from '../results/page';

export default function HomePage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignalIntegrityVerification />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}
