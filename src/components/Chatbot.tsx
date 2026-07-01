'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

type Message = {
  id: string
  role: 'bot' | 'user'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: 'Xin chào! Mình là tư vấn viên của PulseRing AI. Mình có thể giúp gì cho bạn?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })

      const data = await res.json()
      
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: data.reply }
      setMessages(prev => [...prev, botMsg])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', content: 'Xin lỗi, hiện tại mình đang bận. Vui lòng thử lại sau nhé!' }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 90,
              width: '3.5rem', height: '3.5rem', borderRadius: '50%',
              background: 'var(--color-foreground)', color: 'var(--color-background)',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
          >
            <MessageCircle size={24} />
            <span style={{
              position: 'absolute', top: 0, right: 0, width: '12px', height: '12px',
              background: '#ef4444', borderRadius: '50%', border: '2px solid var(--color-background)'
            }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 95,
              width: '350px', height: '500px', maxHeight: 'calc(100vh - 4rem)',
              background: 'var(--color-surface)', borderRadius: '1.25rem',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
              border: '1px solid var(--color-border)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
            className="chatbot-window"
          >
            {/* Header */}
            <div style={{
              padding: '1rem', background: 'var(--color-foreground)', color: 'var(--color-background)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  background: 'var(--color-background)', color: 'var(--color-foreground)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Bot size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: 0 }}>PulseRing AI</h3>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    Trực tuyến
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--color-background)', cursor: 'pointer', opacity: 0.8, padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Body */}
            <div style={{
              flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem',
              background: 'var(--color-background)'
            }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '0.5rem',
                  alignItems: 'flex-end'
                }}>
                  {msg.role === 'bot' && (
                    <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={12} color="var(--color-foreground)" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '75%', padding: '0.75rem 1rem',
                    background: msg.role === 'user' ? 'var(--color-foreground)' : 'var(--color-surface)',
                    color: msg.role === 'user' ? 'var(--color-background)' : 'var(--color-foreground)',
                    borderRadius: msg.role === 'user' ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                    fontSize: '0.875rem', lineHeight: 1.5, border: msg.role === 'bot' ? '1px solid var(--color-border)' : 'none'
                  }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bot size={12} color="var(--color-foreground)" />
                  </div>
                  <div style={{
                    padding: '0.75rem 1rem', background: 'var(--color-surface)', borderRadius: '1rem 1rem 1rem 0',
                    display: 'flex', gap: '0.25rem', border: '1px solid var(--color-border)'
                  }}>
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} style={{ width: '6px', height: '6px', background: 'var(--color-muted)', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} style={{ width: '6px', height: '6px', background: 'var(--color-muted)', borderRadius: '50%' }} />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }} style={{ width: '6px', height: '6px', background: 'var(--color-muted)', borderRadius: '50%' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} style={{
              padding: '0.75rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)',
              display: 'flex', gap: '0.5rem', alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="Nhập câu hỏi của bạn..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1, padding: '0.75rem 1rem', borderRadius: '9999px',
                  border: '1px solid var(--color-border)', background: 'var(--color-background)',
                  color: 'var(--color-foreground)', fontSize: '0.875rem', outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                  background: 'var(--color-foreground)', color: 'var(--color-background)',
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !isLoading ? 'pointer' : 'default',
                  opacity: input.trim() && !isLoading ? 1 : 0.5,
                  transition: 'opacity 0.2s'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 480px) {
          .chatbot-window {
            right: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
