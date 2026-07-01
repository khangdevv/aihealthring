'use client'

import Link from 'next/link'
import { useTheme } from '@/components/Providers'
import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#features', label: 'Tính năng' },
  { href: '#specs', label: 'Thông số' },
  { href: '#story', label: 'Hành trình' },
  { href: '#order', label: 'Mua ngay' },
]

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        ...(scrolled
          ? {
              background: 'rgba(var(--navbar-bg, 255 255 255) / 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 1px 0 0 var(--color-border)',
            }
          : { background: 'transparent' }),
      }}
    >
      <nav className="container-site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
        {/* Logo */}
        <Link href="/" id="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.125rem', letterSpacing: '-0.02em' }}>
            Pulse
            <img src="/ring.png" alt="Ring" style={{ height: '1.25rem', width: 'auto', margin: '0 0.125rem' }} className="dark:invert" />
            AI
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', margin: 0, padding: 0 }} className="nav-desktop-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                id={`nav-link-${link.label}`}
                style={{
                  padding: '0.375rem 0.875rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-foreground)'
                  ;(e.currentTarget as HTMLElement).style.background = 'var(--color-surface)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = 'var(--color-muted)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Dark mode toggle */}
          {mounted && (
            <button
              id="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle dark mode"
              style={{
                width: '2.25rem', height: '2.25rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                color: 'var(--color-foreground)',
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(20deg)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'rotate(0deg)' }}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* CTA */}
          <Link
            href="#order"
            id="nav-cta"
            style={{
              padding: '0.5rem 1.25rem',
              borderRadius: '9999px',
              background: 'var(--color-foreground)',
              color: 'var(--color-background)',
              fontWeight: 600,
              fontSize: '0.875rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
            className="nav-cta-desktop"
          >
            Đặt trước
          </Link>

          {/* Hamburger */}
          <button
            id="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              width: '2.25rem', height: '2.25rem',
              alignItems: 'center', justifyContent: 'center',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              color: 'var(--color-foreground)',
            }}
            className="menu-toggle-btn"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'var(--color-background)',
            borderTop: '1px solid var(--color-border)',
            padding: '1rem',
          }}
          className="mobile-menu"
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--color-foreground)',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#order"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  marginTop: '0.5rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  background: 'var(--color-foreground)',
                  color: 'var(--color-background)',
                  fontWeight: 600,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                Đặt trước ngay
              </Link>
            </li>
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-desktop-links { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .menu-toggle-btn { display: flex !important; }
        }
        .dark header { --navbar-bg: 11 22 40; }
      `}</style>
    </header>
  )
}
