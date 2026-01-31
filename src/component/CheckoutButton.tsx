'use client'

import { createCheckoutSession } from '@/app/actions/checkout'

export default function CheckoutButton({ priceId }: { priceId: string }) {
  return (
    <form action={() => createCheckoutSession(priceId)}>
      <button type="submit">
        Buy Now
      </button>
    </form>
  )
}