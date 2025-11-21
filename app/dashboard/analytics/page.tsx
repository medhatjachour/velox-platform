"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  TrendingUp,
  Users,
  Globe,
  Clock,
  Download,
  Calendar,
  MapPin,
  Zap,
} from "lucide-react"

// Mock data - replace with real API calls
const viewsData = [
  { date: "Jan 15", views: 245, taps: 34 },
  { date: "Jan 16", views: 312, taps: 42 },
  { date: "Jan 17", views: 289, taps: 38 },
  { date: "Jan 18", views: 401, taps: 56 },
  { date: "Jan 19", views: 378, taps: 51 },
  { date: "Jan 20", views: 445, taps: 63 },
  { date: "Jan 21", views: 512, taps: 74 },
]

const locationData = [
  { country: "USA", taps: 145 },
  { country: "UK", taps: 89 },
  { country: "Canada", taps: 67 },
  { country: "Germany", taps: 45 },
  { country: "France", taps: 38 },
]

const deviceData = [
  { name: "Mobile", value: 68, color: "#06B6D4" },
  { name: "Desktop", value: 25, color: "#3B82F6" },
  { name: "Tablet", value: 7, color: "#F59E0B" },
]

const timeData = [
  { hour: "12AM", taps: 5 },
  { hour: "3AM", taps: 2 },
  { hour: "6AM", taps: 8 },
  { hour: "9AM", taps: 24 },
  { hour: "12PM", taps: 45 },
  { hour: "3PM", taps: 52 },
  { hour: "6PM", taps: 38 },
  { hour: "9PM", taps: 28 },
]

const demographicsData = [
  { age: "18-24", value: 145, color: "#06B6D4" },
  { age: "25-34", value: 189, color: "#3B82F6" },
  { age: "35-44", value: 112, color: "#F59E0B" },
  { age: "45-54", value: 67, color: "#10B981" },
  { age: "55+", value: 34, color: "#8B5CF6" },
]

const engagementData = [
  { date: "Week 1", portfolio: 1250, social: 340, contact: 125 },
  { date: "Week 2", portfolio: 1456, social: 398, contact: 156 },
  { date: "Week 3", portfolio: 1689, social: 445, contact: 189 },
  { date: "Week 4", portfolio: 2015, social: 523, contact: 234 },
]

const StatCard = ({
  icon: Icon,
  label,
  value,
  change,
  gradient,
}: {
  icon: any
  label: string
  value: string
  change: string
  gradient: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -4 }}
    className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
  >
    <div className={`absolute inset-0 opacity-10 ${gradient}`} />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm font-medium text-green-500">{change}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </motion.div>
)

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          Analytics{" "}
          <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-muted-foreground">
          Track your portfolio performance and engagement metrics
        </p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-2">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg"
                  : "bg-card/50 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
        <button className="ml-auto px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={TrendingUp}
          label="Total Views"
          value="2,847"
          change="+12.5%"
          gradient="from-[#06B6D4] to-[#3B82F6]"
        />
        <StatCard
          icon={Zap}
          label="NFC Taps"
          value="384"
          change="+8.2%"
          gradient="from-[#F59E0B] to-[#06B6D4]"
        />
        <StatCard
          icon={Users}
          label="New Connections"
          value="156"
          change="+24.1%"
          gradient="from-[#3B82F6] to-[#06B6D4]"
        />
        <StatCard
          icon={Clock}
          label="Avg. Session"
          value="2m 34s"
          change="+5.3%"
          gradient="from-[#10B981] to-[#06B6D4]"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Views & Taps Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Views & Taps</h3>
              <p className="text-sm text-muted-foreground">
                Daily performance metrics
              </p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTaps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#06B6D4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
              <Area
                type="monotone"
                dataKey="taps"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTaps)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Taps by Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Taps by Location</h3>
              <p className="text-sm text-muted-foreground">
                Geographic distribution
              </p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
              <XAxis dataKey="country" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="taps" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Device Breakdown</h3>
              <p className="text-sm text-muted-foreground">Traffic by device type</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#06B6D4] shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Taps by Time of Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Peak Activity Hours</h3>
              <p className="text-sm text-muted-foreground">When users engage most</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#10B981] to-[#06B6D4] shadow-lg">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
              <XAxis dataKey="hour" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="taps"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: "#06B6D4", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Demographics & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Age Demographics</h3>
              <p className="text-sm text-muted-foreground">Audience breakdown</p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] shadow-lg">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={demographicsData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ age, value }) => `${age}: ${value}`}
              >
                {demographicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Engagement Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Engagement Trends</h3>
              <p className="text-sm text-muted-foreground">
                Portfolio vs social vs contact
              </p>
            </div>
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#3B82F6] shadow-lg">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.1} />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid #333",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="portfolio" fill="#06B6D4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="social" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="contact" fill="#F59E0B" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}
