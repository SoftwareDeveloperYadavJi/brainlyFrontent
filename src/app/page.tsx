'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Bookmark, Tag, Share2, Lock, Menu } from 'lucide-react'
import router from 'next/router'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleLoginRedirect = () => {
    router.push('/login') // Redirect to the /login page
  }



  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">Second Brain</span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a></li>

              </ul>
            </nav>
            <div className="hidden md:block">


              <Link href="/login"><Button className="mr-4" >Get Started</Button></Link>

            </div>
            <div className="md:hidden">
              <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <ul className="flex flex-col items-start space-y-4">
            <li><a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</a></li>
            <li><a href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</a></li>
            <li><Link href='/login'><Button  className="w-full">Log in</Button></Link></li>
           

          </ul>
        </div>
      )}

      <main>
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <h1 className="text-4xl font-bold mb-6">Your Social Media Content, Organized and Shareable</h1>
            <p className="text-xl mb-8 text-gray-600">
              Second Brain helps you save, manage, and share your social media content effortlessly.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
              <Button size="lg" variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-50">Learn More</Button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Bookmark className="h-8 w-8 text-indigo-600" />, title: "Save Posts", description: "Easily save posts with titles, descriptions, and content." },
                { icon: <Tag className="h-8 w-8 text-indigo-600" />, title: "Organize with Tags", description: "Add custom tags to categorize and find your content quickly." },
                { icon: <Share2 className="h-8 w-8 text-indigo-600" />, title: "Share Your Brain", description: "Publicly share selected content with a simple toggle." },
                { icon: <Lock className="h-8 w-8 text-indigo-600" />, title: "Privacy Control", description: "Easily privatize content when you need to." },
                { icon: <Brain className="h-8 w-8 text-indigo-600" />, title: "Your Second Brain", description: "Access your curated content anytime, anywhere." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-gray-900">
                        {feature.icon}
                        <span>{feature.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How 'Share My Brain' Works</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ol className="space-y-6">
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-4">1</span>
                    <div>
                      <h3 className="font-semibold mb-1">Save Your Content</h3>
                      <p className="text-gray-600">Add posts, articles, and ideas to your Second Brain.</p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-4">2</span>
                    <div>
                      <h3 className="font-semibold mb-1">Organize and Tag</h3>
                      <p className="text-gray-600">Categorize your content with custom tags for easy retrieval.</p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-4">3</span>
                    <div>
                      <h3 className="font-semibold mb-1">Toggle Sharing</h3>
                      <p className="text-gray-600">Choose which content to make public with a simple switch.</p>
                    </div>
                  </motion.li>
                  <motion.li
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold mr-4">4</span>
                    <div>
                      <h3 className="font-semibold mb-1">Share Your Brain</h3>
                      <p className="text-gray-600">Get a unique link to your public content to share with others.</p>
                    </div>
                  </motion.li>
                </ol>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/placeholder.svg?height=400&width=400" alt="Share My Brain Illustration" className="w-full h-auto rounded-lg shadow-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { name: "Alex Johnson", role: "Content Creator", content: "Second Brain has transformed how I manage my social media content. It's like having a personal assistant for my online presence." },
                { name: "Sarah Lee", role: "Digital Marketer", content: "The ability to easily share curated content with my team and clients has been a game-changer. Second Brain streamlines my workflow incredibly." },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar>
                          <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-indigo-600 text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Organize Your Online Content?</h2>
            <p className="text-xl mb-8">Join thousands of content creators and social media enthusiasts who are already using Second Brain.</p>
            <form className="flex flex-col md:flex-row gap-4 justify-center">
              <Input type="email" placeholder="Enter your email" className="md:w-64 bg-white text-gray-900 border-transparent" />
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">Start Your Free Trial</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-12 text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Guides</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p>&copy; 2024 Second Brain. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}