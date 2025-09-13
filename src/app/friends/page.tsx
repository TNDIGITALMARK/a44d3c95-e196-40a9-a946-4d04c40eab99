'use client'

import { useState } from 'react'
import { ArrowLeft, Search, UserPlus, UserCheck, MessageCircle, MoreHorizontal, Users } from 'lucide-react'
import Link from 'next/link'

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState('suggestions')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [friends, setFriends] = useState([
    { id: 1, name: 'Sarah Chen', avatar: '👩‍💻', mutualFriends: 12, isConnected: true, status: 'online' },
    { id: 2, name: 'Mike Johnson', avatar: '👨‍🎨', mutualFriends: 8, isConnected: true, status: 'away' },
    { id: 3, name: 'Emily Davis', avatar: '👩‍🎓', mutualFriends: 15, isConnected: true, status: 'offline' },
    { id: 4, name: 'Alex Rivera', avatar: '👨‍💼', mutualFriends: 6, isConnected: true, status: 'online' },
    { id: 5, name: 'Lisa Garcia', avatar: '👩‍🎨', mutualFriends: 22, isConnected: true, status: 'online' }
  ])

  const [suggestions, setSuggestions] = useState([
    { id: 6, name: 'Emma Wilson', avatar: '👩‍🎓', mutualFriends: 12, isConnected: false },
    { id: 7, name: 'David Kim', avatar: '👨‍🔬', mutualFriends: 8, isConnected: false },
    { id: 8, name: 'Jessica Brown', avatar: '👩‍⚕️', mutualFriends: 5, isConnected: false },
    { id: 9, name: 'Ryan Martinez', avatar: '👨‍🎓', mutualFriends: 18, isConnected: false },
    { id: 10, name: 'Amanda Taylor', avatar: '👩‍💼', mutualFriends: 7, isConnected: false }
  ])

  const [requests, setRequests] = useState([
    { id: 11, name: 'Chris Anderson', avatar: '👨‍🎤', mutualFriends: 3, isConnected: false, isRequest: true },
    { id: 12, name: 'Sophie Turner', avatar: '👩‍🎭', mutualFriends: 9, isConnected: false, isRequest: true }
  ])

  const handleConnect = (personId) => {
    setSuggestions(suggestions.map(person =>
      person.id === personId ? { ...person, isConnected: true } : person
    ))
  }

  const handleAcceptRequest = (personId) => {
    const person = requests.find(p => p.id === personId)
    if (person) {
      setFriends([...friends, { ...person, isConnected: true, status: 'online', isRequest: false }])
      setRequests(requests.filter(p => p.id !== personId))
    }
  }

  const handleRejectRequest = (personId) => {
    setRequests(requests.filter(p => p.id !== personId))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'away': return 'bg-yellow-500'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <Link href="/" className="flex items-center space-x-4">
            <ArrowLeft className="h-5 w-5" />
            <h1 className="text-2xl font-bold text-primary">Friends</h1>
          </Link>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto py-6 px-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-primary">{friends.length}</div>
            <div className="text-sm text-muted-foreground">Friends</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{requests.length}</div>
            <div className="text-sm text-muted-foreground">Friend Requests</div>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{suggestions.length}</div>
            <div className="text-sm text-muted-foreground">Suggestions</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'friends', label: 'All Friends', count: friends.length },
              { id: 'requests', label: 'Requests', count: requests.length },
              { id: 'suggestions', label: 'Suggestions', count: suggestions.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'friends' && (
            <>
              {filteredFriends.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No friends found matching your search.' : 'No friends yet. Start connecting!'}
                  </p>
                </div>
              ) : (
                filteredFriends.map((friend) => (
                  <div key={friend.id} className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="text-2xl">{friend.avatar}</div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}></div>
                        </div>
                        <div>
                          <h3 className="font-semibold">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {friend.mutualFriends} mutual friends • {friend.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'requests' && (
            <>
              {requests.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No friend requests at the moment.</p>
                </div>
              ) : (
                requests.map((request) => (
                  <div key={request.id} className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{request.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'suggestions' && (
            <>
              {suggestions.length === 0 ? (
                <div className="text-center py-12">
                  <UserPlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No friend suggestions available.</p>
                </div>
              ) : (
                suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{suggestion.avatar}</div>
                        <div>
                          <h3 className="font-semibold">{suggestion.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {suggestion.mutualFriends} mutual friends
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleConnect(suggestion.id)}
                          className={`px-4 py-2 rounded-lg transition-colors text-sm flex items-center space-x-2 ${
                            suggestion.isConnected
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                          disabled={suggestion.isConnected}
                        >
                          {suggestion.isConnected ? (
                            <>
                              <UserCheck className="h-4 w-4" />
                              <span>Connected</span>
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4" />
                              <span>Connect</span>
                            </>
                          )}
                        </button>
                        <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}