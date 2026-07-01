'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Activity } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 4rem)', // subtract navbar height
        display: 'flex',
        alignItems: 'center',
      }}
      className="section-py"
    >
      {/* Background glow effects */}
      <div 
        style={{
          position: 'absolute', top: '10%', left: '-10%', width: '40%', height: '40%',
          background: 'radial-gradient(circle, var(--color-titanium-200) 0%, transparent 70%)',
          opacity: 0.5,
          filter: 'blur(80px)',
          zIndex: -1,
        }}
        className="dark:opacity-20"
      />
      <div 
        style={{
          position: 'absolute', bottom: '10%', right: '-10%', width: '40%', height: '40%',
          background: 'radial-gradient(circle, var(--color-sand-400) 0%, transparent 70%)',
          opacity: 0.15,
          filter: 'blur(80px)',
          zIndex: -1,
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 10 }}>
        <div 
          className="hero-grid"
        >
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {/* Badge */}
            <div style={{ alignSelf: 'flex-start' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', borderRadius: '9999px',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-foreground)',
              }}>
                <span style={{ color: 'var(--color-sand-500)' }}><Activity size={14} /></span>
                New Arrival 2026
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--color-foreground)'
            }}>
              Sức khỏe của bạn, <br />
              <span className="gradient-text">gọn trong một chiếc nhẫn.</span>
            </h1>

            <p style={{ 
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)', 
              lineHeight: 1.6, 
              color: 'var(--color-muted)',
              maxWidth: '32rem'
            }}>
              Theo dõi nhịp tim, giấc ngủ và vận động 24/7. AI cá nhân hoá gợi ý mỗi ngày, giúp bạn sống khỏe hơn từng khoảnh khắc.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              <Link 
                href="#order"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.75rem', borderRadius: '9999px',
                  background: 'var(--color-foreground)',
                  color: 'var(--color-background)',
                  fontWeight: 600, fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'transform 0.2s, opacity 0.2s',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
              >
                Đặt trước ngay
                <ArrowRight size={16} />
              </Link>
              <Link 
                href="#features"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.875rem 1.75rem', borderRadius: '9999px',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)',
                  fontWeight: 600, fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => { 
                  (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-foreground)'
                }}
                onMouseLeave={(e) => { 
                  (e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                }}
              >
                Khám phá tính năng
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              style={{ position: 'relative', width: '100%', maxWidth: '500px', aspectRatio: '1/1' }}
            >
              <Image 
                src="/hero-ring.png" 
                alt="PulseRing AI - Nhẫn thông minh theo dõi sức khỏe" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 4rem;
          }
        }
      `}</style>
    </section>
  )
}
