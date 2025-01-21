import { JSX } from "react"

/////////* Props */////////
export type Props = {
    children?: JSX.Element | JSX.Element[] | string
    extraClass?: string
    caption?: string
}

export type NetworkProps = {
    data: NetworkStatus,
}

/////////* Session Objects */////////
export type User = {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    guilds: any[]
}

export type Session = {
    token: string | null,
    expires: Date | null,
    user: User | null,
}


/////////* Network Objects */////////
export type NetworkStatus = {
    total_calendars: number;
    total_announcements: number;
    api_status: InstanceData;
    website_status: InstanceData;
    cam_status:InstanceData;
    bot_status: BotInstanceData[];
    expected_shard_count: number;
    total_guilds: number;
}

export type BotInstanceData = {
    instance: InstanceData;
    shard_index: number;
    shard_count: number;
    guilds: number;
}

export type InstanceData = {
    instance_id: string;
    version: string;
    d4j_version: string;
    uptime: string;
    human_uptime: string;
    last_heartbeat: string;
    memory: number;
}

/////////* DisCal API Responses */////////
export type LoginResponse = {
    link: string
}

/////////* Various objects typed for maintainability */////////
export type Plan = {
    title: string,
    featured: boolean,
    description: string,
    priceMonthly: number,
    priceYearly: number,
    buyButtonText: string,
    buyButtonLink: string,
    mainFeatures: PlanFeature[],
}

export type PlanFeature = {
    id: number,
    value: string,
}

export type Feature = {
    title: string,
    tiers: FeatureTier[],
}

export type FeatureTier = {
    title: string,
    featured?: boolean,
    value: string | boolean,
}

export type Faq = {
    question: string,
    answer: string,
}
