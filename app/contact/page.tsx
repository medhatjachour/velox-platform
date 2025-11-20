"use client";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Send, Clock, Zap } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 blur-3xl"
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
              <MessageSquare className="w-10 h-10 text-[#06B6D4]" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Let{'\''} s{" "}
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
                Talk
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Questions? Partnerships? Demo requests? We{'\''} re here to help. Usually respond within 2 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>

              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "hello@velox.com",
                  gradient: "from-[#06B6D4] to-[#3B82F6]",
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+1 (555) 123-4567",
                  gradient: "from-[#3B82F6] to-[#8B5CF6]",
                },
                {
                  icon: MapPin,
                  title: "Office",
                  value: "San Francisco, CA",
                  gradient: "from-[#F59E0B] to-[#EF4444]",
                },
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-[#06B6D4]/50 transition-all hover:shadow-xl"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{contact.title}</h3>
                  <p className="text-muted-foreground">{contact.value}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Clock className="w-5 h-5 text-[#06B6D4] mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Response Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Average response: <span className="text-[#06B6D4] font-semibold">2 hours</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Support hours: <span className="font-semibold">24/7</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-12 rounded-3xl bg-gradient-to-br from-[#06B6D4]/10 to-[#3B82F6]/10 border border-[#06B6D4]/20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="inline-block p-6 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] mb-6"
                  >
                    <Zap className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Thanks for reaching out. We{'\''} ll get back to you within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-card border-2 border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all font-semibold"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-3xl bg-card border border-border shadow-2xl">
                  <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Your Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[#06B6D4] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[#06B6D4] focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[#06B6D4] focus:outline-none transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-[#06B6D4] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full py-4 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold text-lg shadow-lg shadow-[#06B6D4]/30 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-sm text-muted-foreground text-center mt-6">
                    We typically respond within 2 hours during business hours.
                  </p>
                </form>
              )}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Sales Inquiries",
                description: "Interested in Pro or Enterprise? Let's talk pricing and features.",
                cta: "Contact Sales",
                gradient: "from-[#06B6D4] to-[#3B82F6]",
              },
              {
                title: "Support",
                description: "Need help with your account? Our support team is here 24/7.",
                cta: "Get Support",
                gradient: "from-[#3B82F6] to-[#8B5CF6]",
              },
              {
                title: "Partnerships",
                description: "Want to integrate with Velox? Let's build something together.",
                cta: "Partner With Us",
                gradient: "from-[#F59E0B] to-[#EF4444]",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-[#06B6D4]/50 transition-all hover:shadow-xl"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{item.description}</p>
                <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${item.gradient} text-white font-semibold hover:shadow-lg transition-all`}>
                  {item.cta}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
