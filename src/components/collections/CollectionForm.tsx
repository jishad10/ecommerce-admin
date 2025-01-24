"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";

// Define the validation schema using Zod
const formSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(20, "Title must be at most 20 characters"),
  description: z
    .string()
    .min(2, "Description must be at least 2 characters")
    .max(500, "Description is too long")
    .trim(),
  image: z.string().url("Invalid image URL"),
});

// Define the CollectionType interface
interface CollectionType {
  _id: string;
  title: string;
  description?: string;
  image?: string;
}

// Define props type
interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Initialize form with default values and validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          description: initialData.description || "",
          image: initialData.image || "",
        }
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  // Prevent form submission on "Enter" key press
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        toast.success(
          `Collection ${initialData ? "updated" : "created"} successfully`
        );
        router.push("/collections");
      } else {
        toast.error("Something went wrong! Please try again.");
      }
    } catch (err) {
      console.error("[collections_SUBMIT_ERROR]", err);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-heading2-bold">Edit Collection</p>
          <Delete id={initialData._id} item="collection" />
        </div>
      ) : (
        <p className="text-heading2-bold">Create Collection</p>
      )}

      <Separator className="bg-grey-1 mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title"
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Field */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-blue-1 text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/collections")}
              className="bg-gray-400 text-white"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Discard"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
