// src/lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

// 价格配置
export const STRIPE_PRICES = {
  PRO_MONTHLY: 'price_1234567890',
  PRO_YEARLY: 'price_0987654321',
  ENTERPRISE: 'price_xxxxxxxxxx',
} as const;