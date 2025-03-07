import Image from "next/image"

async function getUserInfo() {
  try {
    const res = await fetch("http://your-fastapi-backend/user-info", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch user info")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching user info:", error)
    return {
      name: "John Doe",
      title: "Web Developer & Writer",
      bio: "I write about web development, technology, and my personal experiences.",
      avatar: "/placeholder.svg?height=150&width=150",
      longBio: `I'm a web developer with over 5 years of experience building modern web applications. 
      I specialize in JavaScript, React, and Node.js. When I'm not coding, I enjoy writing about 
      technology and sharing my knowledge with others.
      
      I started this blog as a way to document my journey and help others learn from my experiences. 
      I believe in continuous learning and growth, and I hope my articles can inspire and guide fellow developers.`,
      skills: ["JavaScript", "React", "Node.js", "Python", "FastAPI", "Next.js"],
    }
  }
}

export default async function About() {
  const userInfo = await getUserInfo()

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">About Me</h1>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-1/3 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-100">
            <Image
              src={userInfo.avatar || "/placeholder.svg?height=256&width=256"}
              alt={userInfo.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <h2 className="text-2xl font-bold mb-2">{userInfo.name}</h2>
          <p className="text-xl text-gray-600 mb-4">{userInfo.title}</p>

          <div className="prose max-w-none">
            {userInfo.longBio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {userInfo.skills.map((skill) => (
            <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

