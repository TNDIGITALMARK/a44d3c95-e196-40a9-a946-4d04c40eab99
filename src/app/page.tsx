'use client'

import { useState } from 'react'
import { Heart, MessageCircle, Share2, Plus, Home, Users, Bell, Mail, User, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default function Ronim() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👩‍💻',
      time: '2h ago',
      content: 'Just launched my new portfolio website! So excited to share my work with the world. 🚀',
      likes: 24,
      comments: 8,
      image: null,
      liked: false,
      userComments: []
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: '👨‍🎨',
      time: '4h ago',
      content: 'Beautiful sunset from my hiking trip this weekend. Nature never ceases to amaze me! 🌅',
      likes: 156,
      comments: 23,
      image: '🌅',
      liked: false,
      userComments: []
    },
    {
      id: 3,
      author: 'Alex Rivera',
      avatar: '👨‍💼',
      time: '6h ago',
      content: 'Team meeting went great today! We are making amazing progress on our new project. Collaboration is key! 💼',
      likes: 42,
      comments: 12,
      image: null,
      liked: false,
      userComments: []
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [commentInputs, setCommentInputs] = useState({})
  const [showComments, setShowComments] = useState({})
  
  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'You',
        avatar: '😊',
        time: 'now',
        content: newPost,
        likes: 0,
        comments: 0,
        image: null,
        liked: false,
        userComments: []
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const handleComment = (postId) => {
    const commentText = commentInputs[postId]
    if (commentText && commentText.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: post.userComments.length + 1,
            text: commentText,
            author: 'You',
            avatar: '😊',
            time: 'now'
          }
          return {
            ...post,
            userComments: [...post.userComments, newComment],
            comments: post.comments + 1
          }
        }
        return post
      }))
      setCommentInputs({...commentInputs, [postId]: ''})
    }
  }

  const toggleComments = (postId) => {
    setShowComments({...showComments, [postId]: !showComments[postId]})
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Image src="/generated/ronim-logo.png" alt="Ronim Logo" width={120} height={40} className="h-8 w-auto" />
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search Ronim..."
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-6">
            <Home className="h-6 w-6 text-primary" />
            <Link href="/friends">
              <Users className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </Link>
            <Bell className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            <Mail className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            <Link href="/profile">
              <User className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </Link>
            <Link 
              href="/login"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">😊</div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-3 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex space-x-2">
                      <button className="text-muted-foreground hover:text-primary">📷</button>
                      <button className="text-muted-foreground hover:text-primary">😊</button>
                      <button className="text-muted-foreground hover:text-primary">📍</button>
                    </div>
                    <button
                      onClick={handlePostSubmit}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-lg border">
                {/* Post Header */}
                <div className="p-4 flex items-start space-x-3">
                  <div className="text-2xl">{post.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{post.author}</h3>
                      <span className="text-muted-foreground text-sm">•</span>
                      <span className="text-muted-foreground text-sm">{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                  <p className="text-foreground">{post.content}</p>
                  {post.image && (
                    <div className="mt-3 text-6xl text-center py-8 bg-muted rounded-lg">
                      {post.image}
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="px-4 pb-4 border-t bg-muted/20">
                    {/* Existing Comments */}
                    {post.userComments.length > 0 && (
                      <div className="space-y-3 mb-4 pt-4">
                        {post.userComments.map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="text-sm">{comment.avatar}</div>
                            <div className="flex-1 bg-muted rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="text-sm">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Add Comment */}
                    <div className="flex items-center space-x-3 pt-4">
                      <div className="text-sm">😊</div>
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({...commentInputs, [post.id]: e.target.value})}
                          onKeyDown={(e) => e.key === 'Enter' && handleComment(post.id)}
                          className="flex-1 px-3 py-2 bg-background rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <button 
                          onClick={() => handleComment(post.id)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-colors"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="bg-card rounded-lg border p-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">😊</div>
                <div>
                  <h3 className="font-semibold">Welcome to Ronim!</h3>
                  <p className="text-sm text-muted-foreground">Connect with friends and share your moments</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-semibold mb-3">Your Activity</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friends</span>
                  <span>284</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Following</span>
                  <span>156</span>
                </div>
              </div>
            </div>

            {/* Suggested Friends */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="font-semibold mb-3">People you may know</h3>
              <div className="space-y-3">
                {[
                  { name: 'Emma Wilson', avatar: '👩‍🎓', mutualFriends: 12 },
                  { name: 'David Kim', avatar: '👨‍🔬', mutualFriends: 8 },
                  { name: 'Lisa Garcia', avatar: '👩‍🎨', mutualFriends: 15 }
                ].map((person, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{person.avatar}</span>
                      <div>
                        <p className="text-sm font-medium">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.mutualFriends} mutual friends</p>
                      </div>
                    </div>
                    <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}