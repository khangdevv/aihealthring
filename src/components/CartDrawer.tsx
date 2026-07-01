'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, Heart, ShoppingBag, ArrowRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import Image from 'next/image'

export default function CartDrawer() {
  const { 
    isCartOpen, closeCart, cart, removeFromCart, updateQuantity,
    isWishlistOpen, closeWishlist, wishlist, toggleWishlist
  } = useStore()

  // Determine which drawer is currently active. Priority to Cart if both open.
  const activeDrawer = isCartOpen ? 'cart' : isWishlistOpen ? 'wishlist' : null
  const isOpen = activeDrawer !== null
  const closeDrawer = isCartOpen ? closeCart : closeWishlist

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
              zIndex: 100
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '400px',
              background: 'var(--color-background)',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              zIndex: 101, display: 'flex', flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.5rem', borderBottom: '1px solid var(--color-border)'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                {activeDrawer === 'cart' ? (
                  <><ShoppingBag size={20} /> Giỏ hàng của bạn</>
                ) : (
                  <><Heart size={20} /> Danh sách yêu thích</>
                )}
              </h2>
              <button
                onClick={closeDrawer}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--color-muted)', display: 'flex', alignItems: 'center', padding: '0.25rem'
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {activeDrawer === 'cart' ? (
                // --- CART VIEW ---
                cart.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted)' }}>
                    <ShoppingBag size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                    <p>Giỏ hàng của bạn đang trống.</p>
                    <button onClick={closeDrawer} style={{ marginTop: '1rem', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '9999px', padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--color-foreground)' }}>
                      Tiếp tục mua sắm
                    </button>
                  </div>
                ) : (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {cart.map((item) => (
                      <li key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                        {/* Img */}
                        <div style={{ width: '80px', height: '80px', background: 'var(--color-surface)', borderRadius: '0.75rem', position: 'relative', overflow: 'hidden' }}>
                          <Image src={item.image} alt={item.model} fill style={{ objectFit: 'contain', padding: '0.5rem' }} />
                        </div>
                        {/* Details */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                              <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{item.model}</h3>
                              <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0 }}>
                                Màu: {item.color} <br/> Size: {item.size}
                              </p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: '0.25rem' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: '9999px', padding: '0.25rem' }}>
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-foreground)' }}><Minus size={14} /></button>
                              <span style={{ fontSize: '0.875rem', fontWeight: 500, width: '1.5rem', textAlign: 'center' }}>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: 'var(--color-foreground)' }}><Plus size={14} /></button>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                // --- WISHLIST VIEW ---
                wishlist.length === 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted)' }}>
                    <Heart size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                    <p>Chưa có sản phẩm yêu thích.</p>
                  </div>
                ) : (
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {wishlist.map((item) => (
                      <li key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--color-surface)', borderRadius: '0.75rem', position: 'relative', overflow: 'hidden' }}>
                          <Image src={item.image} alt={item.model} fill style={{ objectFit: 'contain', padding: '0.5rem' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{item.model}</h3>
                          <p style={{ fontSize: '0.75rem', color: 'var(--color-muted)', margin: 0, paddingBottom: '0.25rem' }}>Màu: {item.color}</p>
                          <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{(item.price).toLocaleString('vi-VN')}đ</span>
                        </div>
                        <button 
                          onClick={() => toggleWishlist(item)}
                          style={{ background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', color: '#ef4444' }}
                        >
                          <Heart size={16} fill="#ef4444" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )
              )}
            </div>

            {/* Footer / Checkout (only for Cart) */}
            {activeDrawer === 'cart' && cart.length > 0 && (
              <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>
                  <span>Tổng tiền</span>
                  <span>{cartTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <button style={{
                  width: '100%', padding: '1rem', background: 'var(--color-foreground)', color: 'var(--color-background)',
                  border: 'none', borderRadius: '9999px', fontSize: '1rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer'
                }}>
                  Tiến hành thanh toán <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
