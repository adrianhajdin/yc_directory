import { z } from "zod";

/**
 * Schema for startup form validation
 * Includes validations for input length, format, and advanced checks.
 */
export const formSchema = z.object({
  // Title: Must be a string with 3-100 characters, alphanumeric, and only basic punctuation.
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long.")
    .max(100, "Title cannot exceed 100 characters.")
    .regex(/^[a-zA-Z0-9\s.,!?'-]+$/, "Title can only contain letters, numbers, spaces, and basic punctuation."),

  // Description: Must be a string with 20-500 characters and cannot contain any offensive words.
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description cannot exceed 500 characters.")
    .refine((desc) => !/offensive|prohibited|spam/i.test(desc), {
      message: "Description contains inappropriate language.",
    }),

  // Category: Must be a string between 3-20 characters, restricted to alphabets only.
  category: z
    .string()
    .min(3, "Category must be at least 3 characters.")
    .max(20, "Category cannot exceed 20 characters.")
    .regex(/^[a-zA-Z]+$/, "Category can only contain letters."),

  // Image URL: Must be a valid URL that points to an image and supports both HTTP and HTTPS.
  link: z
    .string()
    .url("Invalid URL format.")
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }, "The URL must point to a valid image resource."),

  // Pitch: Minimum of 10 characters, checking for professional language and grammar (no all caps).
  pitch: z
    .string()
    .min(10, "Pitch must be at least 10 characters.")
    .refine((pitch) => !pitch.match(/^[A-Z\s]+$/), {
      message: "Pitch cannot be in all caps and should maintain a professional tone.",
    }),
});
