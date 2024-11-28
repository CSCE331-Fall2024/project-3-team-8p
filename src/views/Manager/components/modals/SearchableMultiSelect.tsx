import React, { useRef, useEffect, useState } from 'react';
import { Badge, CloseButton, Form, ListGroup } from 'react-bootstrap';

interface SearchableMultiSelectProps<ItemType> {
    items: ItemType[];
    selectedValues: string[];
    getItemValue: (item: ItemType) => string;
    getItemLabel?: (item: ItemType) => string;
    onChange: (selectedValues: string[]) => void;
    placeholder?: string;
    className?: string;
}

/*
Search bar logic:
    1. When the user initially clicks the search bar, show a dropdown of all available items
    2. When the user starts typing an item name, only show items whose names include the search term
    3. DOES NOT show items that are already selected
 */
export function SearchableMultiSelect<ItemType>({
                                             items,
                                             selectedValues,
                                             getItemValue,
                                             getItemLabel = getItemValue,
                                             onChange,
                                             placeholder = "Search...",
                                             className = ""
                                         }: SearchableMultiSelectProps<ItemType>) {
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

    useEffect(() => {
        console.log(selectedValues);
    }, [selectedValues]);

    const filteredItems: ItemType[] = items.filter(item => {
        const value = getItemValue(item);
        return !selectedValues.includes(value) &&
            (searchTerm === "" || value.toLowerCase().includes(searchTerm.toLowerCase()));
    });

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
                {selectedValues.map((value: string) => {
                    const item = items.find(i => getItemValue(i) === value);
                    return item && (
                        <Badge
                            key={value}
                            bg="secondary"
                            text="light"
                            className="p-2 d-flex align-items-center"
                            data-bs-theme="dark"
                        >
                            <span>{getItemLabel(item)}</span>
                            <CloseButton
                                onClick={() => handleRemoveItem(value)}
                                className="text-light p-0 ms-2"
                            />
                        </Badge>
                    );
                })}
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
                            filteredItems.map((item: ItemType) => (
                                <ListGroup.Item
                                    key={getItemValue(item)}
                                    action
                                    onClick={() => handleAddItem(getItemValue(item))}
                                    className="border-start-0 border-end-0"
                                >
                                    {getItemLabel(item)}
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