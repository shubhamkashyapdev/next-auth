"use client"
import { useEffect, useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

const LoginPage = () => {
  const { data } = useSession()
  console.log(data)
  if (data) {
    return (
      <div className="flex justify-center items-center h-[70vh] w-full">
        <div>
          <button onClick={() => signOut()}>SingOut: {data!.user!.name}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-[70vh] w-full">
      <div>
        <button onClick={() => signIn()}>SingIn</button>
      </div>
    </div>
  )
}

export default LoginPage
