import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
    return (
        <Form action="/" scroll={false} className="flex items-center w-full max-w-lg mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <input
                name="query"
                defaultValue={query}
                className="flex-grow p-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 transition"
                placeholder="Search Startups"
                type="text"
            />

            <div className="flex items-center gap-2">
                {query && <SearchFormReset />}
                
                <button 
                    type="submit" 
                    className="flex items-center justify-center w-10 h-10 text-white/90 bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none transition"
                >
                    <Search className="w-5 h-5" />
                </button>
            </div>
        </Form>
    );
};

export default SearchForm;
