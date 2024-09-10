// src/Components/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login'; // Adjust the path as necessary
import Home from './Home'; // Adjust the path as necessary
import { ProductProvider } from './Context'; // Ensure Context is wrapped around the routes
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <ProductProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </ProductProvider>
    );
}

const isAuthenticated = () => {
    return localStorage.getItem('isAuthenticated') === 'true';
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default App;
