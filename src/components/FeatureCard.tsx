'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '1.25rem',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-4px)'
        el.style.borderColor = 'var(--color-titanium-400)'
        el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.borderColor = 'var(--color-border)'
        el.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: '3rem', height: '3rem',
        borderRadius: '0.75rem',
        background: 'var(--color-background)',
        border: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-foreground)',
      }}>
        <Icon size={20} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}
