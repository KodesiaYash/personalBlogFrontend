import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

async function getAllBlogs() {
  try {
    const res = await fetch("http://localhost:8000/getAllBlogs", { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch blogs")
    return res.json()
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return [
      {
        id: 1,
        title: "Getting Started with Next.js",
        excerpt: "Learn the basics of Next.js and how to build your first app.",
        date: "2023-05-15",
      },
      {
        id: 2,
        title: "The Power of Server Components",
        excerpt: "Explore how React Server Components can improve your application performance.",
        date: "2023-06-22",
      },
      {
        id: 3,
        title: "Styling in Next.js",
        excerpt: "Different approaches to styling your Next.js applications.",
        date: "2023-07-10",
      },
      {
        id: 4,
        title: "Working with APIs in Next.js",
        excerpt: "How to fetch and manage data from external APIs in your Next.js application.",
        date: "2023-08-05",
      },
      {
        id: 5,
        title: "Authentication in Next.js",
        excerpt: "Implementing user authentication in your Next.js application.",
        date: "2023-09-18",
      },
      {
        id: 6,
        title: "Optimizing Images in Next.js",
        excerpt: "Using the Next.js Image component for optimal performance.",
        date: "2023-10-27",
      },
    ]
  }
}

export default async function BlogsPage() {
  const blogs = await getAllBlogs()

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">All Blog Posts</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore all articles and stay updated with the latest content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blogs/${blog.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src={blog.image || `/placeholder.svg?height=192&width=384`}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                  <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{blog.excerpt}</p>
                  <div className="inline-flex items-center text-primary font-medium">
                    Read more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

