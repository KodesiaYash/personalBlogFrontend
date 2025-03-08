/* eslint-disable */
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"

async function getBlogById(id: string) {
  try {
    const res = await fetch(`http://your-fastapi-backend/blog/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!res.ok) {
      if (res.status === 404) {
        return null
      }
      throw new Error("Failed to fetch blog")
    }

    return res.json()
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error)

    // Mock data for demonstration
    const mockBlogs: { [key: string]: Blog } = {
      "1": {
        id: "1",
        title: "Getting Started with Next.js",
        content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's a great choice for building modern web applications.

## Why Next.js?

Next.js provides a number of benefits:

- **Server-side rendering**: Improves performance and SEO
- **Static site generation**: Pre-renders pages at build time for even better performance
- **API routes**: Build API endpoints as part of your Next.js app
- **File-based routing**: Create routes based on your file structure
- **Built-in CSS and Sass support**: Style your application with ease

## Setting Up a Next.js Project

To create a new Next.js project, run the following command:

\`\`\`bash
npx create-next-app@latest my-next-app
\`\`\`

This will create a new Next.js project with all the necessary configuration.

## Project Structure

A typical Next.js project structure looks like this:

- \`pages/\`: Contains your application's pages
- \`public/\`: Stores static assets like images
- \`styles/\`: Contains your CSS files
- \`components/\`: Houses your React components

## Creating Your First Page

To create a page in Next.js, simply add a file to the \`pages\` directory:

\`\`\`jsx
// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page</p>
    </div>
  )
}
\`\`\`

## Conclusion

Next.js makes it easy to build fast, SEO-friendly React applications. With its intuitive API and powerful features, it's no wonder why so many developers choose Next.js for their projects.
        `,
        date: "2023-05-15",
        author: "John Doe",
        coverImage: "/placeholder.svg?height=400&width=800",
        tags: ["Next.js", "React", "Web Development"],
      },
      "2": {
        id: "2",
        title: "Introduction to FastAPI",
        content: `
# Introduction to FastAPI

FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

## Why FastAPI?

FastAPI stands out for several reasons:

- **Fast**: Very high performance, on par with NodeJS and Go
- **Fast to code**: Increase the speed to develop features by about 200% to 300%
- **Fewer bugs**: Reduce about 40% of human (developer) induced errors
- **Intuitive**: Great editor support. Completion everywhere. Less time debugging
- **Easy**: Designed to be easy to use and learn. Less time reading docs
- **Short**: Minimize code duplication. Multiple features from each parameter declaration
- **Robust**: Get production-ready code. With automatic interactive documentation
- **Standards-based**: Based on (and fully compatible with) the open standards for APIs: OpenAPI and JSON Schema

## Getting Started

To install FastAPI, you need to have Python 3.7+ installed. Then, you can install FastAPI with pip:

\`\`\`bash
pip install fastapi
pip install uvicorn
\`\`\`

## Creating Your First API

Here's a simple example of a FastAPI application:

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
\`\`\`

To run the server, use the following command:

\`\`\`bash
uvicorn main:app --reload
\`\`\`

This will start the server with auto-reload enabled, which is useful during development.

## Automatic Documentation

One of the best features of FastAPI is the automatic interactive API documentation. When you run your FastAPI application, you can access the documentation at:

- \`/docs\`: Swagger UI documentation
- \`/redoc\`: ReDoc documentation

These pages are automatically generated based on your API routes and provide a way to test your API directly from the browser.

## Path Parameters

FastAPI allows you to declare path parameters with type annotations:

\`\`\`python
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}
\`\`\`

## Query Parameters

Query parameters are declared as function parameters:

\`\`\`python
@app.get("/items/")
def read_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}
\`\`\`

## Request Body

You can declare the request body using Pydantic models:

\`\`\`python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

@app.post("/items/")
def create_item(item: Item):
    return item
\`\`\`

## Conclusion

FastAPI is a powerful framework for building APIs with Python. Its combination of speed, ease of use, and automatic documentation makes it an excellent choice for modern API development.
        `,
        date: "2023-06-22",
        author: "John Doe",
        coverImage: "/placeholder.svg?height=400&width=800",
        tags: ["Python", "FastAPI", "API"],
      },
    }

    return mockBlogs[id] || null
  }
}

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  coverImage: string;
  tags: string[];
}

interface BlogPostProps {
  params: {
    id: string
  }
}

export default async function BlogPost({ params }: BlogPostProps) {
  const blog = await getBlogById(params.id)

  if (!blog) {
    notFound()
  }

  // Convert markdown-like content to HTML (very basic implementation)
  const formatContent = (content: string) => {
    return content
      .split("\n\n")
      .map((paragraph) => {
        if (paragraph.startsWith("# ")) {
          return `<h1 class="text-3xl font-bold my-4">${paragraph.substring(2)}</h1>`
        } else if (paragraph.startsWith("## ")) {
          return `<h2 class="text-2xl font-bold my-3">${paragraph.substring(3)}</h2>`
        } else if (paragraph.startsWith("### ")) {
          return `<h3 class="text-xl font-bold my-2">${paragraph.substring(4)}</h3>`
        } else if (paragraph.startsWith("- ")) {
          const items = paragraph
            .split("\n")
            .map((item) => `<li>${item.substring(2)}</li>`)
            .join("")
          return `<ul class="list-disc pl-5 my-2">${items}</ul>`
        } else if (paragraph.startsWith("```")) {
          const code = paragraph.split("\n").slice(1, -1).join("\n")
          return `<pre class="bg-gray-100 p-4 rounded-md overflow-x-auto my-4"><code>${code}</code></pre>`
        } else {
          return `<p class="my-2">${paragraph}</p>`
        }
      })
      .join("")
  }

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to all posts
      </Link>

      <div className="relative w-full h-64 md:h-96 mb-8">
        <Image
          src={blog.coverImage || "/placeholder.svg?height=400&width=800"}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center text-gray-600 mb-4">
          <span>{blog.date}</span>
          {blog.author && (
            <>
              <span className="mx-2">•</span>
              <span>{blog.author}</span>
            </>
          )}
        </div>

        {blog.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }} />
    </article>
  )
}

