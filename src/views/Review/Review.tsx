import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import ReviewApi from "../../apis/review-api";
import Review from "../../models/Review";
import { v4 as uuidv4 } from 'uuid';
import LoadingView from "../shared/LoadingView";

const Reviews: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [reviews, setReviews] = useState<{ name: string; text: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 9;

    // Initialize the ReviewApi
    const reviewApi = new ReviewApi();

    // Fetch reviews from the backend when the component mounts
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const fetchedReviews = await reviewApi.getAllReviews();
                setReviews(fetchedReviews.map((review) => ({ name: review.customerName, text: review.review })));
                setLoading(false);
            } catch (error) {
                setError("Failed to load reviews. Please try again later.");
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Modal handlers
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = (e.currentTarget.elements.namedItem("customerName") as HTMLInputElement).value;
        const text = (e.currentTarget.elements.namedItem("customerReview") as HTMLTextAreaElement).value;

        if (name && text) {
            try {
                // Post the new review to the backend
                await reviewApi.postReview(new Review(uuidv4(), name, text));

                // Add the new review to the local state
                setReviews([...reviews, { name, text }]);
                handleCloseModal();
            } catch (error) {
                setError("Failed to submit review. Please try again later.");
            }
        }
    };

    // Calculate the reviews for the current page
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    // Handle pagination
    const handleNextPage = () => {
        if (currentPage < Math.ceil(reviews.length / reviewsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
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

            {/* Loading and error handling */}
            {loading ? (
                <div className="text-center">
                    <LoadingView color={"white"}/>
                </div>
            ) : error ? (
                <div className="text-center text-danger">
                    <p>{error}</p>
                </div>
            ) : (
                <Row className="g-4">
                    {currentReviews.map((review, index) => (
                        <Col xs={12} md={6} lg={4} key={index}>
                            <Card className="d-flex flex-column" style={{ height: '100%' }}>
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{review.name}</Card.Title>
                                    <Card.Text>{review.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Pagination controls */}
            <div className="d-flex justify-content-center mt-4">
                <Button variant="secondary" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Button variant="secondary" onClick={handleNextPage} disabled={currentPage >= Math.ceil(reviews.length / reviewsPerPage)}>
                    Next
                </Button>
            </div>

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
