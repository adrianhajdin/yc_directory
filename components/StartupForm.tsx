"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
//updated ui for cleaner modern look :))
  return (
    <form action={formAction} className="bg-white/20 p-8 backdrop-blur-lg shadow-lg rounded-xl max-w-3xl mx-auto space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
        <Input
          id="title"
          name="title"
          className="mt-2 w-full p-3 bg-white/10 border border-transparent focus:border-blue-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 placeholder-gray-400"
          required
          placeholder="Enter the title of your startup"
        />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
        <Textarea
          id="description"
          name="description"
          className="mt-2 w-full p-3 bg-white/10 border border-transparent focus:border-blue-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 placeholder-gray-400"
          required
          placeholder="Describe your startup idea"
        />
        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-gray-700">Category</label>
        <Input
          id="category"
          name="category"
          className="mt-2 w-full p-3 bg-white/10 border border-transparent focus:border-blue-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 placeholder-gray-400"
          required
          placeholder="Category (e.g., Tech, Health, Education)"
        />
        {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-semibold text-gray-700">Image URL</label>
        <Input
          id="link"
          name="link"
          className="mt-2 w-full p-3 bg-white/10 border border-transparent focus:border-blue-400 rounded-lg shadow-sm transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 placeholder-gray-400"
          required
          placeholder="Provide a link to an image for your startup"
        />
        {errors.link && <p className="text-sm text-red-500 mt-1">{errors.link}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="block text-sm font-semibold text-gray-700">Pitch</label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={200}
          className="mt-2 bg-white/10 p-3 rounded-lg shadow-sm border border-transparent focus:border-blue-400 transition-all duration-200"
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
          }}
        />
        {errors.pitch && <p className="text-sm text-red-500 mt-1">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className={`w-full flex items-center justify-center gap-2 mt-6 py-3 px-6 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-200 ${
          isPending && "cursor-not-allowed opacity-70"
        }`}
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};

export default StartupForm;
