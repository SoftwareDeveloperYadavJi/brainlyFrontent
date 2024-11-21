'use client'

import { useState, ChangeEvent, FormEvent } from "react"
import { useRouter } from "next/navigation" // Use Next.js router for navigation
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Define the shape of the form data
interface FormData {
  name: string
  username: string
  email: string
  password: string
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string>("")
  const router = useRouter()

  // Handle input changes dynamically
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Handle form submission
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    setError("") // Clear any existing errors

    try {
      const endpoint = isLogin
        ? "http://10.53.3.24:3001/user/login"
        : "http://10.53.3.24:3001/user/register"

      // Construct the payload correctly based on whether it's login or registration
      const payload = isLogin
        ? {
          username: formData.username, // Username for login
          password: formData.password, // Password for login
        }
        : {
          name: formData.name, // Name for registration
          username: formData.username, // Username for registration
          email: formData.email, // Email for registration
          password: formData.password, // Password for registration
        }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the correct payload
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      if (isLogin) {
        // Store the JWT token in localStorage after successful login
        localStorage.setItem("token", result.token)

        // Redirect to the dashboard after login
        router.push("/dashboard")
      } else {
        // After successful registration, switch to the login view
        setIsLogin(true)
      }
    } catch (err: unknown) {
      // Ensure error handling works with any error type
      setError((err as Error).message)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back to your Second Brain" : "Create Your Second Brain Account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {/* Only show the Name and Email inputs for registration */}
              {!isLogin && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name" // Correctly mapped to `formData.name`
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email" // Correctly mapped to `formData.email`
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username" // Correctly mapped to `formData.username`
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password" // Correctly mapped to `formData.password`
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </form>

        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit" onClick={handleSubmit}>
            {isLogin ? "Login" : "Register"}
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button variant="link" className="p-0 ml-1" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
