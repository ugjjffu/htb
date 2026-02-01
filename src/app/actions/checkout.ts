'use server'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export async function createCheckoutSession(priceId: string) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId, // Use your Stripe Price ID
        quantity: 1,
      },
    ],
    mode: 'payment', // or 'subscription' for recurring payments
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  })

  redirect(session.url!)
}

export const GENERIC_HOTEL_PRODUCT = 'prod_TtRG7aFheIxGhz' // 事先创建好

export async function dynamicCheckoutsession(amountCent: number, currency = 'usd') {
  // 2. 现场生成价格（临时 Price）
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          product: GENERIC_HOTEL_PRODUCT,   // 挂在同一 Product
          unit_amount: amountCent,          // 动态金额
          currency,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
  })
  redirect(session.url!)
}