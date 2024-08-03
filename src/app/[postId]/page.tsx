import { notFound } from "next/navigation";
import parse from "html-react-parser";
import { getDetail, getList } from "@/libs/microcms";
import { Suspense } from "react";
import Loading from "@/app/components/loading";
import { MdArrowBack, MdArrowUpward } from "react-icons/md";
import Link from "next/link";

export async function generateStaticParams() {
  const { contents } = await getList();

  const paths = contents.map((post) => {
    return {
      postId: post.id,
    };
  });

  return [...paths];
}

export default async function StaticDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await getDetail(postId);

  // ページの生成された時間を取得
  const time = new Date().toLocaleString();

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-sky-600 text-white py-4 px-6 flex items-center justify-between">
        <Link href="/" className="text-white flex items-center">
          <MdArrowBack className="mr-2" />
          Back to Articles
        </Link>
        <h1 className="text-2xl font-bold">BlogSample</h1>
      </header>
      <main className="max-w-4xl mx-auto p-6 sm:p-8 lg:p-12">
        <Suspense fallback={<Loading />}>
          <article className="prose lg:prose-xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-6">{time}</p>
            <div>{parse(post.content)}</div>
          </article>
        </Suspense>
        <footer className="fixed bottom-4 right-4">
          <a href="#top" className="flex items-center text-sky-500">
            <MdArrowUpward className="text-4xl" />
          </a>
        </footer>
      </main>
    </div>
  );
}
