import React from 'react';
import ReactDOM from 'react-dom/client';
import "./CSS/index.css"
import App from './components/App';
import "../src/CSS/index.css"
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "../src/pages/redux/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
);

reportWebVitals();
