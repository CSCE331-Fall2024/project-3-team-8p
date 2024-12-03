import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

const Reviews: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);

    // Placeholder reviews
    const [reviews, setReviews] = useState<{ name: string; text: string }[]>([
        { name: "John Doe", text: "Amazing food and quick service!" },
        { name: "Jane Smith", text: "Delicious desserts, will order again!" },
    ]);

    // Modal handlers
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = (e.currentTarget.elements.namedItem("customerName") as HTMLInputElement).value;
        const text = (e.currentTarget.elements.namedItem("customerReview") as HTMLTextAreaElement).value;

        if (name && text) {
            setReviews([...reviews, { name, text }]);
            handleCloseModal();
        }
    };

    return (
        <Container fluid className="py-3" style={{ background: "#dc3545", minHeight: "100vh" }}>
            <Row>
                <Col>
                    <Container
                        className="py-4 mb-4"
                        style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <h1 className="text-center" style={{ fontSize: "24px", color: "black", margin: 0 }}>
                            Customer Reviews
                        </h1>
                    </Container>
                </Col>
            </Row>
            <Row className="g-4">
                {reviews.map((review, index) => (
                    <Col xs={12} md={6} lg={4} key={index}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{review.name}</Card.Title>
                                <Card.Text>{review.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="text-center mt-4">
                <Button variant="primary" onClick={handleShowModal}>
                    Write a Review
                </Button>
            </div>

            {/* Review Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Write Your Review</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmitReview}>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="customerName">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="customerReview">
                            <Form.Label>Review</Form.Label>
                            <Form.Control as="textarea" rows={4} placeholder="Write your review here..." />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default Reviews;
