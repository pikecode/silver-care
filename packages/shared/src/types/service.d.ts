export type ServiceOrderStatus = 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
export interface Service {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    image?: string;
}
export interface ServiceOrder {
    _id: string;
    parentId: string;
    childId: string;
    serviceId: string;
    preferredDate: string;
    preferredTime: string;
    notes?: string;
    status: ServiceOrderStatus;
    providerId?: string;
    review?: ServiceReview;
    createdAt: number;
    updatedAt: number;
}
export interface ServiceReview {
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
    createdAt: number;
}
export interface ServiceProvider {
    _id: string;
    name: string;
    phone: string;
    serviceTypes: string[];
    qualifications?: string[];
    rating: number;
    reviewCount: number;
    active: boolean;
    createdAt: number;
}
