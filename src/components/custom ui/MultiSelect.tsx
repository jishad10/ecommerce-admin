"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface MultiSelectProps {
  value: string[];
  collections: CollectionType[];
  onChange: (newValue: string[]) => void;
  onRemove: (idToRemove: string) => void;
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  collections,
  onChange,
  onRemove,
  placeholder,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCollections, setFilteredCollections] =
    useState<CollectionType[]>(collections);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  useEffect(() => {
    if (searchQuery) {
      setFilteredCollections(
        collections.filter((collection) =>
          collection.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredCollections(collections);
    }
  }, [searchQuery, collections]);

  const handleAddCollection = useCallback(
    (collectionId: string) => {
      if (!value.includes(collectionId)) {
        onChange([...value, collectionId]);
        setIsDropdownVisible(false); // Close the dropdown
      }
    },
    [value, onChange]
  );

  const handleRemoveCollection = useCallback(
    (collectionId: string) => {
      onRemove(collectionId);
    },
    [onRemove]
  );

  return (
    <div className="relative">
      {/* Input for search query */}
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
        onClick={() => setIsDropdownVisible(true)} // Show dropdown on click
      />

      {/* Dropdown for collections */}
      {isDropdownVisible && (
        <div className="absolute mt-2 w-full max-h-60 overflow-y-auto bg-white border rounded shadow-md z-10">
          {filteredCollections.length > 0 ? (
            filteredCollections.map((collection) => (
              <div
                key={collection._id}
                className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleAddCollection(collection._id)} // Add on click
              >
                <span>{collection.title}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No collections found</div>
          )}
        </div>
      )}

      {/* Display selected collections */}
      <div className="mt-4 flex flex-wrap gap-2">
        {value.map((collectionId) => {
          const collection = collections.find(
            (col) => col._id === collectionId
          );
          return (
            collection && (
              <Badge key={collectionId} variant="outline">
                {collection.title}
                <span
                  className="cursor-pointer ml-2"
                  onClick={() => handleRemoveCollection(collectionId)}
                >
                  ✕
                </span>
              </Badge>
            )
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
