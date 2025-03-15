"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MyGeniusSignupFormProps {
  inviteCode?: string
  onSubmit: (e: React.FormEvent) => void
  email: string
  setEmail: (email: string) => void
  name: string
  setName: (name: string) => void
  password: string
  setPassword: (password: string) => void
  className?: string
}

export default function MyGeniusSignupForm({
  inviteCode = "",
  onSubmit,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  className = "",
}: MyGeniusSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  // Using underscore prefix to indicate intentionally unused setter
  const [isLoading, _setIsLoading] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <Card className={`w-full max-w-md mx-auto shadow-lg ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Create Your Account
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2 group">
            <Label
              htmlFor="email"
              className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
              hover:border-zinc-400 dark:hover:border-zinc-600
              focus:border-zinc-500 dark:focus:border-zinc-500
              transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2 group">
            <Label
              htmlFor="name"
              className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={handleNameChange}
              disabled={isLoading}
              className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
              hover:border-zinc-400 dark:hover:border-zinc-600
              focus:border-zinc-500 dark:focus:border-zinc-500
              transition-all duration-200 shadow-sm"
            />
          </div>

          <div className="space-y-2 group">
            <Label
              htmlFor="password"
              className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                required
                value={password}
                onChange={handlePasswordChange}
                disabled={isLoading}
                minLength={6}
                className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                hover:border-zinc-400 dark:hover:border-zinc-600
                focus:border-zinc-500 dark:focus:border-zinc-500
                transition-all duration-200 shadow-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Must be at least 6 characters</p>
          </div>

          <div className="space-y-2 group">
            <Label htmlFor="inviteCode" className="inline-block transition-colors">
              Invite Code
            </Label>
            <Input
              id="inviteCode"
              type="text"
              placeholder="Enter invite code"
              value={inviteCode}
              readOnly
              className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700
              text-zinc-500 dark:text-zinc-400 font-mono tracking-wider uppercase
              transition-all duration-200 shadow-sm"
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-6 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
            text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
            hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
            focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
            disabled={isLoading}
          >
            Create MyGenius.ID
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

