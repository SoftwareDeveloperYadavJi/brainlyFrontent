'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, Share2, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [isSharing, setIsSharing] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Second Brain</h1>
          <Link href="/settings">
            <Button variant="ghost">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>Add New Content</CardTitle>
              <CardDescription>Save and manage your social media content</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a title for your content" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter a brief description" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Paste or type your content here" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="link">Link</Label>
                  <Input id="link" placeholder="Enter the original content link" />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Save Content
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">My Saved Content</h2>
            <div className="flex items-center space-x-2">
              <Switch
                id="share-brain"
                checked={isSharing}
                onCheckedChange={setIsSharing}
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

          {/* Placeholder for saved content list */}
          <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <CardTitle>Saved Content {item}</CardTitle>
                  <CardDescription>Brief description of the content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Content preview...</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}