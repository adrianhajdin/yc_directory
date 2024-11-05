import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

  if (startups.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] w-full bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center space-y-3 px-4">
          <h3 className="text-2xl font-mono bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 text-transparent bg-clip-text">No Startups Yet{"  "}🥲</h3>
          <p className="text-gray-800  font-extrabold max-w-md">
            When startups are added, they'll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {startups.map((startup: StartupTypeCard) => (
          <div
            key={startup._id}
            className="group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
          >
            <StartupCard post={startup} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStartups;







//Responsive grid system that adapts from 1 to 3 columns
//Consistent spacing with gap-6
//Proper padding around the grid
//Added Modern Styling
//Pure white background for a clean look
//Subtle shadows and transitions on hover
//Rounded corners for a contemporary feel
//Smooth hover animations
//Created a more engaging "no startups" state
//Centered layout with helpful message
//Consistent with the modern design language
