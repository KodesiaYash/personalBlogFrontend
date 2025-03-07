import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

async function fetchAPI(endpoint: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const res = await fetch(`${API_URL}${endpoint}`)
  if (!res.ok) throw new Error("Failed to fetch data")
  return res.json()
}

async function getUserInformation() {
  try {
    return await fetchAPI("/getUserInformation")
  } catch (error) {
    console.error("Error fetching user information:", error)
    return { name: "John Doe", bio: "Writer & Content Creator", avatar: "/placeholder.svg" }
  }
}

async function getLatestBlogs() {
  try {
    return await fetchAPI("/getLatestBlogs")
  } catch (error) {
    console.error("Error fetching latest blogs:", error)
    return [
      {
        id: 1,
        title: "Getting Started with Next.js",
        excerpt: "Learn the basics of Next.js and how to build your first app.",
        date: "2023-05-15",
        image: "/placeholder.svg",
      },
      {
        id: 2,
        title: "The Power of Server Components",
        excerpt: "Explore how React Server Components can improve your application performance.",
        date: "2023-06-22",
        image: "/placeholder.svg",
      },
      {
        id: 3,
        title: "Styling in Next.js",
        excerpt: "Different approaches to styling your Next.js applications.",
        date: "2023-07-10",
        image: "/placeholder.svg",
      },
    ]
  }
}

export default async function Home() {
  const userInfo = await getUserInformation()
  const latestBlogs = await getLatestBlogs()

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Welcome to {userInfo.name}'s Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                {userInfo.bio || "Sharing thoughts, ideas, and insights about technology, design, and more."}
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Read My Blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="relative h-64 w-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={userInfo.avatar || "/placeholder.svg?height=256&width=256"}
                  alt={userInfo.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Latest Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out my most recent articles and stay updated with the latest content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestBlogs.map((blog) => (
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

          <div className="mt-12 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

