// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getSession } from '@/lib/auth/session'  // 使用 App Router 兼容的 session 获取方式

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export async function POST(request: NextRequest) {
  try {
    // App Router 方式获取 session
    const session = await getSession()
    // console.log(session);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { priceId } = await request.json()

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      // 重要：关联用户 ID 到 metadata，方便 webhook 处理
      metadata: {
        userId: session.user.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' }, 
      { status: 500 }
    )
  }
}