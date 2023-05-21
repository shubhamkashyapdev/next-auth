"use client"

import { useSession, signIn, signOut } from "next-auth/react"

const LoginPage = () => {
  const { data } = useSession()
  if (data) {
    return (
      <div className="flex justify-center items-center h-[70vh] w-full">
        <div>
          <button
            className="px-4 py-2 bg-indigo-700 text-white rounded-sm shadow-md shadow-white/15 mt-6 hover:scale-105 ease-in-out duration-100"
            onClick={() => signOut()}
          >
            SingOut: {data!.user!.name}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-[70vh] w-full">
      <div>
        <button
          className="px-4 py-2 bg-indigo-700 text-white rounded-sm shadow-md shadow-white/15 mt-6 hover:scale-105 ease-in-out duration-100"
          onClick={() => signIn()}
        >
          SingIn
        </button>
      </div>
    </div>
  )
}

export default LoginPage
