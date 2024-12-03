import React, { useState, useEffect } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";
import ReviewApi from "../../apis/review-api";
import Review from "../../models/Review";
import { v4 as uuidv4 } from "uuid";
import LoadingView from "../shared/LoadingView";

const Reviews: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [reviews, setReviews] = useState<{ name: string; text: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const reviewsPerPage = 3;

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

        // Persist the active page on page load
        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
            setCurrentPage(Number(savedPage));
        }
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
                setReviews([{ name, text }, ...reviews]);
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
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        localStorage.setItem("currentPage", String(page)); // Save the active page to localStorage
    };

    return (
        <Container fluid className="py-3" style={{ background: "#dc3545", minHeight: "100vh" }}>
            {/* Page Navigation and Write a Review Button */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Button variant="primary" onClick={handleShowModal}>
                    Write a Review
                </Button>

                {/* Pagination */}
                <div className="d-flex">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant="outline-light"
                            className="mx-1"
                            onClick={() => handlePageClick(index + 1)}
                            active={currentPage === index + 1}
                            style={{
                                color: "#fff",
                                backgroundColor: currentPage === index + 1 ? "black" : "transparent",
                                transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "black")}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    currentPage === index + 1 ? "black" : "transparent")
                            }
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Loading and error handling */}
            {loading ? (
                <div className="text-center">
                    <LoadingView color={"black"} />
                </div>
            ) : error ? (
                <div className="text-center text-danger">
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    {/* Reviews List Stack */}
                    <div className="d-flex flex-column align-items-center">
                        {currentReviews.map((review, index) => (
                            <Card className="shadow-lg p-3 mb-5 bg-white rounded w-75" key={index}>
                                <Card.Body className="text-center">
                                    <Card.Title className="h5">{review.name}</Card.Title>
                                    <Card.Text>{review.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

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
