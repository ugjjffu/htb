// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
// import { GENERIC_HOTEL_PRODUCT } from "@/app/actions/checkout"
import { getSession } from '@/lib/auth/session'  // 确保使用 App Router 版本

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
})

export async function POST(request: NextRequest) {
  try {
    // App Router 获取 session（使用 next/headers 的 cookies）
    const session = await getSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const { amountPrice } = await request.json()
    
    // 参数校验
    if (!amountPrice || typeof amountPrice !== 'number') {
      return NextResponse.json(
        { error: 'Invalid amount price' }, 
        { status: 401 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            product: 'prod_TtRG7aFheIxGhz',
            unit_amount: amountPrice,  // Stripe 需要整数（美分）
            currency: 'USD',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/cancel`,
      metadata: {
        userId: session.user.id,
        amountPrice: amountPrice.toString(),
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