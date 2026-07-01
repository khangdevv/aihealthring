'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HeartPulse, Moon, BrainCircuit, Activity } from 'lucide-react'
import FeatureCard from './FeatureCard'

const features = [
  {
    icon: HeartPulse,
    title: 'Đo nhịp tim & SpO2',
    description: 'Theo dõi liên tục 24/7 độ bão hòa oxy trong máu và nhịp tim, cảnh báo ngay khi có chỉ số bất thường.',
  },
  {
    icon: Moon,
    title: 'Theo dõi giấc ngủ sâu',
    description: 'Phân tích các giai đoạn ngủ sâu, ngủ nông, REM và chấm điểm chất lượng giấc ngủ vào mỗi buổi sáng.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Gợi ý cá nhân hoá',
    description: 'Trí tuệ nhân tạo học hỏi thói quen của bạn để đưa ra lời khuyên nghỉ ngơi hay vận động phù hợp mỗi ngày.',
  },
  {
    icon: Activity,
    title: 'Theo dõi hoạt động',
    description: 'Đếm bước chân chính xác, tính lượng calo tiêu thụ và nhắc nhở bạn vận động khi ngồi quá lâu.',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-py" style={{ background: 'var(--color-background)' }}>
      <div className="container-site">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: 'var(--color-sand-500)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Tính năng nổi bật
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-foreground)', marginTop: '0.5rem', lineHeight: 1.3 }}
          >
            Công nghệ nhỏ gọn,<br />
            <span style={{ color: 'var(--color-muted)' }}>sức mạnh khổng lồ.</span>
          </motion.h2>
        </div>

        {/* Layout with Image and Grid */}
        <div className="features-grid">
          
          {/* Left: Ring Image Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            className="features-image-container"
          >
            {/* Background decorative glow for image */}
            <div style={{
              position: 'absolute',
              width: '80%', height: '80%',
              background: 'radial-gradient(circle, var(--color-titanium-200) 0%, transparent 70%)',
              opacity: 0.3,
              filter: 'blur(60px)',
              zIndex: 0,
            }} className="dark:opacity-10" />

            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: 'auto', maxWidth: '400px', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/nhan_xoa_nen.png" 
                alt="PulseRing AI" 
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </motion.div>

          {/* Right: Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            alignContent: 'center',
          }}>
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.1 * index}
              />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 1024px) {
          .features-grid {
            grid-template-columns: 0.9fr 1.1fr; /* Image on left, features on right */
            gap: 4rem;
            align-items: center; /* Ensures perfect vertical centering between columns */
          }
        }
      `}</style>
    </section>
  )
}
