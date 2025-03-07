import Image from "next/image"
import Link from "next/link"

async function getAllBlogs() {
  try {
    const res = await fetch("http://your-fastapi-backend/getAllBlogs", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch blogs")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return [
      {
        id: "1",
        title: "Getting Started with Next.js",
        excerpt: "Learn how to build modern web applications with Next.js",
        date: "2023-05-15",
        coverImage: "/placeholder.svg?height=200&width=400",
        tags: ["Next.js", "React", "Web Development"],
      },
      {
        id: "2",
        title: "Introduction to FastAPI",
        excerpt: "Build high-performance APIs with Python and FastAPI",
        date: "2023-06-22",
        coverImage: "/placeholder.svg?height=200&width=400",
        tags: ["Python", "FastAPI", "API"],
      },
      {
        id: "3",
        title: "Responsive Design Principles",
        excerpt: "Create websites that look great on any device",
        date: "2023-07-10",
        coverImage: "/placeholder.svg?height=200&width=400",
        tags: ["CSS", "Responsive Design", "Web Development"],
      },
      {
        id: "4",
        title: "State Management in React",
        excerpt: "Different approaches to manage state in React applications",
        date: "2023-08-05",
        coverImage: "/placeholder.svg?height=200&width=400",
        tags: ["React", "State Management", "JavaScript"],
      },
      {
        id: "5",
        title: "Deploying Next.js Apps on Vercel",
        excerpt: "A step-by-step guide to deploying your Next.js application on Vercel",
        date: "2023-09-18",
        coverImage: "/placeholder.svg?height=200&width=400",
        tags: ["Next.js", "Vercel", "Deployment"],
      },
    ]
  }
}

export default async function BlogPage() {
  const blogs = await getAllBlogs()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="grid gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="card flex flex-col md:flex-row overflow-hidden">
            <div className="md:w-1/3 relative h-48 md:h-auto">
              <Image
                src={blog.coverImage || "/placeholder.svg?height=200&width=400"}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/blog/${blog.id}`} className="hover:text-blue-600">
                  {blog.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>

              {blog.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link href={`/blog/${blog.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

