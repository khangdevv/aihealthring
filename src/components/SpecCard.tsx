'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface SpecItem {
  label: string
  value: string
}

interface SpecCardProps {
  title: string
  price: string
  isPro?: boolean
  specs: SpecItem[]
  delay?: number
}

export default function SpecCard({ title, price, isPro = false, specs, delay = 0 }: SpecCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{
        background: isPro ? 'var(--color-surface)' : 'transparent',
        border: `1px solid ${isPro ? 'var(--color-titanium-400)' : 'var(--color-border)'}`,
        borderRadius: '1.5rem',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isPro ? '0 20px 40px rgba(0,0,0,0.05)' : 'none',
      }}
      className={isPro ? 'dark:shadow-2xl' : ''}
    >
      {isPro && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--color-foreground)', color: 'var(--color-background)',
          padding: '0.25rem 1rem', borderBottomLeftRadius: '0.5rem', borderBottomRightRadius: '0.5rem',
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'
        }}>
          Được lựa chọn nhiều nhất
        </div>
      )}

      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: '0.5rem' }}>
          {title}
        </h3>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-foreground)' }}>
          {price}
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {specs.map((spec, index) => (
          <li key={index} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--color-border)',
            gap: '1rem'
          }}>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.9375rem' }}>{spec.label}</span>
            <span style={{ color: 'var(--color-foreground)', fontSize: '0.9375rem', fontWeight: 500, textAlign: 'right' }}>{spec.value}</span>
          </li>
        ))}
      </ul>

      <button style={{
        marginTop: '2.5rem',
        width: '100%',
        padding: '1rem',
        borderRadius: '9999px',
        border: 'none',
        background: isPro ? 'var(--color-foreground)' : 'var(--color-surface)',
        color: isPro ? 'var(--color-background)' : 'var(--color-foreground)',
        fontWeight: 600,
        fontSize: '1rem',
        cursor: 'pointer',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: isPro ? 'transparent' : 'var(--color-border)',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (!isPro) {
          e.currentTarget.style.background = 'var(--color-border)'
        } else {
          e.currentTarget.style.opacity = '0.9'
        }
      }}
      onMouseLeave={(e) => {
        if (!isPro) {
          e.currentTarget.style.background = 'var(--color-surface)'
        } else {
          e.currentTarget.style.opacity = '1'
        }
      }}>
        Chọn phiên bản
      </button>
    </motion.div>
  )
}
