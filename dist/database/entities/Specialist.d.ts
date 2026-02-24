import { Media } from './Media';
import { ServiceOffering } from './ServiceOffering';
export declare enum VerificationStatus {
    PENDING = "pending",
    VERIFIED = "verified",
    REJECTED = "rejected"
}
export declare class Specialist {
    id: string;
    average_rating: number;
    is_draft: boolean;
    total_number_of_ratings: number;
    title: string;
    slug: string;
    description: string;
    base_price: number;
    platform_fee: number;
    final_price: number;
    verification_status: VerificationStatus;
    is_verified: boolean;
    duration_days: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    media: Media[];
    service_offerings: ServiceOffering[];
}
