import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-white py-16 px-6 sm:px-10 md:px-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient from-pink-500 via-purple-500 to-blue-500 leading-tight tracking-tight mb-4 ">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-2xl leading-relaxed mb-8 animate-slideUp">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} className="w-full max-w-lg" />
      </section>

      {/* Startups Section */}
      <section className="bg-gray-50 py-20 px-6 sm:px-10 md:px-16">
        <p className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-10">
          {query ? `Search results for "${query}"` : "Explore All Startups"}
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full text-xl">
              No startups found.
            </p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
