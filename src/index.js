import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {RoomProvider} from './context'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RoomProvider>
        <Router>
            <App/>
        </Router>
    </RoomProvider>
);
