export declare enum TierName {
    BASIC = "basic",
    STANDARD = "standard",
    PREMIUM = "premium",
    ENTERPRISE = "enterprise"
}
export declare class PlatformFee {
    id: string;
    tier_name: TierName;
    min_value: number;
    max_value: number;
    platform_fee_percentage: number;
    created_at: Date;
    updated_at: Date;
}
