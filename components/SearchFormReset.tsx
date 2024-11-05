"use client";

import Link from "next/link";
import { X } from "lucide-react";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if (form) form.reset();
    }

    return (
        <button 
            type="button" 
            onClick={reset} 
            className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-red-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300"
        >
            <X className="w-6 h-6 text-white" />
        </button>
    )
}

export default SearchFormReset;
