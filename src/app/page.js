'use client';

// import LandingPage from './home/page';
import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SignalIntegrityVerification from './landing/page';
// import ResultsPage from './results/page';
// import HomePage from './home/home_page';
// import ReactDOM from 'react-dom';
import dynamic from 'next/dynamic';

// let ComponentWithNoSSR = '';

// if (typeof window !== 'undefined') {
let ComponentWithNoSSR = dynamic(() => import('./home/home_page'), {
  ssr: false,
});
// };

export default function Page() {
  return <ComponentWithNoSSR />;
}
