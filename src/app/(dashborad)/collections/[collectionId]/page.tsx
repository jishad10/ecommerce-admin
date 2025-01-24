"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";

// Define the CollectionType interface
interface CollectionType {
  _id: string;
  title: string;
  description?: string;
  image?: string;
  [key: string]: any; // For additional optional fields
}

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  // Fetch collection details
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch collection details");
      }

      const data: CollectionType = await res.json();
      setCollectionDetails(data);
    } catch (err) {
      console.error("[collectionId_GET]", err);
      setCollectionDetails(undefined); // Handle error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, [params.collectionId]);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
