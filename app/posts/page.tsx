import React from "react"
import prisma from "../../prisma/client"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

const Posts = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    console.log(`Navigate back to /`)
  }
  const posts = await prisma.post.findMany()
  return (
    <div>
      <h1 className="text-center text-3xl font-medium mt-10">Posts</h1>
      {posts.map((post) => (
        <div key={post.id}>Title: {post.title}</div>
      ))}
    </div>
  )
}

export default Posts
