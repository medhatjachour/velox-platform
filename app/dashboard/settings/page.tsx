"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
  CreditCard,
  Trash2,
  Save,
  Camera,
  Check,
  Eye,
  EyeOff,
} from "lucide-react"

type SettingsTab =
  | "profile"
  | "account"
  | "security"
  | "notifications"
  | "appearance"
  | "billing"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [saved, setSaved] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    username: "john-doe",
    bio: "Digital creator & entrepreneur",
    website: "https://johndoe.com",
    location: "San Francisco, CA",
  })

  // Notification state
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    portfolioViews: true,
    nfcTaps: true,
    newConnections: true,
    teamActivity: false,
    productUpdates: true,
    marketingEmails: false,
  })

  // Appearance state
  const [appearance, setAppearance] = useState({
    theme: "system",
    accentColor: "#06B6D4",
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Mail },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "billing", label: "Billing", icon: CreditCard },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Settings{" "}
          <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
            & Preferences
          </span>
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-2 sticky top-8"
          >
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as SettingsTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mb-1 last:mb-0 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </motion.div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8"
          >
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {profile.name.charAt(0)}
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-xl font-medium bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mb-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </button>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Username
                      </label>
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) =>
                          setProfile({ ...profile, username: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        setProfile({ ...profile, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Website
                      </label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) =>
                          setProfile({ ...profile, website: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) =>
                          setProfile({ ...profile, location: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) =>
                        setProfile({ ...profile, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Your email is verified
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/10">
                    <h3 className="text-lg font-semibold mb-2 text-red-500">
                      Danger Zone
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please
                      be certain.
                    </p>
                    <button className="px-4 py-2 rounded-xl font-medium bg-red-500 text-white hover:bg-red-600 transition-all flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 pr-12 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background/50 rounded transition-all"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <Eye className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20">
                    <h3 className="text-lg font-semibold mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 rounded-xl font-medium bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  Notification Preferences
                </h2>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/30"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {key === "emailDigest" &&
                            "Receive daily summary of activity"}
                          {key === "portfolioViews" &&
                            "Get notified when someone views your portfolio"}
                          {key === "nfcTaps" &&
                            "Alert when someone taps your NFC card"}
                          {key === "newConnections" &&
                            "Notification for new connections"}
                          {key === "teamActivity" &&
                            "Updates from your team members"}
                          {key === "productUpdates" &&
                            "New features and improvements"}
                          {key === "marketingEmails" &&
                            "Tips, offers, and recommendations"}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setNotifications({ ...notifications, [key]: !value })
                        }
                        className={`relative w-14 h-8 rounded-full transition-all ${
                          value
                            ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"
                            : "bg-gray-600"
                        }`}
                      >
                        <motion.div
                          animate={{ x: value ? 24 : 2 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === "appearance" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Appearance Settings</h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Theme Preference
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {["light", "dark", "system"].map((theme) => (
                        <button
                          key={theme}
                          onClick={() =>
                            setAppearance({ ...appearance, theme })
                          }
                          className={`p-4 rounded-xl border-2 transition-all capitalize ${
                            appearance.theme === theme
                              ? "border-[#06B6D4] bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          {theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Accent Color
                    </label>
                    <div className="grid grid-cols-6 gap-4">
                      {[
                        "#06B6D4",
                        "#3B82F6",
                        "#F59E0B",
                        "#10B981",
                        "#8B5CF6",
                        "#EF4444",
                      ].map((color) => (
                        <button
                          key={color}
                          onClick={() =>
                            setAppearance({ ...appearance, accentColor: color })
                          }
                          className={`w-full aspect-square rounded-xl border-2 transition-all ${
                            appearance.accentColor === color
                              ? "border-white shadow-lg scale-110"
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: color }}
                        >
                          {appearance.accentColor === color && (
                            <Check className="w-6 h-6 text-white mx-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Billing & Subscription</h2>

                {/* Current Plan */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Pro Plan</h3>
                      <p className="text-muted-foreground">
                        Unlimited portfolios & NFC cards
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">$29</p>
                      <p className="text-sm text-muted-foreground">/month</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-xl font-medium bg-card border border-border/50 hover:bg-background transition-all">
                    Change Plan
                  </button>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="p-4 rounded-xl bg-background/50 border border-border/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">
                          Expires 12/25
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-lg hover:bg-background transition-all">
                      Update
                    </button>
                  </div>
                </div>

                {/* Billing History */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Billing History</h3>
                  <div className="space-y-3">
                    {[
                      { date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
                      { date: "Dec 1, 2023", amount: "$29.00", status: "Paid" },
                      { date: "Nov 1, 2023", amount: "$29.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-background/50 border border-border/30 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">{invoice.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {invoice.amount}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm">
                            {invoice.status}
                          </span>
                          <button className="p-2 rounded-lg hover:bg-background transition-all">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {saved ? "Changes saved successfully!" : "Make sure to save your changes"}
              </p>
              <button
                onClick={handleSave}
                className={`px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 ${
                  saved
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white"
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-5 h-5" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
