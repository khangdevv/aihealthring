'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SpecCard from './SpecCard'

const basicSpecs = [
  { label: 'Chất liệu', value: 'Thép không gỉ' },
  { label: 'Thời lượng pin', value: '5 ngày/lần sạc' },
  { label: 'Kháng nước', value: '5ATM' },
  { label: 'Kết nối', value: 'Bluetooth 5.2' },
  { label: 'Cảm biến', value: 'PPG, gia tốc kế' },
  { label: 'Size', value: '6 - 13' },
  { label: 'Hỗ trợ HĐH', value: 'iOS / Android' },
]

const proSpecs = [
  { label: 'Chất liệu', value: 'Titanium cấp hàng không' },
  { label: 'Thời lượng pin', value: '7 ngày/lần sạc' },
  { label: 'Kháng nước', value: '10ATM (Bơi lội)' },
  { label: 'Kết nối', value: 'Bluetooth 5.2' },
  { label: 'Cảm biến', value: 'PPG, nhiệt độ da, gia tốc kế, EKG' },
  { label: 'Size', value: '6 - 13' },
  { label: 'Hỗ trợ HĐH', value: 'iOS / Android' },
]

export default function Specs() {
  return (
    <section id="specs" className="section-py" style={{ background: 'var(--color-surface)' }}>
      <div className="container-site">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: 'var(--color-sand-500)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Thông số kỹ thuật
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-foreground)', marginTop: '0.5rem', lineHeight: 1.3 }}
          >
            Chọn phiên bản<br />
            <span style={{ color: 'var(--color-muted)' }}>phù hợp với bạn.</span>
          </motion.h2>
        </div>

        {/* Cards Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <SpecCard 
            title="PulseRing Basic"
            price="2.990.000đ"
            specs={basicSpecs}
            delay={0.1}
          />
          <SpecCard 
            title="PulseRing Pro"
            price="4.990.000đ"
            isPro={true}
            specs={proSpecs}
            delay={0.2}
          />
        </div>

      </div>
    </section>
  )
}
