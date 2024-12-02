import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Pagination, Row } from "react-bootstrap";
import CardItem from "../../../../models/interfaces/CardItem";
import ItemCard from "./ItemCard";
import LoadingView from "../../../shared/LoadingView";
import MenuItemApi from "../../../../apis/menu-item-api";

const menuItemApi = new MenuItemApi();

interface ItemGridProps<T extends CardItem> {
    pageTitle: string;
    loading: boolean;
    items: T[];
    onAddOrUpdateItem: (item?: T) => void;
}

function ItemGrid<T extends CardItem>({ pageTitle, loading, items, onAddOrUpdateItem }: ItemGridProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [isHappyHour, setIsHappyHour] = useState<boolean | undefined>(undefined);

    const itemsPerPage = 12;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentPageItems = items.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }

    const handleSetHappyHour = async (isHappyHour: boolean) => {
        try {
            setIsHappyHour(undefined);
            await menuItemApi.updateDiscount(isHappyHour);
            setIsHappyHour(isHappyHour);
        } catch (error) {
            console.error("Error when setting happy hour status:", error);
        }
    };

    useEffect(() => {
        const getDiscountStatus = async () => {
            try {
                setIsHappyHour(undefined);
                const discountStatus = await menuItemApi.getDiscountStatus();
                setIsHappyHour(discountStatus);
            } catch (error) {
                console.log("Error when getting discount status:", error);
            }
        }
        getDiscountStatus();
    }, [])

    useEffect(() => {
        setCurrentPage(1);
    }, [items])

    return (
        <Container className={"item-grid px-3 d-flex flex-column justify-content-between h-100"}>
            {loading ? (
                <div className="d-flex flex-column justify-content-center flex-grow-1">
                    <LoadingView color="white" />
                </div>
            ) : (
                <Row>
                    {currentPageItems.map((item: T) => (
                        <Col key={item.id} md={3} className={"mb-3"}>
                            <ItemCard item={item} onClick={onAddOrUpdateItem} />
                        </Col>
                    ))}
                </Row>
            )}

            <div className="d-flex justify-content-between align-items-center mb-2">
                <Button onClick={() => onAddOrUpdateItem()}>
                    Add {pageTitle}
                </Button>

                {pageTitle === "Menu Item" && (
                    <Button
                        disabled={isHappyHour === undefined}
                        onClick={() => handleSetHappyHour(!isHappyHour)}
                    >
                        {isHappyHour ? "Stop Happy Hour" : "Start Happy Hour"}
                    </Button>
                )}

                <Pagination className={"justify-content-center mb-0"}>
                    <Pagination.First
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(1)}
                    />
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={currentPage === index + 1}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                    <Pagination.Last
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(totalPages)}
                    />
                </Pagination>
            </div>
        </Container>
    );
}

export default ItemGrid;