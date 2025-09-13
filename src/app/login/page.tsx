'use client'

import { useState } from 'react'
import { Eye, EyeOff, Users, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would handle authentication
    console.log('Form submitted:', formData)
    // For demo purposes, redirect to home
    window.location.href = '/'
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 dark:from-primary/5 dark:via-purple-950/20 dark:to-pink-950/20 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <h1 className="text-6xl font-bold text-primary mb-6">Ronim</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with friends and the world around you on Ronim.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 bg-background/50 backdrop-blur rounded-full px-4 py-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm">2.5M Users</span>
              </div>
              <div className="flex items-center space-x-2 bg-background/50 backdrop-blur rounded-full px-4 py-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm">10M Likes</span>
              </div>
              <div className="flex items-center space-x-2 bg-background/50 backdrop-blur rounded-full px-4 py-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm">5M Comments</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {['😊', '🌟', '📸', '🎉', '💬', '❤️'].map((emoji, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-background/30 backdrop-blur rounded-lg flex items-center justify-center text-2xl hover:scale-105 transition-transform"
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">
              {isLogin ? 'Welcome Back!' : 'Join Ronim Today'}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create your account and start connecting'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <button className="flex items-center justify-center px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                <span className="text-lg mr-2">🔍</span>
                Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                <span className="text-lg mr-2">📘</span>
                Facebook
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          <div className="text-center mt-4">
            <Link 
              href="/" 
              className="text-sm text-primary hover:underline"
            >
              Continue as Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}