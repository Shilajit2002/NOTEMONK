import React from 'react'
// Import Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Navbar Component
import Navbar from '../Components/Navbar/Navbar';
// Import Home Component
import Home from '../Components/Home/Home';
// Import NotFound Component
import NotFound from '../Components/NotFound/NotFound';

const AppRouter = () => {
    return (
        <>
            <Router>
                {/* Navbar Route */}
                <Navbar />
                <Routes>
                    {/* Home Route */}
                    <Route exact path='/' element={<Home />} />
                    {/* Not Found Route */}
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
        </>
    )
}

export default AppRouter;
