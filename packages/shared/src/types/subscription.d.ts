export type SubscriptionPlan = 'free' | 'care' | 'premium';
export interface Subscription {
    _id: string;
    userId: string;
    plan: SubscriptionPlan;
    startDate: number;
    endDate?: number;
    autoRenew: boolean;
    paymentMethod?: string;
    createdAt: number;
    updatedAt: number;
}
export interface SubscriptionPlanInfo {
    id: SubscriptionPlan;
    name: string;
    price: number;
    period: 'month' | 'year';
    features: string[];
}
