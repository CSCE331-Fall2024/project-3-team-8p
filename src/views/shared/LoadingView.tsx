import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoadingViewProps {
    color: string;
}

function LoadingView({ color }: LoadingViewProps) {
    return (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-auto">
            <Container className="text-center">
                <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
                <p className="mt-3 fs-5" style={{ color: color }}>Loading...</p>
            </Container>
        </div>
    );
}

export default LoadingView;