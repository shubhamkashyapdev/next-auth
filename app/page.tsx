import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[99vh] w-full flex-col">
      <h1 className="text-center text-3xl font-medium mt-10">Home</h1>
      <Link
        href="/login"
        className="px-4 py-2 bg-indigo-700 text-white rounded-sm shadow-md shadow-white/15 mt-6"
      >
        Login
      </Link>
    </div>
  )
}
