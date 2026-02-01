import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { GENERIC_HOTEL_PRODUCT } from "@/app/actions/checkout"
// import { redirect } from 'next/navigation';
import { getSessionFromRequest } from '@/lib/auth/session';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { amountPrice } = req.body
        const sessionVeri = await getSessionFromRequest(req);
        if (!sessionVeri) {
            //   redirect('/sign-in');
        return res.status(401).json({ error: 'Unauthorized' });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        product: GENERIC_HOTEL_PRODUCT,   // 挂在同一 Product
                        unit_amount: amountPrice,          // 动态金额
                        currency: 'USD',
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
        })

        res.status(200).json({ url: session.url })
    } catch (error) {
        console.error('Stripe error:', error)
        res.status(500).json({ error: 'Error creating checkout session' })
    }
}