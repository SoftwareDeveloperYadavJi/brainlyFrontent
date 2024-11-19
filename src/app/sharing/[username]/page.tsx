'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, useAnimationFrame } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lock, Search, Tag, Brain, Sparkles } from 'lucide-react'

// Mock data for demonstration
const mockSharedBrain = {
  isShared: true,
  username: 'johndoe',
  avatar: 'https://github.com/shadcn.png',
  posts: [
    { id: 1, title: 'My First Thought', content: 'This is the content of my first thought...', tags: ['personal', 'ideas'] },
    { id: 2, title: 'Interesting Article', content: 'I found this article really fascinating...', tags: ['tech', 'AI'] },
    { id: 3, title: 'Project Idea', content: 'Here\'s an idea for a new project...', tags: ['project', 'innovation'] },
    { id: 4, title: 'Book Review', content: 'Just finished reading an amazing book...', tags: ['personal', 'books'] },
    { id: 5, title: 'Coding Tips', content: 'Some useful coding tips I learned today...', tags: ['tech', 'coding'] },
    { id: 6, title: 'Future of AI', content: 'Thoughts on the future of artificial intelligence...', tags: ['tech', 'AI', 'future'] },
  ]
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

function capitalizeFirstLetter(string: string): string {
    if (!string) return ''; // Check for an empty string
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export default function SharedBrainPage() {
  const params = useParams()
  const [brainData, setBrainData] = useState(mockSharedBrain)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    setBrainData({ ...mockSharedBrain, username: params.username as string })
  }, [params.username])

  const filteredPosts = brainData.posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (!brainData.isShared) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <Card className="w-[350px] bg-white/10 backdrop-blur-lg border-0">
            <CardHeader>
              <CardTitle className="text-center text-white">Private Brain</CardTitle>
              <CardDescription className="text-center text-gray-300">
                This brain is not currently shared.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Lock className="h-16 w-16 text-gray-400" />
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-400">
                The owner of this brain has chosen to keep it private.
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={brainData.avatar} alt={brainData.username} />
              <AvatarFallback>{brainData.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{capitalizeFirstLetter(brainData.username)}'s Second Brain</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Exploring thoughts and ideas</p>
            </div>
          </div>
          <Brain className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <div className="mb-6">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="search"
                  className="pl-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400"
                  placeholder="Search thoughts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All</TabsTrigger>
                <TabsTrigger value="personal" onClick={() => setActiveTab('personal')}>Personal</TabsTrigger>
                <TabsTrigger value="tech" onClick={() => setActiveTab('tech')}>Tech</TabsTrigger>
                <TabsTrigger value="project" onClick={() => setActiveTab('project')}>Projects</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts
                .filter(post => activeTab === 'all' || post.tags.includes(activeTab))
                .map((post, index) => (
                  <motion.div key={post.id} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                    <Card className="h-full flex flex-col bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Sparkles className="h-5 w-5 text-indigo-500" />
                          <span>{post.title}</span>
                        </CardTitle>
                        <CardDescription>
                          {post.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center mr-2 px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-xs font-medium text-indigo-800 dark:text-indigo-200 rounded-full">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-300">{post.content.substring(0, 100)}...</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="w-full">Read More</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div initial="initial" animate="animate" variants={fadeInUp}>
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">No thoughts found. Try a different search term or category.</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}