'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft, Search, Users, Hash, Heart, MessageCircle, UserPlus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [searchResults, setSearchResults] = useState({
    users: [],
    posts: [],
    hashtags: []
  })

  // Mock data for search results
  const allUsers = [
    { id: 1, name: 'Sarah Chen', username: '@sarahc', avatar: '👩‍💻', bio: 'Frontend Developer | React Enthusiast', followers: 1248, following: 892, verified: true },
    { id: 2, name: 'Mike Johnson', username: '@mikej', avatar: '👨‍🎨', bio: 'Travel Photographer | Nature Lover', followers: 3567, following: 1234, verified: false },
    { id: 3, name: 'Alex Rivera', username: '@alexr', avatar: '👨‍💼', bio: 'Product Manager | Startup Founder', followers: 2156, following: 654, verified: true },
    { id: 4, name: 'Emma Wilson', username: '@emmaw', avatar: '👩‍🎓', bio: 'PhD Student | AI Researcher', followers: 987, following: 543, verified: false },
    { id: 5, name: 'David Kim', username: '@davidk', avatar: '👨‍🔬', bio: 'Data Scientist | ML Engineer', followers: 1876, following: 432, verified: true }
  ]

  const allPosts = [
    { 
      id: 1, 
      author: 'Sarah Chen', 
      avatar: '👩‍💻', 
      content: 'Just launched my new portfolio website! So excited to share my work with the world. #webdev #portfolio',
      likes: 245,
      comments: 28,
      time: '2h ago'
    },
    { 
      id: 2, 
      author: 'Mike Johnson', 
      avatar: '👨‍🎨', 
      content: 'Beautiful sunset from my hiking trip this weekend. Nature never ceases to amaze me! #photography #nature #hiking',
      likes: 1567,
      comments: 89,
      time: '4h ago'
    },
    { 
      id: 3, 
      author: 'Alex Rivera', 
      avatar: '👨‍💼', 
      content: 'Team meeting went great today! We are making amazing progress on our new project. #startup #teamwork',
      likes: 432,
      comments: 67,
      time: '6h ago'
    }
  ]

  const allHashtags = [
    { tag: 'webdev', posts: 15234 },
    { tag: 'photography', posts: 28567 },
    { tag: 'travel', posts: 19876 },
    { tag: 'tech', posts: 34567 },
    { tag: 'nature', posts: 12345 },
    { tag: 'startup', posts: 8976 },
    { tag: 'portfolio', posts: 5432 },
    { tag: 'hiking', posts: 7654 }
  ]

  useEffect(() => {
    if (searchQuery.trim()) {
      // Filter users
      const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )

      // Filter posts
      const filteredPosts = allPosts.filter(post =>
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      )

      // Filter hashtags
      const filteredHashtags = allHashtags.filter(hashtag =>
        hashtag.tag.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setSearchResults({
        users: filteredUsers,
        posts: filteredPosts,
        hashtags: filteredHashtags
      })
    } else {
      setSearchResults({ users: [], posts: [], hashtags: [] })
    }
  }, [searchQuery])

  const getFilteredResults = () => {
    switch (activeTab) {
      case 'users': return { users: searchResults.users, posts: [], hashtags: [] }
      case 'posts': return { users: [], posts: searchResults.posts, hashtags: [] }
      case 'hashtags': return { users: [], posts: [], hashtags: searchResults.hashtags }
      default: return searchResults
    }
  }

  const filteredResults = getFilteredResults()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4 flex-1">
            <Link href="/">
              <ArrowLeft className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </Link>
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Ronim..."
                className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Image src="/generated/ronim-logo.png" alt="Ronim Logo" width={120} height={40} className="h-8 w-auto" />
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Search Tabs */}
        {searchQuery && (
          <div className="flex space-x-4 mb-6 border-b">
            {[
              { id: 'all', label: 'All', count: searchResults.users.length + searchResults.posts.length + searchResults.hashtags.length },
              { id: 'users', label: 'People', count: searchResults.users.length },
              { id: 'posts', label: 'Posts', count: searchResults.posts.length },
              { id: 'hashtags', label: 'Tags', count: searchResults.hashtags.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-1 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="font-medium">{tab.label}</span>
                {tab.count > 0 && (
                  <span className="ml-2 bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Search Results */}
        {!searchQuery ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-semibold mb-2">Search Ronim</h2>
            <p className="text-muted-foreground">Find people, posts, and hashtags</p>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Trending</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allHashtags.slice(0, 8).map((hashtag) => (
                  <button
                    key={hashtag.tag}
                    onClick={() => setSearchQuery(`#${hashtag.tag}`)}
                    className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Hash className="h-4 w-4 text-primary" />
                      <span className="font-medium">#{hashtag.tag}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{hashtag.posts.toLocaleString()} posts</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Users Results */}
            {filteredResults.users.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  People
                </h3>
                <div className="space-y-3">
                  {filteredResults.users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="text-3xl">{user.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold truncate">{user.name}</h4>
                          {user.verified && <span className="text-blue-500">✓</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{user.bio}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>{user.followers.toLocaleString()} followers</span>
                          <span>{user.following.toLocaleString()} following</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        <UserPlus className="h-4 w-4 mr-1 inline" />
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Results */}
            {filteredResults.posts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Posts
                </h3>
                <div className="space-y-4">
                  {filteredResults.posts.map((post) => (
                    <div key={post.id} className="bg-card rounded-lg border">
                      <div className="p-4 flex items-start space-x-3">
                        <div className="text-2xl">{post.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{post.author}</h4>
                            <span className="text-muted-foreground text-sm">•</span>
                            <span className="text-muted-foreground text-sm">{post.time}</span>
                          </div>
                          <p className="text-foreground mt-2">{post.content}</p>
                        </div>
                      </div>
                      <div className="px-4 py-3 border-t flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hashtags Results */}
            {filteredResults.hashtags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Hash className="h-5 w-5 mr-2" />
                  Hashtags
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResults.hashtags.map((hashtag) => (
                    <button
                      key={hashtag.tag}
                      className="p-4 bg-card rounded-lg border hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Hash className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-lg">#{hashtag.tag}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{hashtag.posts.toLocaleString()} posts</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredResults.users.length === 0 && filteredResults.posts.length === 0 && filteredResults.hashtags.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🤷‍♂️</div>
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching for something else or check your spelling
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}