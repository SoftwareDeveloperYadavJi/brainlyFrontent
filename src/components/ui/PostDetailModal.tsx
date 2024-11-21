import { FC } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'

interface Post {
  _id: string
  title: string
  content: string
  tags: string
  link: string
}

interface ModalProps {
  isOpen: boolean
  post: Post | null
  onClose: () => void
}

const PostDetailModal: FC<ModalProps> = ({ isOpen, post, onClose }) => {
  if (!isOpen || !post) return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-3/4 md:w-1/2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</h2>
          <Button variant="link" onClick={onClose}>
            <X className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </Button>
        </div>
        <CardContent className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">{post.content}</p>
        </CardContent>
        <CardFooter className="mt-4">
          <a
            href={post.link.startsWith('http://') || post.link.startsWith('https://') ? post.link : `https://${post.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            <Button variant="outline" size="sm">Read More</Button>
          </a>
        </CardFooter>
      </div>
    </div>
  )
}

export default PostDetailModal
