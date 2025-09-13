'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Share2, Camera, MapPin, Calendar, Link as LinkIcon, Users, UserPlus } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')

  const userPosts = [
    {
      id: 1,
      content: 'Just finished reading an amazing book about web development! Anyone have recommendations for what to read next? 📚',
      likes: 42,
      comments: 15,
      time: '2h ago',
      image: null
    },
    {
      id: 2,
      content: 'Weekend hiking trip was incredible! The views from the mountain top were absolutely breathtaking. Nature never fails to inspire me. 🏔️',
      likes: 89,
      comments: 23,
      time: '1d ago',
      image: '🏔️'
    },
    {
      id: 3,
      content: 'Working on a new project that I am really excited about. Can not wait to share it with everyone soon! #coding #webdev',
      likes: 156,
      comments: 34,
      time: '3d ago',
      image: null
    }
  ]

  const photos = [
    '📸', '🌅', '🏔️', '🌊', '🌸', '🎨', '📱', '💻', '🌟'
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-4">
            <ArrowLeft className="h-5 w-5" />
            <h1 className="text-2xl font-bold text-primary">Ronim</h1>
          </Link>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-64 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <div className="absolute inset-0 bg-black/20"></div>
          <button className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
            <Camera className="h-5 w-5" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative -mt-20 px-4">
          <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-card border-4 border-background rounded-full flex items-center justify-center text-4xl">
                😊
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">Alex Johnson</h1>
              <p className="text-muted-foreground mt-1">@alexjohnson</p>
              <p className="mt-3 max-w-md">
                Full-stack developer passionate about creating amazing user experiences. 
                Love hiking, photography, and good books! 🚀
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined March 2022</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href="#" className="text-primary hover:underline">alexjohnson.dev</a>
                </div>
              </div>
              <div className="flex gap-6 mt-4 text-sm">
                <div>
                  <span className="font-semibold">1,234</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-semibold">5,678</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Users className="h-4 w-4 inline mr-2" />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4 inline mr-2" />
                    Follow
                  </>
                )}
              </button>
              <button className="px-6 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 px-4">
          <div className="border-b">
            <nav className="flex space-x-8">
              {['posts', 'photos', 'about'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6 px-4 pb-8">
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {userPosts.map((post) => (
                <div key={post.id} className="bg-card rounded-lg border">
                  <div className="p-4 flex items-start space-x-3">
                    <div className="text-2xl">😊</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">Alex Johnson</h3>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-muted-foreground text-sm">{post.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-4 pb-3">
                    <p className="text-foreground">{post.content}</p>
                    {post.image && (
                      <div className="mt-3 text-6xl text-center py-8 bg-muted rounded-lg">
                        {post.image}
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-3 border-t flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span className="text-sm">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center text-4xl hover:bg-muted/80 cursor-pointer transition-colors"
                >
                  {photo}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold mb-4">About Alex</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Bio</h4>
                    <p className="text-muted-foreground">
                      Full-stack developer with 5+ years of experience building web applications. 
                      Passionate about clean code, user experience, and continuous learning. When not coding, 
                      you can find me hiking trails or exploring new coffee shops!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Work</h4>
                    <p className="text-muted-foreground">Senior Developer at TechCorp</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Education</h4>
                    <p className="text-muted-foreground">Computer Science, UC Berkeley</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Web Development', 'Hiking', 'Photography', 'Reading', 'Coffee'].map((interest) => (
                        <span key={interest} className="px-3 py-1 bg-muted rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}