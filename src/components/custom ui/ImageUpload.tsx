import { useState } from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { storage } from "../../firebase"; // Import the storage from firebase.ts
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Firebase storage methods
import Image from "next/image";
import { v4 as uuidv4 } from "uuid"; // To generate unique file names

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const [uploading, setUploading] = useState(false);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);

      const storageRef = ref(storage, `collections/${uuidv4()}`); // Unique path for each image
      try {
        const snapshot = await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
        const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL

        onChange(downloadURL); // Update the parent component with the download URL
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        setUploading(false); // Stop the uploading state
      }
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      <Button
        type="button"
        onClick={() => document.getElementById("image-upload")?.click()}
        className="bg-grey-1 text-white"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  );
};

export default ImageUpload;
