import Link from "next/link";
import { getList } from "@/libs/microcms";

export default async function StaticPage() {
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">No contents</h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ul className="space-y-4">
        {contents.map((post) => {
          return (
            <li
              key={post.id}
              className="p-4 border rounded-md shadow hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`${post.id}`} className="text-xl font-semibold">
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
