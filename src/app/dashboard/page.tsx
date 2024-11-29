'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle, Settings } from 'lucide-react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'

interface Content {
  _id: string
  title: string
  description: string
  content: string
  link: string
  tags: string
}


const logoutHande = () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}

export default function Dashboard() {
  const [isSharing, setIsSharing] = useState(false)  // State to track sharing status
  const [contentList, setContentList] = useState<Content[]>([])
  const [newContent, setNewContent] = useState<Content>({
    _id: '',
    title: '',
    description: '',
    content: '',
    link: '',
    tags: '',
  })

  const [selectedContent, setSelectedContent] = useState<Content | null>(null) // For Modal
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state

  const router = useRouter()

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')

    } else {
      fetchContent()
      fetchSharingStatus() // Fetch brain sharing status when user is logged in
    }
  }, [router])

  // Fetch current sharing status from the API
  const fetchSharingStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/currentSharingStatus', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch sharing status: ${response.statusText}`)
      }

      const data = await response.json()
      if (data.isBrainShared !== undefined) {
        setIsSharing(data.isBrainShared) // Set the switch based on the fetched status
      }
    } catch (error) {
      console.error('Error fetching sharing status:', error)
    }
  }

  // Fetch content from the backend API
  const fetchContent = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/getcontent', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch content: ${response.statusText}`)
      }

      const data = await response.json()
      if (data && data.brain) {
        setContentList(data.brain)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  // Add new content
  const handleAddContent = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      console.log(newContent);
      const response = await fetch('http://localhost:3001/content/newbrain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },

        body: JSON.stringify(newContent),
      })

      if (response.ok) {
        setNewContent({
          _id: '',
          title: '',
          description: '',
          content: '',
          link: '',
          tags: '',
        })
        fetchContent()
      } else {
        console.error('Failed to add content')
      }
    } catch (error) {
      console.error('Error adding content:', error)
    }
  }

  // Toggle brain sharing
  const handleShareToggle = async (checked: boolean) => {
    try {
      const response = await fetch('http://localhost:3001/user/braintoggle', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isSharing: checked }),
      })

      if (response.ok) {
        setIsSharing(checked) // Update the sharing state
        console.log('Brain sharing toggled successfully')
      } else {
        console.error('Failed to toggle sharing')
      }
    } catch (error) {
      console.error('Error toggling brain sharing', error)
    }
  }

  // Open modal to show content details
  const openModal = (content: Content) => {
    setSelectedContent(content)
    setIsModalOpen(true)
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContent(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Second Brain</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={logoutHande}>
              Logout
            </Button>
            <Link href="/settings">
              <Button variant="ghost">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Add New Content Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Content</CardTitle>
              <CardDescription>Save and manage your social media content</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleAddContent}>
                {/* Title */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newContent.title}
                    onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    placeholder="Enter a title for your content"
                  />
                </div>
                {/* Description */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newContent.description}
                    onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                    placeholder="Enter a brief description"
                  />
                </div>
                {/* Content */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newContent.content}
                    onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                    placeholder="Paste or type your content here"
                  />
                </div>
                {/* Tags */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={newContent.tags}
                    onChange={(e) => setNewContent({ ...newContent, tags: e.target.value })}
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                {/* Link */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="link">Link</Label>
                  <Input
                    id="link"
                    value={newContent.link}
                    onChange={(e) => setNewContent({ ...newContent, link: e.target.value })}
                    placeholder="Enter the original content link"
                  />
                </div>
                {/* Submit Button */}
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Save Content
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Saved Content List */}
          <div className="mt-8">
            <div className="mt-8 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Saved Content</h2>
              <div className="flex items-center space-x-2">
                <Switch
                  id="share-brain"
                  checked={isSharing}
                  onCheckedChange={(checked) => handleShareToggle(checked)}
                />
                <Label htmlFor="share-brain">Share My Brain</Label>
              </div>
            </div>

            {isSharing && (
              <div className="mt-4 p-4 bg-green-100 rounded-md">
                <p className="text-green-800">
                  Your brain is now public! Share this link:
                  <span className="font-bold ml-2">https://secondbrain.app/username</span>
                </p>
              </div>
            )}

            {contentList.length > 0 ? (
              <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {contentList.map((content) => (
                  <Card
                    key={content._id}
                    className="h-64 overflow-hidden flex flex-col"
                    onClick={() => openModal(content)}
                  >
                    <CardHeader>
                      <CardTitle>{content.title}</CardTitle>
                      <CardDescription>{content.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden text-ellipsis">
                      <p className="text-sm text-gray-600">{content.content}</p>
                    </CardContent>
                    <CardContent className="flex-grow overflow-hidden text-ellipsis">

                      <p className="text-sm text-gray-600">{content.tags}</p>
                    </CardContent>
                    <CardFooter>
                      <a
                        href={content.link.startsWith('http://') || content.link.startsWith('https://') ? content.link : `https://${content.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        {content.link}
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No content found.</p>
            )}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md max-w-lg w-full">
            <h2 className="text-2xl font-bold">{selectedContent.title}</h2>
            <p className="text-sm text-gray-600">{selectedContent.description}</p>
            <div className="my-4">
              <h3 className="font-semibold">Content:</h3>
              <p>{selectedContent.content}</p>
            </div>
            <div className="my-4">
              <h3 className="font-semibold">Tags:</h3>
              <p>{selectedContent.tags}</p>
            </div>
            <div className="my-4">
              <h3 className="font-semibold">Link:</h3>
              <a
                href={selectedContent.link.startsWith('http://') || selectedContent.link.startsWith('https://') ? selectedContent.link : `https://${selectedContent.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {selectedContent.link}
              </a>
            </div>
            <Button variant="outline" onClick={closeModal} className="mt-4 w-full">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
