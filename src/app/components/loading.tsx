export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin-fast rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      <h1 className="text-xl font-semibold mt-4">Loading...</h1>
    </div>
  );
}
