import Link from "next/link";
import { getList } from "@/libs/microcms";
import { MdArrowUpward } from "react-icons/md";

export default async function StaticPage() {
  const { contents } = await getList();

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-sky-600 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">BlogSample</h1>
      </header>
      <main className="max-w-4xl mx-auto p-4" id="top">
        {contents && contents.length > 0 ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Articles</h1>
            <ul className="space-y-4">
              {contents.map((post) => (
                <li
                  key={post.id}
                  className="p-4 border rounded-md shadow hover:shadow-lg transition-shadow duration-300"
                >
                  <Link
                    href={`/${post.id}`}
                    className="text-xl font-semibold flex items-center space-x-2"
                  >
                    <span>{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h1 className="text-center text-2xl font-bold mt-10">No contents</h1>
        )}
      </main>
      <footer className="fixed bottom-4 right-4">
        <a href="#top" className="flex items-center text-sky-400">
          <MdArrowUpward className="text-4xl" />
        </a>
      </footer>
    </div>
  );
}
