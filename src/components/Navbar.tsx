'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, ShoppingBag, Heart } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from '@/components/Providers'
import { useStore } from '@/store/useStore'

const navLinks = [
  { name: 'Tính năng', href: '#features' },
  { name: 'Thông số', href: '#specs' },
  { name: 'Hành trình', href: '#story' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Zustand Store
  const cart = useStore((state) => state.cart)
  const wishlist = useStore((state) => state.wishlist)
  const openCart = useStore((state) => state.openCart)
  const openWishlist = useStore((state) => state.openWishlist)

  // Calculate totals
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemCount = wishlist.length

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
              background: 'var(--color-surface-alpha)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }
          : {
              background: 'transparent',
              backdropFilter: 'none',
              boxShadow: 'none',
            }),
      }}
    >
      <div className="container-site">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          
          {/* Logo */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link 
              href="/" 
              style={{ color: 'var(--color-foreground)', textDecoration: 'none' }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
                <span style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.125rem' }}>
                  Pulse
                  <Image src="/ring.png" alt="Ring" width={24} height={24} style={{ height: '1.25rem', width: 'auto', margin: '0 0.125rem', filter: mounted && theme === 'dark' ? 'invert(1)' : 'none' }} />
                  AI
                </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:items-center md:gap-8">
            <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {navLinks.map((link, i) => (
                <motion.li key={link.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'var(--color-muted)',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-foreground)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted)'}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          {/* Right Actions */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            
            {/* Wishlist Button */}
            <button
              onClick={openWishlist}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                position: 'relative'
              }}
              title="Danh sách yêu thích"
            >
              <Heart size={20} />
              {mounted && wishlistItemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '0px', right: '0px',
                  background: 'var(--color-foreground)', color: 'var(--color-background)',
                  fontSize: '0.65rem', fontWeight: 700, width: '16px', height: '16px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {wishlistItemCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={openCart}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                position: 'relative'
              }}
              title="Giỏ hàng"
            >
              <ShoppingBag size={20} />
              {mounted && cartItemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '0px', right: '0px',
                  background: 'var(--color-foreground)', color: 'var(--color-background)',
                  fontSize: '0.65rem', fontWeight: 700, width: '16px', height: '16px',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-foreground)',
              }}
              aria-label="Toggle Dark Mode"
            >
              {mounted && (theme === 'dark') 
                ? <Sun size={18} /> 
                : <Moon size={18} />
              }
            </button>

            {/* CTA Button */}
            <Link
              href="#specs"
              style={{
                background: 'var(--color-foreground)',
                color: 'var(--color-background)',
                textDecoration: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                transition: 'opacity 0.2s',
              }}
              className="hidden md:inline-flex hover:opacity-90"
            >
              Đặt trước
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-foreground)',
                cursor: 'pointer',
              }}
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
            className="md:hidden"
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      color: 'var(--color-foreground)',
                      textDecoration: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      padding: '0.5rem',
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#specs"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    background: 'var(--color-foreground)',
                    color: 'var(--color-background)',
                    textDecoration: 'none',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    textAlign: 'center',
                    fontWeight: 600,
                    marginTop: '0.5rem',
                  }}
                >
                  Đặt trước ngay
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
