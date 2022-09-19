import React from "react";
import './App.css';

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Error from "./pages/Error";
import SingleRoom from "./pages/SingleRoom";

import {Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route index path='/' element={<Home/>}/>
                <Route path='/rooms'>
                    <Route index element={<Rooms/>}/>
                    <Route path=":slug" element={<SingleRoom/>}/>
                </Route>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </>
    );
}

export default App;
