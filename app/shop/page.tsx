"use client";
import { motion } from "framer-motion";
import { CreditCard, Sparkles, Check, ShoppingCart, Zap, Crown, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const products = [
  {
    name: "PVC Card",
    price: 15,
    description: "Perfect for getting started",
    features: [
      "Lightweight & durable",
      "NFC chip (NTAG216)",
      "Custom engraving",
      "Velox logo",
      "Standard shipping",
    ],
    gradient: "from-[#06B6D4] to-[#3B82F6]",
    material: "Premium PVC plastic",
    popular: false,
    image: "🎴",
  },
  {
    name: "Wood Card",
    price: 35,
    description: "Stand out with natural materials",
    features: [
      "Real wood finish",
      "NFC chip (NTAG216)",
      "Custom laser engraving",
      "Eco-friendly",
      "Gift box included",
      "Express shipping",
    ],
    gradient: "from-[#F59E0B] to-[#EF4444]",
    material: "Natural walnut wood",
    popular: true,
    image: "🌳",
  },
  {
    name: "Metal Card",
    price: 85,
    description: "Ultimate premium experience",
    features: [
      "Stainless steel",
      "NFC chip (NTAG216)",
      "Precision CNC engraving",
      "Luxury packaging",
      "Lifetime warranty",
      "White-glove shipping",
      "Priority support",
    ],
    gradient: "from-[#8B5CF6] to-[#EC4899]",
    material: "Brushed stainless steel",
    popular: false,
    image: "✨",
  },
];

const bulkPricing = [
  { quantity: "10-49 cards", discount: "10% off", savings: "~$150" },
  { quantity: "50-99 cards", discount: "20% off", savings: "~$400" },
  { quantity: "100+ cards", discount: "30% off", savings: "~$1,000+" },
];

export default function ShopPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -top-60 -left-60 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 blur-3xl"
      />

      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#3B82F6]/20 mb-8"
            >
              <CreditCard className="w-10 h-10 text-[#06B6D4]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Premium{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                NFC Cards
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Choose your material. We{'\''} ll handle the rest. Ships worldwide in 3-5 days.
            </p>
          </motion.div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative p-8 rounded-3xl bg-card border-2 transition-all ${
                  product.popular
                    ? "border-[#F59E0B] shadow-2xl shadow-[#F59E0B]/20"
                    : selectedCard === product.name
                    ? "border-[#06B6D4]"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white font-bold text-sm shadow-lg flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-bold mb-4`}>
                    {product.material}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-center">{product.name}</h3>
                <p className="text-muted-foreground text-center mb-6">{product.description}</p>

                <div className="text-center mb-8">
                  <span className="text-5xl font-bold">${product.price}</span>
                  <span className="text-muted-foreground ml-2">per card</span>
                </div>

                <div className="space-y-3 mb-8">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 mt-0.5 shrink-0 ${product.popular ? 'text-[#F59E0B]' : 'text-[#06B6D4]'}`} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/auth/onboarding">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCard(product.name)}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      product.popular
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white shadow-lg shadow-[#F59E0B]/30"
                        : "bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white shadow-lg shadow-[#06B6D4]/30"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Order Now</span>
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bulk Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-[#06B6D4]">Bulk</span> Discounts
              </h2>
              <p className="text-xl text-muted-foreground">
                Ordering for your team? Get serious savings on bulk orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {bulkPricing.map((tier, index) => (
                <motion.div
                  key={tier.quantity}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 text-center"
                >
                  <div className="text-3xl font-bold mb-2">{tier.discount}</div>
                  <div className="text-muted-foreground mb-4">{tier.quantity}</div>
                  <div className="text-[#06B6D4] font-semibold">Save {tier.savings}</div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-card border-2 border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all font-semibold"
                >
                  <Crown className="w-5 h-5" />
                  <span>Request Enterprise Quote</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Why Velox Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] border border-[#06B6D4]/20"
          >
            <div className="text-center mb-12">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block p-4 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-6"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Velox Cards?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Not just another NFC card. Velox cards are engineered for performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Tap",
                  description: "Sub-100ms response time. Fastest NFC cards on the market.",
                },
                {
                  icon: Crown,
                  title: "Premium Quality",
                  description: "Hand-inspected. Quality guaranteed. Free replacement if defective.",
                },
                {
                  icon: ShoppingCart,
                  title: "Easy Ordering",
                  description: "Order online. Ships in 24 hours. Worldwide delivery.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                    <feature.icon className="w-8 h-8 text-[#06B6D4]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
