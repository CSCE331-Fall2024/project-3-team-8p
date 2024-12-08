import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

interface LoadingViewProps {
    color: string;
}

/**
 * The `LoadingView` component displays a loading spinner and a text message while content is being loaded.
 * The spinner is centered on the screen, and the color of the loading text is customizable via the `color` prop.
 *
 * @param color - The color of the "Loading..." text message.
 *
 * @returns A centered loading spinner with a customizable text color.
 * @constructor
 */
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