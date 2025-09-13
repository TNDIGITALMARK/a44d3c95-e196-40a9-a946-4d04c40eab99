'use client'

import { useState } from 'react'
import { ArrowLeft, User, Bell, Lock, Palette, Globe, Shield, HelpCircle, LogOut, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Settings() {
  const [activeSection, setActiveSection] = useState('account')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Account Settings
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software developer passionate about creating amazing user experiences.',
    location: 'San Francisco, CA',
    
    // Privacy Settings
    profileVisibility: 'public',
    postVisibility: 'friends',
    allowMessages: 'everyone',
    allowTags: 'friends',
    
    // Notification Settings
    likeNotifications: true,
    commentNotifications: true,
    friendRequestNotifications: true,
    messageNotifications: true,
    emailNotifications: false,
    
    // Appearance Settings
    theme: 'system',
    fontSize: 'medium',
    language: 'en'
  })

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value })
  }

  const settingSections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-6xl">😊</div>
            <div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                Change Avatar
              </button>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG max 2MB</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => handleSettingChange('name', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleSettingChange('email', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={settings.bio}
              onChange={(e) => handleSettingChange('bio', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              value={settings.location}
              onChange={(e) => handleSettingChange('location', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="City, Country"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Profile Visibility</label>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Who can see your posts?</label>
            <select
              value={settings.postVisibility}
              onChange={(e) => handleSettingChange('postVisibility', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="public">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Who can message you?</label>
            <select
              value={settings.allowMessages}
              onChange={(e) => handleSettingChange('allowMessages', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="everyone">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="nobody">Nobody</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { key: 'likeNotifications', label: 'Like notifications', description: 'Get notified when someone likes your posts' },
            { key: 'commentNotifications', label: 'Comment notifications', description: 'Get notified when someone comments on your posts' },
            { key: 'friendRequestNotifications', label: 'Friend request notifications', description: 'Get notified about new friend requests' },
            { key: 'messageNotifications', label: 'Message notifications', description: 'Get notified about new messages' },
            { key: 'emailNotifications', label: 'Email notifications', description: 'Receive notifications via email' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">{notification.label}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[notification.key]}
                  onChange={(e) => handleSettingChange(notification.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {['light', 'dark', 'system'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSettingChange('theme', theme)}
                  className={`p-3 rounded-lg border text-center capitalize ${
                    settings.theme === theme
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-muted hover:bg-muted/80'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
              className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Password & Security</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Change Password</label>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 bg-muted border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Update Password
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
            <p className="text-sm text-muted-foreground mb-3">Add an extra layer of security to your account</p>
            <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case 'account': return renderAccountSettings()
      case 'privacy': return renderPrivacySettings()
      case 'notifications': return renderNotificationSettings()
      case 'appearance': return renderAppearanceSettings()
      case 'security': return renderSecuritySettings()
      case 'help':
        return (
          <div className="text-center py-12">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Help & Support</h3>
            <p className="text-muted-foreground">Contact our support team for assistance</p>
            <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        )
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <ArrowLeft className="h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
            </Link>
            <div className="flex items-center space-x-2">
              <Image src="/generated/ronim-logo.png" alt="Ronim Logo" width={120} height={40} className="h-8 w-auto" />
            </div>
          </div>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-6xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {settingSections.map((section) => {
                const Icon = section.icon
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{section.label}</span>
                  </button>
                )
              })}
              
              <div className="border-t pt-4">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-500 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg border p-6">
              {renderContent()}
            </div>
            
            {activeSection !== 'help' && (
              <div className="mt-6 flex justify-end space-x-2">
                <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}