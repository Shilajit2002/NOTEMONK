import React from 'react'
// Import Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import Home Component
import Home from '../Components/Home/Home';
import Navbar from '../Components/Navbar/Navbar';

const AppRouter = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
