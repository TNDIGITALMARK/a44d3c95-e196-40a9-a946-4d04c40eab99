'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, MessageCircle, Users, UserPlus, Share2, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'like',
      user: 'Sarah Chen',
      avatar: '👩‍💻',
      action: 'liked your post',
      target: 'Just launched my new portfolio website!',
      time: '5m ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: 'Mike Johnson',
      avatar: '👨‍🎨',
      action: 'commented on your post',
      target: 'Beautiful sunset from my hiking trip',
      comment: 'Amazing shot! Where was this taken?',
      time: '15m ago',
      read: false
    },
    {
      id: 3,
      type: 'friend_request',
      user: 'Emma Wilson',
      avatar: '👩‍🎓',
      action: 'sent you a friend request',
      time: '1h ago',
      read: false
    },
    {
      id: 4,
      type: 'share',
      user: 'Alex Rivera',
      avatar: '👨‍💼',
      action: 'shared your post',
      target: 'Team meeting went great today!',
      time: '2h ago',
      read: true
    },
    {
      id: 5,
      type: 'like',
      user: 'David Kim',
      avatar: '👨‍🔬',
      action: 'and 12 others liked your post',
      target: 'The research findings are fascinating!',
      time: '3h ago',
      read: true
    },
    {
      id: 6,
      type: 'comment',
      user: 'Lisa Garcia',
      avatar: '👩‍🎨',
      action: 'replied to your comment',
      target: 'What do you think about the new design?',
      comment: 'I love the color scheme!',
      time: '1d ago',
      read: true
    },
    {
      id: 7,
      type: 'friend_accept',
      user: 'Tom Wilson',
      avatar: '👨‍🎓',
      action: 'accepted your friend request',
      time: '2d ago',
      read: true
    }
  ])

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-red-500" />
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case 'friend_request':
      case 'friend_accept':
        return <UserPlus className="h-4 w-4 text-green-500" />
      case 'share':
        return <Share2 className="h-4 w-4 text-purple-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read
    if (activeTab === 'mentions') return notification.type === 'comment'
    return true // all
  })

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })))
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
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-primary hover:underline"
          >
            Mark all read
          </button>
        </div>
      </header>

      <div className="container max-w-2xl mx-auto py-6 px-4">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          {[
            { id: 'all', label: 'All', count: notifications.length },
            { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
            { id: 'mentions', label: 'Mentions', count: notifications.filter(n => n.type === 'comment').length }
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
                <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-1">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔕</div>
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-4 hover:bg-muted/50 rounded-lg cursor-pointer ${
                  !notification.read ? 'bg-muted/20' : ''
                }`}
                onClick={() => !notification.read && handleMarkAsRead(notification.id)}
              >
                <div className="text-2xl">{notification.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {getNotificationIcon(notification.type)}
                        <p className="text-sm">
                          <span className="font-medium">{notification.user}</span>
                          {' '}
                          <span className="text-muted-foreground">{notification.action}</span>
                          {notification.target && (
                            <span className="text-foreground">
                              {' '}"
                              {notification.target.length > 30 
                                ? notification.target.substring(0, 30) + '...'
                                : notification.target
                              }"
                            </span>
                          )}
                        </p>
                      </div>
                      {notification.comment && (
                        <p className="text-sm text-muted-foreground bg-muted/30 rounded p-2 mt-2">
                          "{notification.comment}"
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      {notification.type === 'friend_request' && !notification.read && (
                        <>
                          <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                            Accept
                          </button>
                          <button className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded hover:bg-muted/80">
                            Decline
                          </button>
                        </>
                      )}
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="text-sm text-primary hover:underline">
              Load more notifications
            </button>
          </div>
        )}
      </div>
    </div>
  )
}