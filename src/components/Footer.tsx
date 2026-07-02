'use client'

import Link from 'next/link'
import { Heart, Globe, MessageCircle, Play } from 'lucide-react'
import { useTheme } from '@/components/Providers'
import Image from 'next/image'

const footerLinks = {
  product: [
    { href: '#features', label: 'Tính năng' },
    { href: '#specs', label: 'Thông số kỹ thuật' },
    { href: '#story', label: 'Hành trình một ngày' },
    { href: '#order', label: 'Đặt trước' },
  ],
  support: [
    { href: '#', label: 'Hướng dẫn sử dụng' },
    { href: '#', label: 'Bảo hành & Đổi trả' },
    { href: '#', label: 'Liên hệ hỗ trợ' },
    { href: '#', label: 'Câu hỏi thường gặp' },
  ],
}

const socials = [
  { href: '#', icon: Globe, label: 'Instagram' },
  { href: '#', icon: MessageCircle, label: 'Twitter/X' },
  { href: '#', icon: Play, label: 'YouTube' },
]

export default function Footer() {
  const { theme } = useTheme()
  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        marginTop: 'auto',
      }}
    >
      {/* Main footer */}
      <div
        className="container-site"
        style={{ paddingBlock: '3.5rem', display: 'grid', gap: '3rem' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none', marginBottom: '1rem',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.125rem' }}>
                Pulse
                <Image src="/ring.png" alt="Ring" width={24} height={24} style={{ height: '1.25rem', width: 'auto', margin: '0 0.125rem', filter: theme === 'dark' ? 'invert(1)' : 'none' }} />
                AI
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.6, maxWidth: '220px' }}>
              Sức khỏe của bạn, gọn trong một chiếc nhẫn.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '1.25rem' }}>
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: '2rem', height: '2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s, border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-foreground)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Sản phẩm
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', marginBottom: '1rem' }}>
              Hỗ trợ
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Badge / CTA */}
          <div>
            <div style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '1rem',
              padding: '1.25rem',
            }}>
              <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: '0.375rem' }}>
                🎉 New Arrival 2026
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Đăng ký sớm — nhận ưu đãi ra mắt độc quyền.
              </p>
              <Link
                href="#newsletter"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  background: 'var(--color-foreground)',
                  color: 'var(--color-background)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--color-border)' }}>
        <div
          className="container-site"
          style={{
            paddingBlock: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: 0 }}>
            © 2026 PulseRing AI. All rights reserved.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Made with <Heart size={12} style={{ color: 'var(--color-sand-500)', fill: 'var(--color-sand-500)' }} /> Khang
          </p>
        </div>
      </div>
    </footer>
  )
}
