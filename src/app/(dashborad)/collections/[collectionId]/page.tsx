/*

"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/custom ui/Loader";
import CollectionForm from "@/components/collections/CollectionForm";
import { useRouter } from "next/navigation";

// Define the CollectionType interface
interface CollectionType {
  _id: string;
  title: string;
  description?: string;
  image?: string;
}

// Type for the props
interface CollectionDetailsProps {
  params: {
    collectionId: string;
  };
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({ params }) => {
  const { collectionId } = params; // Destructure collectionId
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  // Fetch collection details
  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch collection details");
      }

      const data: CollectionType = await res.json();
      setCollectionDetails(data);
    } catch (err) {
      console.error("[collectionId_GET]", err);
      setCollectionDetails(null); // Handle error state
      router.push("/error"); // Navigate to an error page if needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (collectionId) {
      getCollectionDetails();
    } else {
      console.error("No collectionId provided");
      router.push("/error"); // Navigate to an error page if needed
    }
  }, [collectionId]);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
*/
