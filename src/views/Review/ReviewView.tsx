import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import ReviewApi from "../../apis/review-api";
import Review from "../../models/Review";
import { v4 as uuidv4 } from "uuid";
import LoadingView from "../shared/LoadingView";

const reviewApi = new ReviewApi();

function Reviews() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 5;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const fetchedReviews = await reviewApi.getAllReviews();
                setReviews(fetchedReviews);
            } catch (error) {
                setError("Failed to load reviews. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();

        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
    }, []);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name = (e.currentTarget.elements.namedItem("customerName") as HTMLInputElement).value;
        const text = (e.currentTarget.elements.namedItem("customerReview") as HTMLTextAreaElement).value;

        if (name && text) {
            try {
                const newReview = new Review(uuidv4(), name, text);
                await reviewApi.postReview(newReview);
                setReviews([newReview, ...reviews]);
                handleCloseModal();
            } catch (error) {
                setError("Failed to submit review. Please try again later.");
            }
        }
    };

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", String(page));
    };

    return (
        <Container fluid className="py-4" style={{ minHeight: "100vh" }}>
            <Container>
                <Row className="mb-4">
                    <Col xs={12} md={6}>
                        <h2 className="mb-0 text-white">Customer Reviews</h2>
                    </Col>
                    <Col xs={12} md={6} className="d-flex justify-content-md-end align-items-center mt-3 mt-md-0">
                        <Button
                            onClick={handleShowModal}
                            className="px-4"
                        >
                            Write a Review
                        </Button>
                    </Col>
                </Row>

                {loading ? (
                    <div className="text-center h-60-vh">
                        <LoadingView color="white" />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                ) : (
                    <div className="d-flex flex-column justify-content-between h-80-vh">
                        <Row className="g-4">
                            {currentReviews.map((review, index) => (
                                <Col xs={12} key={index}>
                                    <Card className="h-100 shadow-sm border-0">
                                        <Card.Body>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="rounded-circle d-flex justify-content-center align-items-center"
                                                     style={{
                                                         width: "40px",
                                                         height: "40px",
                                                         backgroundColor: 'var(--primary-red)',
                                                         color: "white"
                                                     }}>
                                                    {review.customerName.charAt(0).toUpperCase()}
                                                </div>
                                                <h5 className="mb-0 ms-3">{review.customerName}</h5>
                                            </div>
                                            <Card.Text>{review.review}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <div className="d-flex justify-content-center">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <Button
                                    key={index}
                                    variant={currentPage === index + 1 ? "light" : "outline-light"}
                                    onClick={() => handlePageClick(index + 1)}
                                    className="mx-1"
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton className="border-0" style={{ backgroundColor: 'var(--neutral-light)' }}>
                        <Modal.Title>Write Your Review</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmitReview}>
                        <Modal.Body style={{ backgroundColor: 'var(--neutral-light)' }}>
                            <Form.Group className="mb-3" controlId="customerName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="customerReview">
                                <Form.Label>Review</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Share your experience..."
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer className="border-0" style={{ backgroundColor: 'var(--neutral-light)' }}>
                            <Button
                                variant="outline-secondary"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--primary-red)',
                                    border: 'none',
                                    transition: 'background-color 0.3s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-red)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-red)'}
                            >
                                Submit Review
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </Container>
    );
}

export default Reviews;