'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StoryCardProps {
  time: string
  title: string
  description: string
  icon: LucideIcon
  align: 'left' | 'right'
  delay?: number
}

export default function StoryCard({ time, title, description, icon: Icon, align, delay = 0 }: StoryCardProps) {
  // Translate direction based on alignment
  const initialX = align === 'left' ? -50 : 50

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`story-card-wrapper ${align}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
      }}
    >
      <div 
        className="glass"
        style={{
          padding: '2rem',
          borderRadius: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          position: 'relative',
          background: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ 
            width: '3rem', height: '3rem', borderRadius: '50%', 
            background: 'var(--color-titanium-100)', color: 'var(--color-titanium-800)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }} className="dark:bg-titanium-800 dark:text-titanium-100">
            <Icon size={20} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-foreground)', letterSpacing: '-0.02em' }}>
            {time}
          </span>
        </div>
        
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: '0.5rem' }}>
            {title}
          </h3>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
