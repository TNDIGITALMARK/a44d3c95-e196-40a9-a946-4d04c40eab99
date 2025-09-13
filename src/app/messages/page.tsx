'use client'

import { useState } from 'react'
import { ArrowLeft, Search, Phone, Video, MoreHorizontal, Send, Smile, Paperclip, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Messages() {
  const [conversations] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: '👩‍💻',
      lastMessage: 'Thanks for sharing your portfolio! It looks amazing.',
      time: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: '👨‍🎨',
      lastMessage: 'The hiking photos are incredible! Where was this taken?',
      time: '15m ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Alex Rivera',
      avatar: '👨‍💼',
      lastMessage: 'Great job on the project presentation today!',
      time: '1h ago',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: '👩‍🎓',
      lastMessage: 'Hey! Would love to catch up soon',
      time: '2h ago',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'David Kim',
      avatar: '👨‍🔬',
      lastMessage: 'The research findings are fascinating!',
      time: '1d ago',
      unread: 0,
      online: true
    }
  ])

  const [selectedChat, setSelectedChat] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Chen',
      content: 'Hey! How are you doing?',
      time: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      sender: 'You',
      content: 'I\'m doing great! Just finished working on my portfolio.',
      time: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Chen',
      content: 'That\'s awesome! I\'d love to take a look at it.',
      time: '10:33 AM',
      isOwn: false
    },
    {
      id: 4,
      sender: 'You',
      content: 'Sure! Here\'s the link: www.myportfolio.com',
      time: '10:35 AM',
      isOwn: true
    },
    {
      id: 5,
      sender: 'Sarah Chen',
      content: 'Thanks for sharing your portfolio! It looks amazing.',
      time: '10:36 AM',
      isOwn: false
    }
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <ArrowLeft className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </Link>
            <div className="flex items-center space-x-2">
              <Image src="/generated/ronim-logo.png" alt="Ronim Logo" width={120} height={40} className="h-8 w-auto" />
            </div>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold">Messages</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full border-x">
          {/* Conversations List */}
          <div className="border-r bg-card/50">
            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="overflow-y-auto">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  className={`flex items-center space-x-3 p-4 hover:bg-muted/50 cursor-pointer border-b ${
                    selectedChat.id === conversation.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="text-2xl">{conversation.avatar}</div>
                    {conversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <div className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b bg-card/50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="text-2xl">{selectedChat.avatar}</div>
                  {selectedChat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedChat.online ? 'Online' : 'Last seen 2h ago'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Video className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <MoreHorizontal className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-card/50">
              <div className="flex items-end space-x-2">
                <div className="flex items-center space-x-2">
                  <Paperclip className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                  <ImageIcon className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 pr-12 bg-muted rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    rows={1}
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                  <Smile className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer" />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}