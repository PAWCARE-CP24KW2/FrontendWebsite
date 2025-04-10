import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App';
import PetInformation from './pages/information-qr-code';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/kw2">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pet/:petId" element={<PetInformation />} />
    </Routes>
  </BrowserRouter>
);