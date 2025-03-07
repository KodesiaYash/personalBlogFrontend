import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

async function getBlog(id: string) {
  try {
    const res = await fetch(`http://localhost:8000/getBlog/${id}`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch blog")
    return res.json()
  } catch (error) {
    console.error("Error fetching blog:", error)
    return {
      id,
      title: "Getting Started with Next.js",
      content: `
        <p>Next.js is a React framework that enables server-side rendering and static site generation for React applications. It's designed to make it easy to build fast, SEO-friendly web applications with React.</p>
        
        <h2>Why Next.js?</h2>
        <p>Next.js provides a number of benefits over a traditional React application:</p>
        <ul>
          <li>Server-side rendering for improved performance and SEO</li>
          <li>Automatic code splitting for faster page loads</li>
          <li>Simple client-side routing</li>
          <li>API routes to build your API alongside your app</li>
          <li>Development environment with Fast Refresh</li>
          <li>Built-in CSS and Sass support</li>
        </ul>
        
        <h2>Getting Started</h2>
        <p>To create a new Next.js app, run the following command:</p>
        <pre><code>npx create-next-app@latest my-app</code></pre>
        
        <p>This will create a new Next.js app in the my-app directory. You can then run the development server with:</p>
        <pre><code>cd my-app
npm run dev</code></pre>
        
        <p>Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to see your app.</p>
        
        <h2>Pages and Routing</h2>
        <p>Next.js has a file-system based router built on the concept of pages. When a file is added to the pages directory, it's automatically available as a route.</p>
        
        <p>For example, if you create a file at pages/about.js, it will be accessible at /about.</p>
        
        <h2>Conclusion</h2>
        <p>Next.js is a powerful framework that makes it easy to build fast, SEO-friendly React applications. With its built-in features like server-side rendering, automatic code splitting, and simple routing, it's a great choice for building modern web applications.</p>
      `,
      author: "John Doe",
      date: "2023-05-15",
      readTime: "5 min read",
      image: "/placeholder.svg",
    }
  }
}

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await getBlog(params.id)

  return (
    <main className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Link href="/blogs" className="inline-flex items-center text-gray-600 hover:text-primary mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{blog.title}</h1>

          <div className="flex flex-wrap items-center text-gray-600 mb-8 gap-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {blog.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {blog.readTime}
            </div>
          </div>

          <div className="mb-8 rounded-lg overflow-hidden relative h-[400px]">
            <Image
              src={blog.image || `/placeholder.svg?height=400&width=800`}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </div>
    </main>
  )
}

