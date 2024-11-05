import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      {/* Header Section */}
      <section className="bg-white text-center py-10 px-6 shadow-lg">
        <p className="text-lg font-medium text-gray-800">{formatDate(post?._createdAt)}</p>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2">
          {post.title}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mt-4">
          {post.description}
        </p>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 px-6">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
        />

        <div className="mt-12 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center gap-6">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center gap-4"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full shadow-lg"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500">@{post.author.username}</p>
              </div>
            </Link>

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium shadow-sm">
              {post.category}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-gray-800">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose lg:prose-lg text-gray-700 max-w-none break-words"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="text-gray-500">No details provided</p>
          )}
        </div>

        <hr className="my-16 border-gray-200" />

        {/* Editor Picks */}
        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl font-semibold text-blue-600">Editor Picks</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        {/* Suspense View */}
        <Suspense fallback={<Skeleton className="mt-16 h-80 bg-gray-100" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
