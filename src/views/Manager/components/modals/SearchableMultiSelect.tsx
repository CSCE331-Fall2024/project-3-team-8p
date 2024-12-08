import React, { useRef, useEffect, useState } from 'react';
import { Badge, CloseButton, Form, ListGroup } from 'react-bootstrap';
import InventoryItem from "../../../../models/InventoryItem";

interface SearchableMultiSelectProps {
    items: InventoryItem[];
    selectedValues: string[];
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
    className?: string;
}

/**
 * The SearchableMultiSelect component provides a searchable dropdown that allows users to select multiple items.
 * It shows suggestions based on the user's search term, excluding already selected items.
 *
 * @param items - List of available inventory items.
 * @param selectedValues - List of currently selected item names.
 * @param onChange - Callback function that is triggered when the selected values change.
 * @param placeholder - Placeholder text for the search input (defaults to "Search...").
 * @param className - Additional CSS classes for styling the component.
 * @returns A component that allows for selecting multiple items from a list with search functionality.
 * @constructor
 */
export function SearchableMultiSelect({
                                          items,
                                          selectedValues,
                                          onChange,
                                          placeholder = "Search...",
                                          className = ""
                                      }: SearchableMultiSelectProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If we click outside the search bar, hide the suggestions
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredItems: InventoryItem[] = items.filter((item, index, items) =>
        !selectedValues.includes(item.itemName)
        && (searchTerm === "" || item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddItem = (value: string) => {
        onChange([...selectedValues, value]);
        setSearchTerm("");
        setShowSuggestions(false);
    };

    const handleRemoveItem = (value: string) => {
        onChange(selectedValues.filter(item => item !== value));
    };

    return (
        <div className={`${className}`} ref={containerRef}>
            <div className="d-flex flex-wrap gap-2 border rounded p-2 mb-2">
                {selectedValues.length > 0 ? (selectedValues.map((value: string) => {
                    const item = items.find(i => i.itemName === value);
                    return item && (
                        <Badge
                            key={value}
                            bg="secondary"
                            text="light"
                            className="p-2 d-flex align-items-center"
                            data-bs-theme="dark"
                        >
                            <span>{item.itemName}</span>
                            <CloseButton
                                onClick={() => handleRemoveItem(value)}
                                className="text-light p-0 ms-2"
                            />
                        </Badge>
                    );
                })) : (
                    <span className={"text-muted"}>...</span>
                )}
            </div>

            <div className="position-relative">
                <Form.Control
                    type="text"
                    value={searchTerm}
                    placeholder={placeholder}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    autoComplete="off"
                />
                {/* Input autocomplete suggestions */}
                {showSuggestions && (
                    <ListGroup
                        className="position-absolute w-100 shadow-sm"
                        style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 1000 }}
                    >
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item: InventoryItem) => (
                                <ListGroup.Item
                                    key={item.inventoryItemId}
                                    action
                                    onClick={() => handleAddItem(item.itemName)}
                                    className="border-start-0 border-end-0"
                                >
                                    {item.itemName}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <ListGroup.Item className="text-muted text-center">
                                No matching items
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                )}
            </div>
        </div>
    );
}
