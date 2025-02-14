import React from 'react';
import ReactDOM from 'react-dom/client';
import "./CSS/index.css";
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from "../src/pages/redux/store";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from 'react-hot-toast';

const store = configureStore({
    reducer: rootReducer,
});

// Apply dark mode preference on load
const darkMode = localStorage.getItem("darkMode") === "true";
document.documentElement.classList.toggle("dark", darkMode);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
            <Toaster />
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
