import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './router';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";

import App from './App';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
