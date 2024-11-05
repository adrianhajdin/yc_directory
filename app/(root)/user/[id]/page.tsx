import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  
  if (!user) return notFound();
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="rounded-2xl object-cover shadow-sm"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 text-center mt-2">
                {user.name}
              </h1>
              
              <p className="text-lg text-gray-600 mt-1">
                @{user?.username}
              </p>
              
              <div className="w-full mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-center leading-relaxed">
                  {user?.bio || "No bio available"}
                </p>
              </div>
            </div>
          </div>

          {/* Startups Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {session?.id === id ? "Your Startups" : "All Startups"}
              </h2>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <StartupCardSkeleton key={i} />
                    ))}
                  </div>
                }
              >
                <UserStartups id={id} />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
