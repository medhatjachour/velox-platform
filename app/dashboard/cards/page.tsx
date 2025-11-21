"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  CreditCard,
  Link2,
  QrCode,
  Zap,
  TrendingUp,
  MapPin,
  Download,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Copy,
  Check,
  ShoppingCart,
  Sparkles,
} from "lucide-react"

// Mock NFC cards data
const mockCards = [
  {
    id: "1",
    name: "Primary Card",
    design: "gradient",
    color1: "#06B6D4",
    color2: "#3B82F6",
    linkedPortfolio: true,
    taps: 284,
    status: "active",
    lastTap: "2 hours ago",
  },
  {
    id: "2",
    name: "Business Card",
    design: "solid",
    color1: "#F59E0B",
    color2: "#F59E0B",
    linkedPortfolio: true,
    taps: 156,
    status: "active",
    lastTap: "1 day ago",
  },
]

const cardDesigns = [
  {
    name: "Gradient Cyan",
    from: "#06B6D4",
    to: "#3B82F6",
    pattern: "gradient",
  },
  {
    name: "Gradient Amber",
    from: "#F59E0B",
    to: "#06B6D4",
    pattern: "gradient",
  },
  {
    name: "Gradient Purple",
    from: "#8B5CF6",
    to: "#3B82F6",
    pattern: "gradient",
  },
  {
    name: "Solid Cyan",
    from: "#06B6D4",
    to: "#06B6D4",
    pattern: "solid",
  },
]

