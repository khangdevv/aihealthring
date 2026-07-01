'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset state
    setStatus('idle')
    setErrorMessage('')

    // Validation
    if (!email) {
      setStatus('error')
      setErrorMessage('Vui lòng nhập địa chỉ email.')
      return
    }

    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Địa chỉ email không hợp lệ.')
      return
    }

    // Submit
    setStatus('loading')
    
    // Simulate webhook API call (1.5s delay)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally do:
      // await fetch('https://webhook.site/your-webhook-url', { method: 'POST', body: JSON.stringify({ email }) })
      console.log('Webhook sent with email:', email)
      
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  }

  return (
    <section className="section-py" style={{ background: 'var(--color-background)', position: 'relative' }}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'relative',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '2rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Decorative Background */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
            background: 'linear-gradient(135deg, var(--color-titanium-100) 0%, transparent 100%)',
            opacity: 0.5, zIndex: 0
          }} className="dark:opacity-5" />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: '1rem', lineHeight: 1.3 }}>
              Đăng ký để nhận <br />
              <span style={{ color: 'var(--color-titanium-500)' }}>ưu đãi ra mắt sớm</span>
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '1rem', marginBottom: '2.5rem' }}>
              Trở thành những người đầu tiên sở hữu PulseRing AI với mức giá ưu đãi đặc biệt dành riêng cho khách hàng đăng ký trước.
            </p>

            <form onSubmit={handleSubmit} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <div style={{ 
                display: 'flex', 
                width: '100%', 
                background: 'var(--color-background)',
                borderRadius: '9999px',
                padding: '0.5rem',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <input 
                  type="text" 
                  placeholder="Nhập địa chỉ email của bạn..." 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  disabled={status === 'loading' || status === 'success'}
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    padding: '0 1.5rem',
                    color: 'var(--color-foreground)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button 
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  style={{
                    background: 'var(--color-foreground)',
                    color: 'var(--color-background)',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    fontSize: '0.9375rem',
                    cursor: (status === 'loading' || status === 'success') ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'opacity 0.2s ease',
                    opacity: (status === 'loading' || status === 'success') ? 0.7 : 1
                  }}
                >
                  {status === 'loading' ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <>
                      Gửi ngay <Send size={16} />
                    </>
                  )}
                </button>
              </div>

              {/* Status Messages */}
              <div style={{ minHeight: '24px' }}>
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#ef4444', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <AlertCircle size={14} /> {errorMessage}
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#10b981', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <CheckCircle size={14} /> Cảm ơn bạn! Thông tin sẽ được gửi sớm nhất.
                  </motion.div>
                )}
              </div>
            </form>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.75rem', marginTop: '1rem', opacity: 0.7 }}>
              Chúng tôi cam kết bảo mật thông tin của bạn. Không bao giờ gửi thư rác.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Basic keyframes for loading spinner */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </section>
  )
}
