import React from 'react';
import "./css/Home.css";

/**
 * Home component that serves as the landing page for the Panda Express POS System.
 * @constructor
 */
function Home() {
    return (
        <div className={"home-background"}>
            <div className="container h-80-vh d-flex align-items-center justify-content-center">
                <div className="card" style={{ maxWidth: '800px', width: '100%' }}>
                    <div className="card-body p-4">
                        <div className="text-center mb-4">
                            <img
                                src="images/POS.png"
                                alt="POS Logo"
                                className="img-fluid mb-3"
                                style={{ height: '64px', width: 'auto' }}
                            />
                            <h1 className="mb-2 display-6">Panda Express POS System</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
