import React from 'react';
import './App.css';

function MenuDisplay() {
    return (
        <div className="App">
            <h1> MENU </h1>
            <div className="box">
                <header className="App-header">
                    <h1> ENTREES </h1>
                    <h1><i> $3.50 ea.</i></h1>
                </header>
            </div>

            <div className="box">
                <header className="App-header">
                    <h1> SIDES </h1>
                    <h1><i> $3.00 ea.</i></h1>
                </header>
            </div>

            <div className="box">
                <header className="App-header">
                    <h1> DRINKS </h1>
                    <h1><i> $1.00 ea.</i></h1>
                </header>
            </div>

            <div className="box">
                <header className="App-header">
                    <h1> APPETIZERS </h1>
                    <h1><i> $1.95 ea.</i></h1>
                </header>
            </div>
        </div>
    );
}

export default MenuDisplay;
