export const ACTIVITY_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const SERVICE_ORDER_STATUS = {
  PENDING: 'pending',
  ASSIGNED: 'assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  CARE: 'care',
  PREMIUM: 'premium',
} as const
