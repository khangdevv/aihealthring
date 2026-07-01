'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingBag, Check } from 'lucide-react'
import { useStore, ProductColor, ProductSize } from '@/store/useStore'
import Image from 'next/image'

const COLOR_OPTIONS: { label: ProductColor; value: string; image: string }[] = [
  { label: 'Titanium Black', value: '#1a1a1a', image: '/002-galaxy-ring-titaniumblack-top.jpg' },
  { label: 'Titanium Silver', value: '#e2e8f0', image: '/titaniumsilver.png' },
  { label: 'Titanium Gold', value: '#d4af37', image: '/011-galaxy-ring-titaniumgold-top.jpg' }, // Assuming this exists, fallback if not
]

const SIZE_OPTIONS: ProductSize[] = [6, 7, 8, 9, 10, 11, 12, 13]

export default function ProductModal() {
  const { isProductModalOpen, selectedProductModel, closeProductModal, addToCart, toggleWishlist, wishlist } = useStore()
  
  const [selectedColor, setSelectedColor] = useState<ProductColor>('Titanium Black')
  const [selectedSize, setSelectedSize] = useState<ProductSize>(8)
  const [isAdded, setIsAdded] = useState(false)

  if (!isProductModalOpen || !selectedProductModel) return null

  const price = selectedProductModel === 'PulseRing Pro' ? 4990000 : 2990000
  const activeColorImage = COLOR_OPTIONS.find(c => c.label === selectedColor)?.image || '/002-galaxy-ring-titaniumblack-top.jpg'

  // Check if currently selected variation is in wishlist (wishlist ignores size)
  const isWishlisted = wishlist.some(
    item => item.model === selectedProductModel && item.color === selectedColor
  )

  const handleAddToCart = () => {
    addToCart({
      model: selectedProductModel,
      color: selectedColor,
      size: selectedSize,
      price,
      image: activeColorImage
    })
    
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      closeProductModal()
    }, 1000)
  }

  const handleToggleWishlist = () => {
    toggleWishlist({
      model: selectedProductModel,
      color: selectedColor,
      price,
      image: activeColorImage
    })
  }

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem'
      }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
          }}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          style={{
            position: 'relative', width: '100%', maxWidth: '800px',
            background: 'var(--color-surface)', borderRadius: '1.5rem',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
          className="md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={closeProductModal}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
              background: 'var(--color-background)', border: 'none', borderRadius: '50%',
              width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--color-foreground)'
            }}
          >
            <X size={16} />
          </button>

          {/* Left: Image */}
          <div style={{
            flex: '1', background: 'var(--color-background)', padding: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', minHeight: '300px'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '300px', aspectRatio: '1/1' }}>
              <Image 
                src={activeColorImage} 
                alt={`${selectedProductModel} - ${selectedColor}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          {/* Right: Options */}
          <div style={{ flex: '1', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-foreground)', marginBottom: '0.5rem' }}>
              {selectedProductModel}
            </h2>
            <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-titanium-500)', marginBottom: '2rem' }}>
              {price.toLocaleString('vi-VN')}đ
            </div>

            {/* Colors */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: '0.75rem' }}>
                Màu sắc: <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>{selectedColor}</span>
              </h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {COLOR_OPTIONS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setSelectedColor(c.label)}
                    style={{
                      width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                      background: c.value, cursor: 'pointer',
                      border: selectedColor === c.label ? '2px solid var(--color-foreground)' : '2px solid transparent',
                      outline: selectedColor === c.label ? '2px solid var(--color-background)' : 'none',
                      outlineOffset: '-4px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    title={c.label}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-foreground)', marginBottom: '0.75rem' }}>
                Kích cỡ (Size)
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SIZE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={{
                      width: '3rem', height: '3rem', borderRadius: '0.5rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                      background: selectedSize === s ? 'var(--color-foreground)' : 'var(--color-background)',
                      color: selectedSize === s ? 'var(--color-background)' : 'var(--color-foreground)',
                      border: `1px solid ${selectedSize === s ? 'var(--color-foreground)' : 'var(--color-border)'}`
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', marginTop: '0.5rem' }}>
                *Bạn không biết size của mình? <a href="#" style={{ color: 'var(--color-foreground)', textDecoration: 'underline' }}>Xem hướng dẫn đo size</a>.
              </p>
            </div>

            {/* Actions */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                style={{
                  flex: 1, background: isAdded ? '#10b981' : 'var(--color-foreground)',
                  color: 'var(--color-background)', border: 'none', borderRadius: '9999px',
                  padding: '1rem', fontWeight: 600, fontSize: '1rem', cursor: isAdded ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  transition: 'background 0.3s'
                }}
              >
                {isAdded ? (
                  <>Đã thêm <Check size={18} /></>
                ) : (
                  <>Thêm vào giỏ <ShoppingBag size={18} /></>
                )}
              </button>

              <button
                onClick={handleToggleWishlist}
                style={{
                  width: '3.5rem', height: '3.5rem', borderRadius: '50%', border: '1px solid var(--color-border)',
                  background: 'var(--color-background)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: isWishlisted ? '#ef4444' : 'var(--color-foreground)',
                  transition: 'all 0.2s'
                }}
              >
                <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
