'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Dumbbell, Coffee, Moon } from 'lucide-react'
import StoryCard from './StoryCard'

const timelineEvents = [
  {
    time: '06:00',
    title: 'Đánh thức nhẹ nhàng',
    description: 'Đánh thức bạn bằng bộ rung siêu nhỏ êm ái, kèm theo báo cáo chi tiết về chất lượng giấc ngủ đêm qua.',
    icon: Bell,
  },
  {
    time: '07:30',
    title: 'Gợi ý bài tập buổi sáng',
    description: 'Dựa trên nhịp tim và thể trạng phục hồi, AI sẽ gợi ý bài tập Yoga hoặc chạy bộ phù hợp nhất cho hôm nay.',
    icon: Dumbbell,
  },
  {
    time: '12:00',
    title: 'Nhắc nhở vận động',
    description: 'Sau 4 tiếng ngồi làm việc liên tục, PulseRing rung nhẹ nhắc nhở bạn đứng lên đi lại để lưu thông máu.',
    icon: Coffee,
  },
  {
    time: '22:30',
    title: 'Thư giãn trước khi ngủ',
    description: 'Đo lường mức độ căng thẳng và hướng dẫn bạn các bài tập hít thở thư giãn để đi vào giấc ngủ dễ dàng hơn.',
    icon: Moon,
  },
]

export default function Story() {
  return (
    <section id="story" className="section-py" style={{ background: 'var(--color-background)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative gradient blur in background */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, var(--color-titanium-200) 0%, transparent 60%)',
        opacity: 0.1, filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
      }} className="dark:opacity-5" />

      <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ color: 'var(--color-sand-500)', fontWeight: 600, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            Hành trình
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'var(--color-foreground)', marginTop: '0.5rem', lineHeight: 1.3 }}
          >
            Một ngày cùng <br />
            <span style={{ color: 'var(--color-muted)' }}>PulseRing AI.</span>
          </motion.h2>
        </div>

        {/* Vertical Timeline */}
        <div className="timeline-container">
          {/* Central Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="timeline-line"
          />

          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0
            return (
              <div key={index} className={`timeline-row ${isLeft ? 'left' : 'right'}`}>
                {/* Connector Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  className="timeline-dot"
                />
                
                {/* Content Card */}
                <div className="timeline-content">
                  <StoryCard 
                    time={event.time}
                    title={event.title}
                    description={event.description}
                    icon={event.icon}
                    align={isLeft ? 'left' : 'right'}
                    delay={0.3 + index * 0.1}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }
        
        .timeline-line {
          position: absolute;
          left: 2rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--color-border) 10%, var(--color-border) 90%, transparent);
        }

        .timeline-dot {
          position: absolute;
          left: calc(2rem - 5px);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-foreground);
          border: 3px solid var(--color-background);
          box-shadow: 0 0 0 2px var(--color-border);
          z-index: 2;
          top: 2rem;
        }

        .timeline-row {
          position: relative;
          display: flex;
          justify-content: flex-end;
          padding-left: 4rem;
          margin-bottom: 3rem;
        }
        
        .timeline-row:last-child {
          margin-bottom: 0;
        }

        .timeline-content {
          width: 100%;
        }

        @media (min-width: 768px) {
          .timeline-line {
            left: 50%;
            transform: translateX(-50%);
          }
          .timeline-dot {
            left: 50%;
            transform: translateX(-50%);
            top: 3rem; /* Center vertically relative to card top if needed, or fixed */
          }
          .timeline-row {
            padding-left: 0;
            width: 50%;
            margin-bottom: -2rem; /* Overlap slightly for tighter timeline */
          }
          .timeline-row.left {
            justify-content: flex-end;
            padding-right: 3rem;
            margin-right: auto;
          }
          .timeline-row.right {
            justify-content: flex-start;
            padding-left: 3rem;
            margin-left: auto;
          }
          .timeline-row:nth-child(even) {
            margin-top: 4rem;
          }
        }
      `}</style>
    </section>
  )
}
