"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Crown,
  Trash2,
  MoreVertical,
  Search,
  Filter,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

// Mock team data
const mockTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "SUPER_ADMIN",
    avatar: null,
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2 minutes ago",
    portfolios: 3,
    nfcCards: 5,
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "TEAM_LEADER",
    avatar: null,
    status: "active",
    joinedAt: "2024-02-01",
    lastActive: "1 hour ago",
    portfolios: 2,
    nfcCards: 3,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "TEAM_MEMBER",
    avatar: null,
    status: "active",
    joinedAt: "2024-02-15",
    lastActive: "3 hours ago",
    portfolios: 1,
    nfcCards: 2,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "TEAM_MEMBER",
    avatar: null,
    status: "invited",
    joinedAt: "2024-03-01",
    lastActive: "Never",
    portfolios: 0,
    nfcCards: 0,
  },
]

const recentActivity = [
  {
    id: "1",
    user: "Sarah Smith",
    action: "Created a new portfolio",
    timestamp: "2 hours ago",
    type: "create",
  },
  {
    id: "2",
    user: "Mike Johnson",
    action: "Updated NFC card settings",
    timestamp: "5 hours ago",
    type: "update",
  },
  {
    id: "3",
    user: "John Doe",
    action: "Invited Emily Davis to team",
    timestamp: "1 day ago",
    type: "invite",
  },
  {
    id: "4",
    user: "Sarah Smith",
    action: "Generated AI content",
    timestamp: "2 days ago",
    type: "ai",
  },
]

const roleColors = {
  SUPER_ADMIN: "from-[#F59E0B] to-[#EF4444]",
  TEAM_LEADER: "from-[#3B82F6] to-[#06B6D4]",
  TEAM_MEMBER: "from-[#10B981] to-[#06B6D4]",
}

const roleIcons = {
  SUPER_ADMIN: Crown,
  TEAM_LEADER: Shield,
  TEAM_MEMBER: Users,
}

const roleLabels = {
  SUPER_ADMIN: "Super Admin",
  TEAM_LEADER: "Team Leader",
  TEAM_MEMBER: "Team Member",
}

const RoleBadge = ({ role }: { role: keyof typeof roleColors }) => {
  const Icon = roleIcons[role]
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${roleColors[role]} text-white text-xs font-medium`}
    >
      <Icon className="w-3 h-3" />
      {roleLabels[role]}
    </div>
  )
}

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<keyof typeof roleColors>(
    "TEAM_MEMBER"
  )

  const filteredMembers = mockTeamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Team{" "}
          <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
            Management
          </span>
        </h1>
        <p className="text-muted-foreground">
          Manage your team members, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#06B6D4] to-[#3B82F6]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] shadow-lg w-fit mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Members</p>
            <p className="text-3xl font-bold">4</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#10B981] to-[#06B6D4]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-lg w-fit mb-4">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Active</p>
            <p className="text-3xl font-bold">3</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#F59E0B] to-[#06B6D4]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#06B6D4] shadow-lg w-fit mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Pending Invites</p>
            <p className="text-3xl font-bold">1</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]" />
          <div className="relative z-10">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] shadow-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground mb-1">Team Leaders</p>
            <p className="text-3xl font-bold">1</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
          >
            {/* Search & Actions */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                />
              </div>
              <button className="p-2.5 rounded-xl bg-card border border-border/50 hover:bg-background transition-all">
                <Filter className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2.5 rounded-xl font-medium bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                Invite Member
              </button>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border border-border/50 hover:border-[#06B6D4]/50 bg-card/30 transition-all"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {member.name.charAt(0)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate">{member.name}</h4>
                        {member.status === "invited" && (
                          <span className="px-2 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-xs">
                            Invited
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {member.email}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {member.lastActive}
                        </span>
                        <span>{member.portfolios} portfolios</span>
                        <span>{member.nfcCards} cards</span>
                      </div>
                    </div>

                    {/* Role & Actions */}
                    <div className="flex items-center gap-3">
                      <RoleBadge role={member.role as keyof typeof roleColors} />
                      <button className="p-2 rounded-lg hover:bg-background/50 transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Permission Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Permissions</h3>
            <div className="space-y-3">
              {[
                { role: "SUPER_ADMIN", permissions: "All access + user management" },
                { role: "TEAM_LEADER", permissions: "Team management + analytics" },
                { role: "TEAM_MEMBER", permissions: "Portfolio & cards only" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-gradient-to-r from-background/50 to-card/50 border border-border/30"
                >
                  <RoleBadge role={item.role as keyof typeof roleColors} />
                  <p className="text-xs text-muted-foreground mt-2">
                    {item.permissions}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#06B6D4]" />
              <h3 className="text-lg font-semibold">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="pb-3 border-b border-border/30 last:border-0 last:pb-0"
                >
                  <p className="text-sm font-medium mb-1">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowInviteModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Invite Team Member</h2>
              <p className="text-muted-foreground">
                Send an invitation to join your team
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="colleague@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <div className="space-y-2">
                  {(["TEAM_MEMBER", "TEAM_LEADER"] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setInviteRole(role)}
                      className={`w-full p-3 rounded-xl border-2 transition-all text-left ${
                        inviteRole === role
                          ? "border-[#06B6D4] bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10"
                          : "border-border/50 hover:border-border"
                      }`}
                    >
                      <RoleBadge role={role} />
                      <p className="text-xs text-muted-foreground mt-2">
                        {role === "TEAM_LEADER"
                          ? "Can manage team and view analytics"
                          : "Can manage own portfolio and cards"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-6 py-3 rounded-xl font-medium bg-card border border-border/50 text-foreground hover:bg-background transition-all"
              >
                Cancel
              </button>
              <button className="flex-1 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg hover:shadow-xl transition-all">
                Send Invite
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
