import React from 'react';
import { Card } from './components/card';
import './App.css';
import { Sponsors } from './components/sponsors';


export default function App() {
    return (
        <div className="App">
            <Card delay={50}/>
            <Sponsors delay={10}/>            
        </div>
    );
};