const Card3DPreview = ({
  color1,
  color2,
  name,
  rotateX = 0,
  rotateY = 0,
}: {
  color1: string
  color2: string
  name: string
  rotateX?: number
  rotateY?: number
}) => (
  <motion.div
    style={{
      perspective: "1000px",
    }}
    className="w-full h-full"
  >
    <motion.div
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-full"
    >
      {/* Card Front */}
      <div
        className="absolute inset-0 rounded-2xl shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Logo/Brand */}
        <div className="absolute top-6 left-6">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* NFC Icon */}
        <div className="absolute top-6 right-6">
          <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Card Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-white/80 text-sm mb-2">Velox Digital Card</p>
          <p className="text-white font-bold text-lg">{name}</p>
          <div className="flex items-center gap-2 mt-3">
            <div className="h-8 w-12 rounded bg-white/20 backdrop-blur-md" />
            <div className="h-8 w-12 rounded bg-white/20 backdrop-blur-md" />
            <div className="h-8 w-12 rounded bg-white/20 backdrop-blur-md" />
            <div className="h-8 w-12 rounded bg-white/20 backdrop-blur-md" />
          </div>
        </div>

        {/* Shine Effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
          }}
        />
      </div>
    </motion.div>
  </motion.div>
)

const StatCard = ({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: any
  label: string
  value: string
  gradient: string
}) => (
  <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl p-4">
    <div className={`absolute inset-0 opacity-10 ${gradient}`} />
    <div className="relative z-10">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  </div>
)

export default function NFCCardsPage() {
  const [selectedCard, setSelectedCard] = useState(mockCards[0])
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 })
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [copiedQR, setCopiedQR] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setCardRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setCardRotation({ x: 0, y: 0 })
  }

  const handleCopyQR = () => {
    setCopiedQR(true)
    setTimeout(() => setCopiedQR(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          NFC{" "}
          <span className="bg-gradient-to-r from-[#06B6D4] via-[#3B82F6] to-[#F59E0B] bg-clip-text text-transparent">
            Cards
          </span>
        </h1>
        <p className="text-muted-foreground">
          Manage your digital business cards and track interactions
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setShowOrderModal(true)}
          className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Order New Cards
        </button>
        <button className="px-6 py-3 rounded-xl font-medium bg-card/50 backdrop-blur-xl border border-border/50 text-foreground hover:bg-card transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Link Existing Card
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* 3D Card Preview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-1">Card Preview</h3>
              <p className="text-sm text-muted-foreground">
                Hover to interact in 3D
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] text-white hover:shadow-lg transition-all">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Card */}
          <div
            className="aspect-[1.586/1] mb-6 cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <Card3DPreview
              color1={selectedCard.color1}
              color2={selectedCard.color2}
              name={selectedCard.name}
              rotateX={cardRotation.x}
              rotateY={cardRotation.y}
            />
          </div>

          {/* Card Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              icon={Zap}
              label="Total Taps"
              value={selectedCard.taps.toString()}
              gradient="from-[#06B6D4] to-[#3B82F6]"
            />
            <StatCard
              icon={TrendingUp}
              label="This Week"
              value="+24"
              gradient="from-[#10B981] to-[#06B6D4]"
            />
          </div>
        </motion.div>

        {/* Card Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6">Card Settings</h3>

          {/* Link Portfolio */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">
              Linked Portfolio
            </label>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] shadow-lg">
                <Link2 className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Portfolio Active</p>
                <p className="text-sm text-muted-foreground">
                  /p/john-doe
                </p>
              </div>
              <button className="p-2 rounded-lg hover:bg-background/50 transition-all">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* QR Code Fallback */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">
              QR Code Fallback
            </label>
            <div className="p-4 rounded-xl bg-card border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">QR Code URL</span>
                </div>
                <button
                  onClick={handleCopyQR}
                  className="p-1.5 rounded-lg hover:bg-background/50 transition-all"
                >
                  {copiedQR ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center">
                <QrCode className="w-24 h-24 text-black" />
              </div>
              <button className="w-full mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download QR Code
              </button>
            </div>
          </div>

          {/* Card Design Selector */}
          <div>
            <label className="text-sm font-medium mb-3 block">Card Design</label>
            <div className="grid grid-cols-2 gap-3">
              {cardDesigns.map((design, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedCard({
                      ...selectedCard,
                      color1: design.from,
                      color2: design.to,
                    })
                  }
                  className="relative aspect-[1.586/1] rounded-xl overflow-hidden border-2 border-border/50 hover:border-[#06B6D4] transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${design.from} 0%, ${design.to} 100%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      {design.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* My Cards List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8"
      >
        <h3 className="text-xl font-semibold mb-6">My Cards</h3>
        <div className="space-y-4">
          {mockCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCard(card)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedCard.id === card.id
                  ? "border-[#06B6D4] bg-gradient-to-r from-[#06B6D4]/10 to-[#3B82F6]/10"
                  : "border-border/50 hover:border-border"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Mini Card Preview */}
                <div
                  className="w-20 h-14 rounded-lg shadow-md flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${card.color1} 0%, ${card.color2} 100%)`,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </div>

                {/* Card Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{card.name}</h4>
                    {card.linkedPortfolio && (
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white text-xs">
                        Linked
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      {card.taps} taps
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Last tap: {card.lastTap}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-background/50 transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Order Modal */}
      <AnimatePresence>
        {showOrderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#06B6D4] flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Order NFC Cards</h2>
                <p className="text-muted-foreground">
                  Premium metal cards with tap-to-share technology
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl border border-border/50 bg-gradient-to-r from-[#06B6D4]/5 to-[#3B82F6]/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Starter Pack</span>
                    <span className="text-2xl font-bold">$29</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ 2 Premium Metal Cards</li>
                    <li>✓ Custom Design</li>
                    <li>✓ NFC Technology</li>
                    <li>✓ QR Code Fallback</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border-2 border-[#F59E0B] bg-gradient-to-r from-[#F59E0B]/10 to-[#06B6D4]/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      Pro Pack
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white text-xs">
                        Popular
                      </span>
                    </span>
                    <span className="text-2xl font-bold">$49</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ 5 Premium Metal Cards</li>
                    <li>✓ Custom Design</li>
                    <li>✓ NFC Technology</li>
                    <li>✓ QR Code Fallback</li>
                    <li>✓ Priority Support</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-medium bg-card border border-border/50 text-foreground hover:bg-background transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-[#F59E0B] to-[#06B6D4] text-white shadow-lg hover:shadow-xl transition-all">
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
