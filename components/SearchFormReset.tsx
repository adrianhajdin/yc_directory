"use client"
//added moder Transitions

import Link from "next/link";
import { X } from "lucide-react";

const SearchFormReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;

        if(form) form.reset();
    }

    return (
        <button 
            type="button" 
            onClick={reset} 
            className="flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            <X className="w-5 h-5" />
        </button>
    )
}

export default SearchFormReset;
